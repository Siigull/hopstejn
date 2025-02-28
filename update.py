import sqlite3 as lite
import os
import re

def parse_floats(input_string):
    input_string = input_string.replace(',', '.')

    float_pattern = r'\b\d+\.\d+\b'
    int_pattern = r'(?<!\d\.)\b\d+\b(?!\.\d)'
    
    # Find all floats and integers with their positions
    floats = [(float(m.group()), m.start()) for m in re.finditer(float_pattern, input_string)]
    ints = [(int(m.group()), m.start()) for m in re.finditer(int_pattern, input_string)]
    
    # Combine and sort them based on their positions
    numbers = floats + ints
    numbers.sort(key=lambda x: x[1])
    
    # Extract the sorted numbers
    sorted_numbers = [num[0] for num in numbers]
    
    return sorted_numbers

con = lite.connect('db.sqlite3')

for file in os.listdir("hrady"):
    hrad = {}
    hrad['fotky'] = []
    hrad['vybaveni'] = ""
    state = 0
    state_read = True
    with open("./hrady/" + file, "r") as f:
        for line in f:
            if line == "\n" and state_read:
                state += 1
                state_read = False

            else:
                state_read = True

                if state == 0:
                    hrad['name'] = line[:-1]

                elif state == 1:
                    hrad['type'] = int(line[:-1])

                elif state == 2:
                    hrad['popis'] = line[:-1]

                elif state == 3:
                    pattern = re.compile("^(([0-9]*[,])?[0-9]+) m x (([0-9]*[,])?[0-9]+) m")
                    if pattern.match(line):
                        floats = parse_floats(line)
                        hrad['x'] = floats[0]
                        hrad['y'] = floats[1]

                    else:
                        hrad['special'] = line[:-1]
                
                elif state == 4:
                    hrad['z'] = parse_floats(line)[0]

                elif state == 5:
                    hrad['druh'] = line[:-1]

                elif state == 6:
                    hrad['material'] = line[:-1]

                elif state == 7:
                    hrad['vybaveni'] += line

                elif state == 8:
                    hrad['kapacita'] = line[:-1]

                elif state == 9:
                    hrad['skladem'] = line[:-1]

                elif state == 10:
                    line = line[0] + line[2:]

                    floats = parse_floats(line)

                    hrad['cena'] = floats[0]
                    hrad['cena_hodina'] = floats[1]

                elif state == 11:
                    hrad['fotky'].append(line[:-1])
        # 
        # for i in hrad:
        #     print(f'{i} {hrad[i]}')

        with con:
            cur = con.cursor()    
            cur.execute("INSERT INTO castles(name, type, canHire) VALUES(?, ?, ?)", [hrad['name'], hrad['type'], True])
            id = cur.lastrowid
            if 'special' in hrad:
                cur.execute("INSERT INTO parametry (id, x, y, z, special) VALUES(?, ?, ?, ?, ?)", 
                            [id, None, None, hrad['z'], hrad['special']])
            else:
                cur.execute("INSERT INTO parametry (id, x, y, z, special) VALUES(?, ?, ?, ?, ?)", 
                            [id, hrad['x'], hrad['y'], hrad['z'], None])

            cur.execute("INSERT INTO popis (id, hlavni, druh, material, vybaveni, kapacita) VALUES (?, ?, ?, ?, ?, ?)",
                        [id, hrad['popis'], hrad['druh'], hrad['material'], hrad['vybaveni'], hrad['kapacita']])
            
            cur.execute("INSERT INTO popis_pronajem (id, skladem, cena, cena_hodina) VALUES (?, ?, ?, ?)",
                        [id, hrad['skladem'], hrad['cena'], hrad['cena_hodina']])
            
            for fotka in hrad['fotky']:
                cur.execute("INSERT INTO images (castle_id, path) VALUES (?, ?)", 
                            [id, fotka])


#     const result = await db.run(`
#       INSERT INTO castles (name, content)
#       VALUES (?, ?)
#     `, [castle.name, castle.content]);

#     // Get the last inserted row id (i.e., the castle id)
#     const castleId = result.lastID;

#     // Insert into parametry table
#     await db.run(`
#       INSERT INTO parametry (id, x, y, z, special)
#       VALUES (?, ?, ?, ?, ?)
#     `, [castleId, parametry.x, parametry.y, parametry.z, parametry.special]);

#     // Insert into popis table
#     await db.run(`
#       INSERT INTO popis (id, hlavni, pudorys, vyska, druh, material, vybaveni, kapacita)
#       VALUES (?, ?, ?, ?, ?, ?, ?, ?)
#     `, [castleId, popis.hlavni, popis.pudorys, popis.vyska, popis.druh, popis.material, popis.vybaveni, popis.kapacita]);

#     // Insert into popis_pronajem table
#     await db.run(`
#       INSERT INTO popis_pronajem (id, cena, cena_hodina)
#       VALUES (?, ?, ?)
#     `, [castleId, popis_pronajem.cena, popis_pronajem.cena_hodina]);
#   };