export interface Board {
  id: number,
  name: string,
  columns?: Column[],
}
export interface Column {
  id:number,
  name: string,
  cards?: Card[],
}
export interface Card {
  id: number,
  name: string,
  content: string,
}
