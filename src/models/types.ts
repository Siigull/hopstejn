import type { InferSelectModel } from 'drizzle-orm';
import { castles, popis, popis_pronajem, images, parametry } from './schema.ts';

export type castle = InferSelectModel<typeof castles>;
export type Popis = InferSelectModel<typeof popis>;
export type PopisPronajem = InferSelectModel<typeof popis_pronajem>;
export type Images = InferSelectModel<typeof images>;
export type Parametry = InferSelectModel<typeof parametry>;
