import userSlice, {
  initialState,
  registerUserThunk,
  loginUserThunk,
  getUserThunk,
  getUserOrdersThunk,
  userUpdateThunk,
  userLogoutThunk
} from './userSlice';

describe('Проверка работы редьюсера userSlice', () => {
  describe('Проверка работы экшена registerUserThunk', () => {
    test('Проверка работы экшена registerUserThunk.pending', () => {
      const action = { type: registerUserThunk.pending.type };
      const state = userSlice(initialState, action);
      expect(state.userError).toEqual(null);
      expect(state.isLoading).toEqual(true);
      expect(state.isAuthenticated).toEqual(false);
    });

    test('Проверка работы экшена registerUserThunk.rejected', () => {
      const error = 'Error';
      const action = {
        type: registerUserThunk.rejected.type,
        error: { message: error }
      };
      const state = userSlice(initialState, action);
      expect(state.userError).toEqual(error);
      expect(state.isLoading).toEqual(false);
      expect(state.isAuthenticated).toEqual(false);
    });

    test('Проверка работы экшена registerUserThunk.fulfilled', () => {
      const mockUser = { name: 'name', email: 'email' };
      const action = {
        type: registerUserThunk.fulfilled.type,
        payload: { user: mockUser }
      };
      const state = userSlice(initialState, action);
      expect(state.userError).toEqual(null);
      expect(state.userData).toEqual(mockUser);
      expect(state.isLoading).toEqual(false);
      expect(state.isAuthenticated).toEqual(false);
    });
  });

  describe('Проверка работы экшена loginUserThunk', () => {
    test('Проверка работы экшена loginUserThunk.pending', () => {
      const action = { type: loginUserThunk.pending.type };
      const state = userSlice(initialState, action);
      expect(state.userError).toEqual(null);
      expect(state.isLoading).toEqual(true);
      expect(state.isAuthenticated).toEqual(false);
    });

    test('Проверка работы экшена loginUserThunk.rejected', () => {
      const error = 'Error';
      const action = {
        type: loginUserThunk.rejected.type,
        error: { message: error }
      };
      const state = userSlice(initialState, action);
      expect(state.userError).toEqual(error);
      expect(state.isLoading).toEqual(false);
      expect(state.isAuthenticated).toEqual(false);
    });

    test('Проверка работы экшена loginUserThunk.fulfilled', () => {
      const mockUser = { name: 'name', email: 'email' };
      const action = {
        type: loginUserThunk.fulfilled.type,
        payload: { user: mockUser }
      };
      const state = userSlice(initialState, action);
      expect(state.userError).toEqual(null);
      expect(state.userData).toEqual(mockUser);
      expect(state.isLoading).toEqual(false);
      expect(state.isAuthenticated).toEqual(true);
    });
  });

  describe('Проверка работы экшена getUserThunk', () => {
    test('Проверка работы экшена getUserThunk.pending', () => {
      const action = { type: getUserThunk.pending.type };
      const state = userSlice(initialState, action);
      expect(state.userError).toEqual(null);
      expect(state.isLoading).toEqual(true);
      expect(state.isAuthenticated).toEqual(false);
    });

    test('Проверка работы экшена getUserThunk.rejected', () => {
      const error = 'Error';
      const action = {
        type: getUserThunk.rejected.type,
        error: { message: error }
      };
      const state = userSlice(initialState, action);
      expect(state.userError).toEqual(null);
      expect(state.isLoading).toEqual(false);
      expect(state.isAuthenticated).toEqual(false);
    });

    test('Проверка работы экшена getUserThunk.fulfilled', () => {
      const mockUser = { name: 'name', email: 'email' };
      const action = {
        type: getUserThunk.fulfilled.type,
        payload: { user: mockUser }
      };
      const state = userSlice(initialState, action);
      expect(state.userError).toEqual(null);
      expect(state.userData).toEqual(mockUser);
      expect(state.isLoading).toEqual(false);
      expect(state.isAuthenticated).toEqual(true);
    });
  });

  describe('Проверка работы экшена getUserOrdersThunk', () => {
    test('Проверка работы экшена getUserOrdersThunk.pending', () => {
      const action = { type: getUserOrdersThunk.pending.type };
      const state = userSlice(initialState, action);
      expect(state.userError).toEqual(null);
      expect(state.isLoading).toEqual(false);
      expect(state.isAuthenticated).toEqual(false);
    });

    test('Проверка работы экшена getUserOrdersThunk.rejected', () => {
      const error = 'Error';
      const action = {
        type: getUserOrdersThunk.rejected.type,
        error: { message: error }
      };
      const state = userSlice(initialState, action);
      expect(state.userError).toEqual(error);
      expect(state.isLoading).toEqual(false);
      expect(state.isAuthenticated).toEqual(false);
    });

    test('Проверка работы экшена getUserOrdersThunk.fulfilled', () => {
      const mockUserOrders = ['firstOrder', 'secondOrder', 'thrdOrder'];
      const action = {
        type: getUserOrdersThunk.fulfilled.type,
        payload: mockUserOrders
      };
      const state = userSlice(initialState, action);
      expect(state.userError).toEqual(null);
      expect(state.userOrders).toEqual(mockUserOrders);
      expect(state.isLoading).toEqual(false);
      expect(state.isAuthenticated).toEqual(true);
    });
  });

  describe('Проверка работы экшена userUpdateThunk', () => {
    test('Проверка работы экшена userUpdateThunk.pending', () => {
      const action = { type: userUpdateThunk.pending.type };
      const state = userSlice(initialState, action);
      expect(state.userError).toEqual(null);
      expect(state.isLoading).toEqual(true);
    });

    test('Проверка работы экшена userUpdateThunk.rejected', () => {
      const error = 'Error';
      const action = {
        type: userUpdateThunk.rejected.type,
        error: { message: error }
      };
      const state = userSlice(initialState, action);
      expect(state.userError).toEqual(error);
      expect(state.isLoading).toEqual(false);
    });

    test('Проверка работы экшена userUpdateThunk.fulfilled', () => {
      const mockUser = { name: 'name', email: 'email' };
      const action = {
        type: userUpdateThunk.fulfilled.type,
        payload: { user: mockUser }
      };
      const state = userSlice(initialState, action);
      expect(state.userError).toEqual(null);
      expect(state.userData).toEqual(mockUser);
      expect(state.isLoading).toEqual(false);
    });
  });

  describe('Проверка работы экшена userLogoutThunk', () => {
    test('Проверка работы экшена userLogoutThunk.pending', () => {
      const action = { type: userLogoutThunk.pending.type };
      const state = userSlice(initialState, action);
      expect(state.userError).toEqual(null);
      expect(state.isLoading).toEqual(true);
    });

    test('Проверка работы экшена userLogoutThunk.rejected', () => {
      const error = 'Error';
      const action = {
        type: userLogoutThunk.rejected.type,
        error: { message: error }
      };
      const state = userSlice(initialState, action);
      expect(state.userError).toEqual(error);
      expect(state.isLoading).toEqual(false);
    });

    test('Проверка работы экшена userLogoutThunk.fulfilled', () => {
      const action = {
        type: userLogoutThunk.fulfilled.type,
        payload: null
      };
      const state = userSlice(initialState, action);
      expect(state.userError).toEqual(null);
      expect(state.userData).toEqual(null);
      expect(state.isLoading).toEqual(false);
    });
  });
});
