import { MongoClient } from "mongodb";

const uri = process.env.MONGO_URI; // Pon tu URI de conexión en .env
console.log('MONGO_URI:', uri); // Debug log
if (!uri) {
  throw new Error("MONGO_URI no está configurado en las variables de entorno");
}

const client = new MongoClient(uri);

export async function getAgents() {
  try {
    await client.connect();
    const db = client.db("lineupsgg");
    const agents = await db.collection("agents").find().toArray();
    // Transform MongoDB documents to the expected format
    return agents.map(agent => ({
      name: agent.name,
      role: agent.role,
      image: agent.image,
      slug: agent.slug
    }));
  } catch (error) {
    console.error("Error al obtener agentes:", error);
    throw error;
  }
}

export async function getAgentBySlug(slug) {
  try {
    await client.connect();
    const db = client.db("lineupsgg");
    const agent = await db.collection("agents").findOne({ slug });
    return agent;
  } catch (error) {
    console.error("Error al obtener agente por slug:", error);
    throw error;
  }
}