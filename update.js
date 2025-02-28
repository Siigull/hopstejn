import sqlite3 from 'sqlite3';
import { open } from 'sqlite';


  const db = await open({
    filename: 'my-database.db',
    driver: sqlite3.Database
  });

  // Function to insert a castle with its relations
  const insertCastleWithRelations = async (castleData) => {
    const { castle, parametry, popis, popis_pronajem } = castleData;

    // Insert into castles table
    const result = await db.run(`
      INSERT INTO castles (name, content)
      VALUES (?, ?)
    `, [castle.name, castle.content]);

    // Get the last inserted row id (i.e., the castle id)
    const castleId = result.lastID;

    // Insert into parametry table
    await db.run(`
      INSERT INTO parametry (id, x, y, z, special)
      VALUES (?, ?, ?, ?, ?)
    `, [castleId, parametry.x, parametry.y, parametry.z, parametry.special]);

    // Insert into popis table
    await db.run(`
      INSERT INTO popis (id, hlavni, pudorys, vyska, druh, material, vybaveni, kapacita)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `, [castleId, popis.hlavni, popis.pudorys, popis.vyska, popis.druh, popis.material, popis.vybaveni, popis.kapacita]);

    // Insert into popis_pronajem table
    await db.run(`
      INSERT INTO popis_pronajem (id, cena, cena_hodina)
      VALUES (?, ?, ?)
    `, [castleId, popis_pronajem.cena, popis_pronajem.cena_hodina]);
  };

  // Example data for a castle and its relations
  const castleData = {
    castle: { name: 'Castle Black', content: 'The stronghold of the Night\'s Watch' },
    parametry: { x: 123.45, y: 67.89, z: 10.11, special: 'Special Feature' },
    popis: {
      hlavni: 'Main Hall',
      pudorys: 'Rectangular',
      vyska: '50 meters',
      druh: 'Stone',
      material: 'Granite',
      vybaveni: 'Armory',
      kapacita: '100 people'
    },
    popis_pronajem: { cena: 1000, cena_hodina: 50 }
  };

  // Insert example castle with relations
  await insertCastleWithRelations(castleData);

  // Close the database
  await db.close();

// Example usage
const newCastleData = {
  name: 'Castle Example',
  type: 0, // Example type
  parametry: {
    x: 10.0,
    y: 20.0,
    z: 30.0,
    special: 'Special features here',
  },
  popis: {
    hlavni: 'Author',
    pudorys: 'Layout',
    vyska: 'Height',
    druh: 'Type',
    material: 'Material',
    vybaveni: 'Equipment',
    kapacita: 'Capacity',
  },
  popis_pronajem: {
    skladem: 'In stock',
    cena: 1000,
    cena_hodina: 100,
  },
  images: [
    { path: 'image1.jpg' },
    { path: 'image2.jpg' },
  ],
};

fs.readdir("hrady", (err, files) => {
  if (err) {
    console.error('Error reading directory:', err);
    return;
  }

  files.forEach((file) => {
    const filePath = path.join("hrady", file);
    fs.readFile(filePath, 'utf8', async (err, data) => {
      if (err) {
        console.error('Error reading file:', err);
        return;
      }

      try {
        const castleData = JSON.parse(data);
				print(data);
        // await insertCastleWithRelations(castleData);
        console.log(`Inserted castle from file: ${file}`);
      } catch (error) {
        console.error('Error inserting castle:', error);
      }
    });
  });
});
