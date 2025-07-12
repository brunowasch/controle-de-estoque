const clientService = require("../services/clientService");

async function createClient(req, res) {
  try {
    const client = await clientService.createClient(req.body);
    res.status(201).json(client);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

async function getAllClients(req, res) {
  try {
    const clients = await clientService.getAllClients();
    res.json(clients);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getClientById(req, res) {
  try {
    const client = await clientService.getClientById(req.params.id);
    if (!client) {
      return res.status(404).json({ error: "Client not found" });
    }
    res.json(client);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function updateClient(req, res) {
  try {
    const client = await clientService.updateClient(req.params.id, req.body);
    if (!client) {
      return res.status(404).json({ error: "Client not found" });
    }
    res.json(client);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

async function deleteClient(req, res) {
  try {
    const client = await clientService.deleteClient(req.params.id);
    if (!client) {
      return res.status(404).json({ error: "Client not found" });
    }
    res.json({ message: "Client deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  createClient,
  getAllClients,
  getClientById,
  updateClient,
  deleteClient
};