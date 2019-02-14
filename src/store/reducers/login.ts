const defaultState = {
  pending: false,
  error: false,
  success: false,
  user: {}
};

export default (state: any = defaultState, action: any) => {
  switch (action.type) {
    case 'LOGIN_REQUEST':
      return {
        ...state,
        error: false,
        pending: true
      };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        error: false,
        user: action.data,
        pending: false,
        success: true
      };
    case 'LOGIN_ERROR':
      return {
        ...state,
        error: true,
        pending: false
      };

    default:
      return state;
  }
};
