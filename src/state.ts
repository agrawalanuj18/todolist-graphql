// src/state.ts
import { atom } from 'recoil';

interface Todo {
  id: number;
  description: string;
}

export const todoListState = atom<Todo[]>({
  key: 'todoListState',
  default: [],
});
