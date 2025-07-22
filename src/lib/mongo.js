// Importamos MongoClient de mongodb.
import { MongoClient } from "mongodb";

// Obtenemos la URI de la base de datos.
const uri = process.env.MONGO_URI; 
// console.log('MONGO_URI:', uri); Debug de la URI
if (!uri) {
  throw new Error("MONGO_URI no está configurado en las variables de entorno");
}

// Creamos el cliente de MongoDB.
const client = new MongoClient(uri);

// Exportamos la función getAgents la cual coge todos los agentes de la base de datos.
export async function getAgents() {
  try {
    await client.connect();
    const db = client.db("lineupsgg");
    const agents = await db.collection("agents").find().toArray();
    return agents.map(agent => ({
      agente: agent.agente,
      rol: agent.rol,
      icono: agent.icono,
      imagen: agent.imagen,
      slug: agent.slug,
      habilidades: agent.habilidades,
    }));
  } catch (error) {
    console.error("Error al obtener agentes:", error);
    throw error;
  }
}

// Exportamos la función getAgentBySlug la cual coge un agente por slug "nombre del agente".
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

export async function getMaps() {
  try {
    await client.connect();
    const db = client.db("lineupsgg");
    const maps = await db.collection("maps").find().toArray();
    return maps.map(map => ({
      mapa: map.mapa,
      desc: map.desc,
      imagenes: map.imagenes,
    }));
  } catch (error) {
    console.error("Error al obtener mapas:", error);
    throw error;
  }
}