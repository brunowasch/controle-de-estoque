const Product = require('../models/Product');
const StockMovement = require('../models/StockMovement');

function toId(val) {
  if (!val) return undefined;
  if (typeof val === 'object') {
    if (val._id) return String(val._id);
    return undefined;
  }
  return String(val);
}

async function createEntry({ productId, clientId, supplierId, quantity, unitPrice, reason }) {
  const prodId = toId(productId);
  if (!prodId) throw new Error('Produto é obrigatório');
  if (!quantity || quantity <= 0) throw new Error('Quantidade deve ser maior que zero');

  const product = await Product.findByIdAndUpdate(
    prodId,
    { $inc: { stock: quantity } },
    { new: true }
  );
  if (!product) throw new Error('Produto não encontrado');

  const movement = await StockMovement.create({
    product: prodId,
    client: toId(clientId) || undefined,
    supplier: toId(supplierId) || undefined,
    type: 'IN',
    quantity,
    unitPrice,
    reason,
  });

  return { movement, product };
}

async function listEntries() {
  return StockMovement.find({ type: 'IN' })
    .populate('product', 'name')
    .populate('client', 'name email')
    .populate('supplier', 'name cnpj email')
    .sort({ createdAt: -1 });
}

async function updateEntry(id, { productId, clientId, supplierId, quantity, unitPrice, reason }) {
  const current = await StockMovement.findById(id);
  if (!current) throw new Error('Movimentação não encontrada');
  if (current.type !== 'IN') throw new Error('Apenas entradas podem ser editadas aqui');
  if (!quantity || quantity <= 0) throw new Error('Quantidade deve ser maior que zero');

  const oldProdId = toId(current.product);          
  const newProdId = toId(productId) || oldProdId; 

  if (!oldProdId) throw new Error('Produto anterior inválido');

  if (newProdId !== oldProdId) {
    await Product.findByIdAndUpdate(oldProdId, { $inc: { stock: -current.quantity } });
    const newProd = await Product.findByIdAndUpdate(newProdId, { $inc: { stock: quantity } }, { new: true });
    if (!newProd) throw new Error('Novo produto não encontrado');
    current.product = newProdId; 
  } else {
    const diff = quantity - current.quantity;
    if (diff !== 0) {
      await Product.findByIdAndUpdate(oldProdId, { $inc: { stock: diff } });
    }
  }

  current.client     = toId(clientId)   || undefined;
  current.supplier   = toId(supplierId) || undefined;
  current.quantity   = quantity;
  current.unitPrice  = (unitPrice === '' || unitPrice === undefined) ? undefined : unitPrice;
  current.reason     = reason || undefined;

  await current.save();

  return await StockMovement.findById(current._id)
    .populate('product', 'name')
    .populate('client', 'name email')
    .populate('supplier', 'name cnpj email');
}

async function deleteEntry(id) {
  const mov = await StockMovement.findById(id);
  if (!mov) throw new Error('Movimentação não encontrada');
  if (mov.type !== 'IN') throw new Error('Apenas entradas podem ser removidas aqui');

  const prodId = toId(mov.product);
  if (prodId) {
    await Product.findByIdAndUpdate(prodId, { $inc: { stock: -mov.quantity } });
  }
  await mov.deleteOne();
  return { ok: true };
}

async function createOutflow({ productId, clientId, supplierId, quantity, unitPrice, reason }) {
  const prodId = toId(productId);
  if (!prodId) throw new Error('Produto é obrigatório');
  if (!quantity || quantity <= 0) throw new Error('Quantidade deve ser maior que zero');

  const product = await Product.findById(prodId);
  if (!product) throw new Error('Produto não encontrado');
  if (product.stock < quantity) throw new Error('Estoque insuficiente para a saída');

  await Product.findByIdAndUpdate(prodId, { $inc: { stock: -quantity } });
  const movement = await StockMovement.create({
    product: prodId,
    client: toId(clientId) || undefined,
    supplier: toId(supplierId) || undefined,
    type: 'OUT',
    quantity,
    unitPrice,
    reason,
  });

  return { movement, product: await Product.findById(prodId) };
}

async function listOutflows() {
  return StockMovement.find({ type: 'OUT' })
    .populate('product', 'name')
    .populate('client', 'name email')
    .populate('supplier', 'name cnpj email')
    .sort({ createdAt: -1 });
}

async function updateOutflow(id, { productId, clientId, supplierId, quantity, unitPrice, reason }) {
  const current = await StockMovement.findById(id);
  if (!current) throw new Error('Movimentação não encontrada');
  if (current.type !== 'OUT') throw new Error('Apenas saídas podem ser editadas aqui');
  if (!quantity || quantity <= 0) throw new Error('Quantidade deve ser maior que zero');

  const oldProdId = toId(current.product);
  const newProdId = toId(productId) || oldProdId;

  if (newProdId !== oldProdId) {
    await Product.findByIdAndUpdate(oldProdId, { $inc: { stock: current.quantity } });
    const newProd = await Product.findById(newProdId);
    if (!newProd) throw new Error('Novo produto não encontrado');
    if (newProd.stock < quantity) throw new Error('Estoque insuficiente no novo produto');
    await Product.findByIdAndUpdate(newProdId, { $inc: { stock: -quantity } });
    current.product = newProdId;
  } else {
    const diff = quantity - current.quantity; 
    if (diff > 0) {
      const prod = await Product.findById(oldProdId);
      if (!prod) throw new Error('Produto não encontrado');
      if (prod.stock < diff) throw new Error('Estoque insuficiente para aumentar a saída');
    }
    if (diff !== 0) {
      await Product.findByIdAndUpdate(oldProdId, { $inc: { stock: -diff } });
    }
  }

  current.client = toId(clientId) || undefined;
  current.supplier = toId(supplierId) || undefined;
  current.quantity = quantity;
  current.unitPrice = (unitPrice === '' || unitPrice === undefined) ? undefined : unitPrice;
  current.reason = reason || undefined;

  await current.save();

  return await StockMovement.findById(current._id)
    .populate('product', 'name')
    .populate('client', 'name email')
    .populate('supplier', 'name cnpj email');
}

async function deleteOutflow(id) {
  const mov = await StockMovement.findById(id);
  if (!mov) throw new Error('Movimentação não encontrada');
  if (mov.type !== 'OUT') throw new Error('Apenas saídas podem ser removidas aqui');

  await Product.findByIdAndUpdate(toId(mov.product), { $inc: { stock: mov.quantity } });
  await mov.deleteOne();
  return { ok: true };
}
module.exports = { 
  createEntry, 
  listEntries, 
  updateEntry, 
  deleteEntry,  
  createOutflow, 
  listOutflows, 
  updateOutflow, 
  deleteOutflow 
};