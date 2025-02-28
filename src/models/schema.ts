import { text, sqliteTable, integer, real } from 'drizzle-orm/sqlite-core';
import { relations } from 'drizzle-orm';

export const castles = sqliteTable('castles', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  type: integer('type'), // 0 -> hrad, 1 -> Nafukovadla, 
                         // 2 -> Skluzavky, 3 -> Hry 
                         // 4 -> Stany, 
  canHire: integer('canHire', { mode: 'boolean' }),
})

export const castleRelations = relations(castles, ({ one, many }) => ({
    parametry: one(parametry),
    popis: one(popis),
    popis_pronajem: one(popis_pronajem),
    images: many(images),
}))

export const parametry = sqliteTable('parametry', {
    id: integer('id').primaryKey().references(() => castles.id),
    x: real('x'),
    y: real('y'),
    z: real('z').notNull(),
    special: text("special"),
})

export const popis = sqliteTable('popis', {
    id: integer('id').primaryKey().references(() => castles.id),
    hlavni: text('hlavni').notNull(),
    druh: text('druh').notNull(),
    material: text('material').notNull(),
    vybaveni: text('vybaveni').notNull(),
    kapacita: text('kapacita').notNull(),
})

export const popis_pronajem = sqliteTable('popis_pronajem', {
    id: integer('id').primaryKey().references(() => castles.id),
    skladem: text('skladem'),
    cena: integer('cena').notNull(),
    cena_hodina: integer('cena_hodina').notNull(),
})

export const images = sqliteTable('images', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    castle_id: integer('castle_id').references(() => castles.id),
    path: text('path').notNull(),
})

export const popisRelations = relations(popis, ({ one }) => ({
    owner: one(castles, {
        fields: [popis.id],
        references: [castles.id],
    }),
}));

export const popis_pronajemRelations = relations(popis_pronajem, ({ one }) => ({
    owner: one(castles, {
        fields: [popis_pronajem.id],
        references: [castles.id],
    }),
}));

export const parametryRelations = relations(parametry, ({ one }) => ({
    owner: one(castles, {
        fields: [parametry.id],
        references: [castles.id],
    }),
}));

export const imagesRelations = relations(images, ({ one }) => ({
    owner: one(castles, {
        fields: [images.castle_id],
        references: [castles.id],
    }),
}));
