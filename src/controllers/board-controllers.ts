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
  name: string;
  columns: Column[];
}

const boards: Board[] = [
  {
    id: 'board1',
    name: 'My Board',
    columns: [
      { id: 'todo', name: 'To Do', cards: [] },
      { id: 'inProgress', name: 'In Progress', cards: [] },
      { id: 'done', name: 'Done', cards: [] }
    ]
  }
];

export const getBoardById = (req: Request, res: Response): void => {
  const { id } = req.params;
  const board = boards.find((board) => board.id === id);
  
  if (board) {
    res.json(board);
  } else {
    res.status(404).json({ message: 'Board not found' });
  }
};

export const createBoard = (req: Request, res: Response): void => {
  const { name } = req.body;
  const newBoard: Board = {
    id: `board${Date.now()}`,
    name,
    columns: [
      { id: 'todo', name: 'To Do', cards: [] },
      { id: 'inProgress', name: 'In Progress', cards: [] },
      { id: 'done', name: 'Done', cards: [] }
    ]
  };

  boards.push(newBoard);
  res.status(201).json(newBoard);
};

export const updateBoard = (req: Request, res: Response): void => {
  const { id } = req.params;
  const { name } = req.body;
  const board = boards.find((board) => board.id === id);

  if (board) {
    board.name = name;
    res.status(200).json({ message: 'Board updated successfully', board });
  } else {
    res.status(404).json({ message: 'Board not found' });
  }
};

export const deleteBoard = (req: Request, res: Response): void => {
  const { id } = req.params;
  const boardIndex = boards.findIndex((board) => board.id === id);

  if (boardIndex !== -1) {
    boards.splice(boardIndex, 1);
    res.status(200).json({ message: 'Board deleted successfully' });
  } else {
    res.status(404).json({ message: 'Board not found' });
  }
};