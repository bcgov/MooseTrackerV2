import { Pool } from "pg";
import "dotenv/config";
import { MooseSighting } from "paths/recordSightings";

interface PreparedMooseSighting extends MooseSighting {
  syncDate: Date;
}

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

const createInsertValues = (length: number, startIndex: number): string => {
  const insertValue = [];
  for (let i = 0; i < length; i++) {
    insertValue.push(`$${startIndex + i}`);
  }
  return `(${insertValue.join(", ")})`;
};

const prepareInsertData = (
  mooseSightingsPostBody: MooseSighting[]
): { values: PreparedMooseSighting[]; insertValues: string[] } => {
  const values: PreparedMooseSighting[] = [];
  const insertValues: string[] = [];
  let paramCounter = 1;

  mooseSightingsPostBody.forEach((sighting) => {
    const preparedSighting: PreparedMooseSighting = {
      clientSightingId: sighting.clientSightingId,
      syncDate: new Date(),
      date: sighting.date,
      hoursOut: sighting.hoursOut,
      region: sighting.region,
      subRegion: sighting.subRegion,
      tickHairLoss: sighting.tickHairLoss,
      bullCount: sighting.bullCount,
      cowCount: sighting.cowCount,
      calfCount: sighting.calfCount,
      unknownCount: sighting.unknownCount,
    };
    values.push(preparedSighting);
    insertValues.push(createInsertValues(8, paramCounter));
    paramCounter += 8;
  });

  return { values, insertValues };
};

// Main function to insert sightings into the database
export async function insertSightingMoose(
  dbPool: Pool,
  mooseSightingsPostBody: MooseSighting[]
) {
  try {
    const { values, insertValues } = prepareInsertData(mooseSightingsPostBody);

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
  let findUserSQL = "SELECT * FROM moose WHERE clientSightingId = ?";
  console.log(findUserSQL);
  await dbPool.query(findUserSQL, user);
}
