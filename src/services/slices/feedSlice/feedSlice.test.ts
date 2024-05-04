import feedSlice, { getFeedThunk, initialState } from './feedSlice';

describe('Проверка работы редьюсера feedSlice', () => {
  test('Проверка работы экшена getFeedThunk.pending', () => {
    const action = { type: getFeedThunk.pending.type };
    const state = feedSlice(initialState, action);
    expect(state.error).toEqual(null);
    expect(state.loading).toEqual(true);
  });

  test('Проверка работы экшена getFeedThunk.rejected', () => {
    const error = 'Fetching error';
    const action = {
      type: getFeedThunk.rejected.type,
      error: { message: error }
    };
    const state = feedSlice(initialState, action);
    expect(state.error).toEqual(error);
    expect(state.loading).toEqual(false);
  });

  test('Проверка работы экшена getFeedThunk.fulfilled', () => {
    const mockOrders = ['firstOrder', 'secondOrder', 'thirdOrder'];
    const action = {
      type: getFeedThunk.fulfilled.type,
      payload: { orders: mockOrders }
    };
    const state = feedSlice(initialState, action);
    expect(state.orders).toEqual(mockOrders);
    expect(state.loading).toEqual(false);
  });
});
