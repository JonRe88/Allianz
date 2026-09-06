const { MongoClient } = require("mongodb");
const { attachDatabasePool } = require("@vercel/functions");

const uri = process.env.MONGODB_URI || process.env.MONGO_URL;

if (!uri) {
  throw new Error("MONGODB_URI is not configured");
}

const client = new MongoClient(uri);
attachDatabasePool(client);

const db = client.db(process.env.MONGODB_DB || process.env.DB_NAME || "datos-ximnanzas");

module.exports = { db };
