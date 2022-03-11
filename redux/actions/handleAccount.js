export const addUser = (user) => {
  return (dispatch) => {
    dispatch({
      type: "ADD_USER",
      payload: user ? user : null,
    });
  };
};

export const removeUser = () => {
  return (dispatch) => {
    dispatch({
      type: "REMOVE_ACCOUNT",
      payload: null,
    });
  };
};
