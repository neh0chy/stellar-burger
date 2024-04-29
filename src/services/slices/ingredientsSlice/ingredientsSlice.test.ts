import ingredientsSlice, {
  getIngredientsThunk,
  initialState
} from './ingredientsSlice';

describe('Проверка работы редьюсера ingredientsSlice', () => {
  test('Проверка работы экшена getIngredientsThunk.pending', () => {
    const action = { type: getIngredientsThunk.pending.type };
    const state = ingredientsSlice(initialState, action);
    expect(state.error).toEqual(null);
    expect(state.loading).toEqual(true);
  });

  test('Проверка работы экшена getIngredientsThunk.rejected', () => {
    const error = 'Fetching error';
    const action = {
      type: getIngredientsThunk.rejected.type,
      error: { message: error }
    };
    const state = ingredientsSlice(initialState, action);
    expect(state.error).toEqual(error);
    expect(state.loading).toEqual(false);
  });

  test('Проверка работы экшена getIngredientsThunk.fulfilled', () => {
    const mockIngredients = [
      'firstIngredient',
      'secondIngredient',
      'thirdIngredient'
    ];
    const action = {
      type: getIngredientsThunk.fulfilled.type,
      payload: mockIngredients
    };
    const state = ingredientsSlice(initialState, action);
    expect(state.ingredients).toEqual(mockIngredients);
    expect(state.loading).toEqual(false);
  });
});
