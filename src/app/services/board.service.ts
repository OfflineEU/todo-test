import {Injectable} from '@angular/core';
import {Board, Card} from '../../environments/interfaces';

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  boards: Board[] = [
    {
      id: 0, name: 'Board #1', columns: [
        {
          id: 0, name: 'Column #1', cards: [
            {id: 0, name: 'Card #1', content: 'Lorem ipsum dolor sit amet, consectetur adipisicing.',},
            {id: 1, name: 'Card #2', content: 'Lorem ipsum dolor sit amet, consectetur adipisicing.',},
            {id: 2, name: 'Card #3', content: 'Lorem ipsum dolor sit amet, consectetur adipisicing.',}
          ]
        },
        {
          id: 1, name: 'Column #2', cards: [
            {id: 0, name: 'Card #1', content: 'Lorem ipsum dolor sit amet, consectetur adipisicing.',},
            {id: 1, name: 'Card #2', content: 'Lorem ipsum dolor sit amet, consectetur adipisicing.',},
            {id: 2, name: 'Card #3', content: 'Lorem ipsum dolor sit amet, consectetur adipisicing.',}
          ]
        },
        {
          id: 2, name: 'Column #3', cards: [
            {id: 0, name: 'Card #1', content: 'Lorem ipsum dolor sit amet, consectetur adipisicing.',},
            {id: 1, name: 'Card #2', content: 'Lorem ipsum dolor sit amet, consectetur adipisicing.',},
            {id: 2, name: 'Card #3', content: 'Lorem ipsum dolor sit amet, consectetur adipisicing.',}
          ]
        },
      ]
    },
    {
      id: 1, name: 'Board #2', columns: [
        {
          id: 0, name: 'Lorem ipsum dolor.', cards: [
            {id: 0, name: 'Card #1', content: 'Lorem ipsum dolor sit amet, consectetur adipisicing.',},
            {id: 1, name: 'Card #2', content: 'Lorem ipsum dolor sit amet, consectetur adipisicing.',},
            {id: 2, name: 'Card #3', content: 'Lorem ipsum dolor sit amet, consectetur adipisicing.',}
          ]
        },
        {
          id: 1, name: 'Column #2', cards: [
            {id: 0, name: 'Card #1', content: 'Lorem ipsum dolor sit amet, consectetur adipisicing.',},
            {id: 1, name: 'Card #2', content: 'Lorem ipsum dolor sit amet, consectetur adipisicing.',},
            {id: 2, name: 'Card #3', content: 'Lorem ipsum dolor sit amet, consectetur adipisicing.',}
          ]
        },
        {
          id: 2, name: 'Column #3', cards: [
            {id: 0, name: 'Card #1', content: 'Lorem ipsum dolor sit amet, consectetur adipisicing.',},
            {id: 1, name: 'Card #2', content: 'Lorem ipsum dolor sit amet, consectetur adipisicing.',},
            {id: 2, name: 'Card #3', content: 'Lorem ipsum dolor sit amet, consectetur adipisicing.',}
          ]
        },
        {
          id: 3, name: 'Column #4', cards: [
            {id: 0, name: 'Card #1', content: 'Lorem ipsum dolor sit amet, consectetur adipisicing.',},
            {id: 1, name: 'Card #2', content: 'Lorem ipsum dolor sit amet, consectetur adipisicing.',},
            {id: 2, name: 'Card #3', content: 'Lorem ipsum dolor sit amet, consectetur adipisicing.',}
          ]
        },
      ]
    }
  ];

  constructor() {
  }

  boardById(boardId: number) {
    return this.boards.find(b => b.id === boardId);
  }

  columnById(boardId: number, columnId: number) {
    return this.boards.find(b => b.id === boardId).columns.find(c => c.id === columnId);
  }

  cardById(boardId: number, columnId: number, cardId: number) {
    return this.boards.find(b => b.id === boardId).columns.find(c => c.id === columnId).cards.find(c => c.id === cardId);
  }

  getLastBoardId() {
    return this.boards[this.boards.length - 1].id;
  }

  getLastColumnId(boardId: number) {
    const columnArr = this.boardById(boardId).columns;
    return !!columnArr.length ? columnArr[columnArr.length-1].id : 0;
  }

  getLastCardId(boardId: number, columnId: number) {
    const cardArr = this.columnById(boardId, columnId).cards;
    return !!cardArr.length ? cardArr[cardArr.length-1].id : 0;
  }

  createBoard(board: Board) {
    this.boards.push(board);
  }

  deleteBoard(boardId: number) {
    const boardItem = this.boards.find(b => b.id === boardId);
    const result = this.boards.filter(b => b !== boardItem);
    return this.boards = result;
  }

  deleteColumn(boardId: number, columnId: number) {
    const columnItem = this.boards.find(b => b.id === boardId).columns.find(c => c.id === columnId);
    const result = this.boards.find(b => b.id === boardId).columns.filter(c => c !== columnItem);
    return this.boards.find(b => b.id === boardId).columns = result;
  }

  deleteCard(boardId: number, columnId: number, cardId: number) {
    const cardItem = this.boards.find(b => b.id === boardId).columns.find(c => c.id === columnId).cards.find(c => c.id === cardId);
    const result = this.boards.find(b => b.id === boardId).columns.find(c => c.id === columnId).cards.filter(c => c !== cardItem);
    return this.boards.find(b => b.id === boardId).columns.find(c => c.id === columnId).cards = result;
  }

  editCard(boardId: number, columnId: number, cardId: number, name: string, content: string) {
    const card: Card = this.cardById(boardId, columnId, cardId);
    card.name = name;
    card.content = content;
  }
}
