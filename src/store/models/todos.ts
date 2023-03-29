import { action, Action } from 'easy-peasy'

import { TodoAction } from '../actions/todo.action'

export interface TodosModel {
  items: string[]
  add: Action<TodosModel, string>
}

const todos: TodosModel = {
  items: ['hello'],
  add: action(TodoAction),
}

export default todos
