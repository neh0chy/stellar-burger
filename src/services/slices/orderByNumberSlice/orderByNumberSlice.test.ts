import orderByNumberSlice, {
  initialState,
  getOrderByNumberThunk
} from './orderByNumberSlice';

describe('Проверка работы редьюсера orderByNumberSlice', () => {
  test('Проверка работы экшена getOrderByNumberThunk.pending', () => {
    const action = { type: getOrderByNumberThunk.pending.type };
    const state = orderByNumberSlice(initialState, action);
    expect(state.error).toEqual(null);
    expect(state.loading).toEqual(true);
  });

  test('Проверка работы экшена getOrderByNumberThunk.rejected', () => {
    const error = 'Error';
    const action = {
      type: getOrderByNumberThunk.rejected.type,
      error: { message: error }
    };
    const state = orderByNumberSlice(initialState, action);
    expect(state.error).toEqual(error);
    expect(state.loading).toEqual(false);
  });

  test('Проверка работы экшена getOrderByNumberThunk.fulfilled', () => {
    const mockOrder = ['mockedOrder'];
    const action = {
      type: getOrderByNumberThunk.fulfilled.type,
      payload: { orders: mockOrder }
    };
    const state = orderByNumberSlice(initialState, action);
    expect(state.orderData).toEqual(mockOrder[0]);
    expect(state.loading).toEqual(false);
  });
});
