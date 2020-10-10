export const initialState = {
  id: 0,
  name: '',
};

export const UserReducer = (state, action) => {
  switch (action.type) {
    case 'setUser':
      return { ...state, ...action.payload };

    default:
      return state;
  }
};
