import constructorSlice, {
  addIngredient,
  removeIngredient,
  moveUpIngredient,
  moveDownIngredient,
  initialState
} from './constructorSlice';

import {
  mock_bun,
  mock_main_first,
  mock_main_second
} from '../mockData/mockData';

describe('Проверка работы редьюсера constructorSlice', () => {
  test('Проверка добавления ингредиента', () => {
    const newState = constructorSlice(
      initialState,
      addIngredient(mock_main_first)
    );

    const expectedState = {
      ...initialState,
      constructorItems: {
        bun: { ...mock_bun, id: 'mock_id0' },
        ingredients: [{ ...mock_main_first, id: expect.any(String) }]
      }
    };

    expect(newState.constructorItems.ingredients[0]).toEqual({
      ...expectedState.constructorItems.ingredients[0]
    });
  });

  test('Проверка удаления ингредиента', () => {
    const initialState = {
      constructorItems: {
        bun: { ...mock_bun, id: 'mock_id0' },
        ingredients: [{ ...mock_main_first, id: 'mock_id0' }]
      },
      orderRequest: false,
      orderModalData: null,
      loading: false,
      error: null
    };

    const newState = constructorSlice(
      initialState,
      removeIngredient('mock_id0')
    );

    const expectedState = {
      ...initialState,
      constructorItems: {
        bun: { ...mock_bun, id: 'mock_id0' },
        ingredients: []
      }
    };

    expect(newState.constructorItems.ingredients).toEqual(
      expectedState.constructorItems.ingredients
    );
  });

  test('  Проверка перемещения ингредиента вверх', () => {
    const initialState = {
      constructorItems: {
        bun: { ...mock_bun, id: 'mock_id0' },
        ingredients: [
          { ...mock_main_first, id: 'mock_id1' },
          { ...mock_main_second, id: 'mock_id2' }
        ]
      },
      orderRequest: false,
      orderModalData: null,
      loading: false,
      error: null
    };

    const newState = constructorSlice(initialState, moveDownIngredient(0));

    const expectedState = {
      ...initialState,
      constructorItems: {
        bun: { ...mock_bun, id: 'mock_id0' },
        ingredients: [
          { ...mock_main_second, id: 'mock_id2' },
          { ...mock_main_first, id: 'mock_id1' }
        ]
      }
    };

    expect(newState.constructorItems.ingredients).toEqual(
      expectedState.constructorItems.ingredients
    );
  });

  test('  Проверка перемещения ингредиента вниз', () => {
    const initialState = {
      constructorItems: {
        bun: { ...mock_bun, id: 'mock_id0' },
        ingredients: [
          { ...mock_main_first, id: 'mock_id1' },
          { ...mock_main_second, id: 'mock_id2' }
        ]
      },
      orderRequest: false,
      orderModalData: null,
      loading: false,
      error: null
    };

    const newState = constructorSlice(initialState, moveUpIngredient(1));

    const expectedState = {
      ...initialState,
      constructorItems: {
        bun: { ...mock_bun, id: 'mock_id0' },
        ingredients: [
          { ...mock_main_second, id: 'mock_id2' },
          { ...mock_main_first, id: 'mock_id1' }
        ]
      }
    };

    expect(newState.constructorItems.ingredients).toEqual(
      expectedState.constructorItems.ingredients
    );
  });
});
