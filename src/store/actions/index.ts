const fetchLogin = async (data: any) => {
  const resp = await fetch('https://test-front-api.gojob.tech/fog/login/authenticate', {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(data)
  });
  if (resp.ok) {
    return await resp.json();
  } else {
    throw new Error(resp.statusText);
  }
};

export const login = (data: any) => async (dispatch: ({}) => void) => {
  dispatch({ type: 'LOGIN_REQUEST' });
  try {
    const response = await fetchLogin(data);
    dispatch({ type: 'LOGIN_SUCCESS', data: response });
    window.localStorage.setItem('user_token', response.auth.token);
  } catch (error) {
    dispatch({ type: 'LOGIN_ERROR' });
  }
};
