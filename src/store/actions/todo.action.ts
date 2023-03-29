import {
  FilterActionTypes,
  StateMapper,
} from 'easy-peasy';

import { TodosModel } from '../models/todos';

export const TodoAction = (
  state: StateMapper<FilterActionTypes<TodosModel>>,
  payload: string
) => {
  state.items.push(payload)
}
