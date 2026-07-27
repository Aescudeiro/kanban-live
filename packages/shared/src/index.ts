/**
 * Shared contracts between the NestJS gateway (apps/api) and the React client
 * (apps/web). Keeping the domain model and the real-time event names in one
 * place means both sides fail to compile the moment they drift apart.
 */

export type BoardId = string;
export type ColumnId = string;
export type CardId = string;

export interface Card {
  id: CardId;
  columnId: ColumnId;
  title: string;
  description: string;
  /** Fractional index used to order cards within a column. */
  position: number;
}

export interface Column {
  id: ColumnId;
  boardId: BoardId;
  title: string;
  position: number;
}

export interface Board {
  id: BoardId;
  title: string;
  columns: Column[];
  cards: Card[];
}

/** Names of the events exchanged over the websocket connection. */
export const KanbanEvents = {
  BoardState: 'board:state',
  CardCreated: 'card:created',
  CardMoved: 'card:moved',
  CardUpdated: 'card:updated',
  CardDeleted: 'card:deleted',
} as const;

export type KanbanEvent = (typeof KanbanEvents)[keyof typeof KanbanEvents];

export interface CardMovedPayload {
  cardId: CardId;
  toColumnId: ColumnId;
  position: number;
}
