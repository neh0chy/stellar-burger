import store, { rootReducer } from './store';

test('Проверка работы rootReducer', () => {
  expect(rootReducer(undefined, { type: 'UNKNOWN_ACTION' })).toEqual(
    store.getState()
  );
});
