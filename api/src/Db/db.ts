import { Pool } from "pg";
import "dotenv/config";
import { MooseSighting } from "paths/recordSightings";
import SQL from "sql-template-strings";

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432,
});

export async function openDb() {
  return pool;
}

export async function createDb() {
  const createTableSql = `CREATE TABLE IF NOT EXISTS moose (
    sightingId SERIAL PRIMARY KEY, 
    clientSightingId TEXT NOT NULL,
    syncDate DATE NOT NULL,
    date DATE NOT NULL,
    hoursOut INT NOT NULL,
    region INT NOT NULL,
    subRegion INT NOT NULL,
    tickHairLoss INT, 
    bullCount INT,
    cowCount INT,
    calfCount INT,
    unknownCount INT);`;

  await pool.query(createTableSql);
}

export async function insertSightingMoose(
  mooseSightingsPostBody: MooseSighting[]
) {
  const dbPool = pool;

  if (mooseSightingsPostBody.length === 0) {
    console.log("There is nothing new to sync");
    return;
  }

  const insertSQL = SQL`
    INSERT INTO moose (
      clientSightingID, syncDate, date, hoursOut, region, subRegion, tickHairLoss, bullCount, cowCount, calfCount, unknownCount
    ) VALUES `;

  mooseSightingsPostBody.forEach((sighting, index) => {
    if (index > 0) insertSQL.append(SQL`, `);

    insertSQL.append(SQL`(
      ${sighting.clientSightingId},
      ${new Date()},
      ${sighting.date},
      ${sighting.hoursOut},
      ${sighting.region},
      ${sighting.subRegion},
      ${sighting.tickHairLoss || null}, 
      ${sighting.bullCount || 0},       
      ${sighting.cowCount || 0},
      ${sighting.calfCount || 0},
      ${sighting.unknownCount || 0}
    )`);
  });

  try {
    await dbPool.query(insertSQL);
    console.log("Insertion successful");
  } catch (error) {
    console.error("Error during database insertion:", error);
    throw error;
  }
}
