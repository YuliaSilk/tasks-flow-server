import { Request, Response } from 'express';

interface Card {
  id: string;
  title: string;
  description: string;
}

interface Column {
  id: string;
  name: string;
  cards: Card[];
}

interface Board {
  id: string;
  title: string;
  columns: Column[];
}

const boards: Board[] = [
  {
    id: 'board1',
    title: 'My Board',
    columns: [
      { id: 'todo', name: 'To Do', cards: [] },
      { id: 'inProgress', name: 'In Progress', cards: [] },
      { id: 'done', name: 'Done', cards: [] }
    ]
  }
];

export const createCard = (req: Request, res: Response): void => {
  const { boardId, columnId, title, description } = req.body;
  const board = boards.find((board) => board.id === boardId);

  if (board) {
    const column = board.columns.find((column) => column.id === columnId);
    
    if (column) {
      const newCard: Card = {
        id: `card${Date.now()}`,
        title,
        description
      };
      column.cards.push(newCard);
      res.status(201).json(newCard);
    } else {
      res.status(404).json({ message: 'Column not found' });
    }
  } else {
    res.status(404).json({ message: 'Board not found' });
  }
};

export const updateCard = (req: Request, res: Response): void => {
  const { boardId, columnId, cardId, title, description } = req.body;
  const board = boards.find((board) => board.id === boardId);

  if (board) {
    const column = board.columns.find((column) => column.id === columnId);
    
    if (column) {
      const card = column.cards.find((card) => card.id === cardId);
      
      if (card) {
        card.title = title;
        card.description = description;
        res.status(200).json({ message: 'Card updated successfully', card });
      } else {
        res.status(404).json({ message: 'Card not found' });
      }
    } else {
      res.status(404).json({ message: 'Column not found' });
    }
  } else {
    res.status(404).json({ message: 'Board not found' });
  }
};

export const deleteCard = (req: Request, res: Response): void => {
  const { boardId, columnId, cardId } = req.body;
  const board = boards.find((board) => board.id === boardId);

  if (board) {
    const column = board.columns.find((column) => column.id === columnId);
    
    if (column) {
      const cardIndex = column.cards.findIndex((card) => card.id === cardId);
      
      if (cardIndex !== -1) {
        column.cards.splice(cardIndex, 1);
        res.status(200).json({ message: 'Card deleted successfully' });
      } else {
        res.status(404).json({ message: 'Card not found' });
      }
    } else {
      res.status(404).json({ message: 'Column not found' });
    }
  } else {
    res.status(404).json({ message: 'Board not found' });
  }
};