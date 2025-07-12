const Client = require("../models/Client");

async function createClient(data) {
  const client = new Client(data);
  return await client.save();
}

async function getAllClients() {
  return await Client.find();
}

async function getClientById(id) {
  return await Client.findById(id);
}

async function updateClient(id, data) {
  return await Client.findByIdAndUpdate(id, data, { new: true, runValidators: true });
}

async function deleteClient(id) {
  return await Client.findByIdAndDelete(id);
}

module.exports = {
  createClient,
  getAllClients,
  getClientById,
  updateClient,
  deleteClient
};