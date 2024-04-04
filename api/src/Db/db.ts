import { Pool } from 'pg';

const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'mooseDB',
  password: process.env.DB_PASSWORD || 'supermoosepassword',
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432,
});


export async function openDb() {
  return pool
}

export async function createDb() {
  const createTableSql = `CREATE TABLE IF NOT EXISTS Moose
                            (clientId real not Null, 
                            sightingId text not Null,
                            date text not Null,
                            lat real not Null,
                            long real not Null,
                            lifestage text,
                            gender text,
                            health text);`;

  await pool.query(createTableSql);
}

export async function insertSightingMoose(dbPool, postbody) {
  try {
    let values = [];
    let paramCounter = 1;
    let placeholders = [];

    postbody.sightings.forEach(sighting => {
      console.log(sighting);
      if (sighting.status !== 'Synced') {
        sighting.mooseArray.forEach(moose => {
          values.push(1, sighting.id, new Date(sighting.dateOfSighting * 1000), sighting.location[0], sighting.location[1], moose?.age || null, moose?.gender || null, 'Healthy');
          let valuePlaceholders = [];
          for (let i = 0; i < 8; i++) {
            valuePlaceholders.push(`$${paramCounter++}`);
          }
          placeholders.push(`(${valuePlaceholders.join(', ')})`);
        });
      }
    });

    if (values.length < 1) {
      console.log("There is nothing new to sync");
      return;
    }

    const insertSQL = `INSERT INTO Moose (clientId, sightingId, date, lat, long, lifestage, gender, health) VALUES ${placeholders.join(', ')}`;

    await dbPool.query(insertSQL, values);
    console.log("Insertion successful");
  } catch (error) {
    console.error("Error during database insertion: ", error);
    throw error;
  }
}

export async function findUserMeese(dbPool: any, user: any) {
  let findUserSQL = 'SELECT * FROM Moose WHERE clientId = ?'
  console.log(findUserSQL);
  await dbPool.query(findUserSQL, user);
}
