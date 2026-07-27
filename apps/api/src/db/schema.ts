import {
  doublePrecision,
  pgTable,
  text,
  timestamp,
  uuid,
} from 'drizzle-orm/pg-core';

export const boards = pgTable('boards', {
  id: uuid('id').defaultRandom().primaryKey(),
  title: text('title').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const columns = pgTable('columns', {
  id: uuid('id').defaultRandom().primaryKey(),
  boardId: uuid('board_id')
    .notNull()
    .references(() => boards.id, { onDelete: 'cascade' }),
  title: text('title').notNull(),
  // Fractional index so a card/column can be reordered without renumbering siblings.
  position: doublePrecision('position').notNull(),
});

export const cards = pgTable('cards', {
  id: uuid('id').defaultRandom().primaryKey(),
  columnId: uuid('column_id')
    .notNull()
    .references(() => columns.id, { onDelete: 'cascade' }),
  title: text('title').notNull(),
  description: text('description').notNull().default(''),
  position: doublePrecision('position').notNull(),
});
