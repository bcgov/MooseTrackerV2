import { Pool } from "pg";
import "dotenv/config";
import { MooseSighting } from "interfaces";
import { formatDateNoTime } from "../util";

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
    dateFrom DATE NOT NULL,
    dateTo DATE NOT NULL,
    region INT NOT NULL,
    subRegion INT NOT NULL,
    tickHairLoss INT, 
    mooseCount INT NOT NULL);`;

  await pool.query(createTableSql);
}

const createInsertValues = (length: number, startIndex: number): string => {
  const insertValue = [];
  for (let i = 0; i < length; i++) {
    insertValue.push(`$${startIndex + i}`);
  }
  return `(${insertValue.join(", ")})`;
};

const prepareInsertData = (
  postbody: MooseSighting[]
): { values: any[]; insertValues: string[] } => {
  const values: any[] = [];
  const insertValues: string[] = [];
  let paramCounter = 1;

  postbody.forEach((sighting) => {
    values.push(
      sighting.clientSightingId,
      formatDateNoTime(new Date()), // syncDate
      sighting.dateFrom,
      sighting.dateTo,
      sighting.region,
      sighting.subRegion,
      sighting.tickHairLoss,
      sighting.mooseCount
    );
    insertValues.push(createInsertValues(8, paramCounter));
    paramCounter += 8;
  });

  return { values, insertValues };
};

// Main function to insert sightings into the database
export async function insertSightingMoose(
  dbPool: Pool,
  postbody: MooseSighting[]
) {
  try {
    const { values, insertValues } = prepareInsertData(postbody);

    if (values.length === 0) {
      console.log("There is nothing new to sync");
      return;
    }

    const insertSQL = `INSERT INTO Moose (clientSightingID, syncDate, dateFrom, dateTo, region, subRegion, tickHairLoss, mooseCount) VALUES ${insertValues.join(
      ", "
    )}`;

    await dbPool.query(insertSQL, values);
    console.log("Insertion successful");
  } catch (error) {
    console.error("Error during database insertion: ", error);
    throw error;
  }
}

export async function findUserMeese(dbPool: any, user: any) {
  let findUserSQL = "SELECT * FROM Moose WHERE clientId = ?";
  console.log(findUserSQL);
  await dbPool.query(findUserSQL, user);
}
