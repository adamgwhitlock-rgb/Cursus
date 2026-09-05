import postgres from "postgres";

// Initialize the postgres client using the Neon connection string from Vercel
const connectionString = process.env.DATABASE_URL || "";
const sql = postgres(connectionString, { ssl: 'require' });

export default sql;
