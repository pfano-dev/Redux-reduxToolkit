const redux = require("redux");
const thunkMiddleware = require("redux-thunk").default;

const axios = require("axios");

const createStore = redux.createStore;
const applyMiddleware = redux.applyMiddleware;

const initialState = {
  loading: false,
  users: [],
  error: "",
};

const FETCH_USERS_REQUESTED = "FETCH_USERS_REQUESTED";
const FETCH_USERS_SUCCEEDED = "FETCH_USERS_SUCCEEDED";
const FETCH_USERS_FAILED = "FETCH_USERS_FAILED";

function fetchUserRequested() {
  return {
    type: FETCH_USERS_REQUESTED,
  };
}

function fetchUserSucceede(user) {
  return {
    type: FETCH_USERS_SUCCEEDED,
    payload: user,
  };
}

function fetchUserFailed(error) {
  return {
    type: FETCH_USERS_FAILED,
    payload: error,
  };
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS_REQUESTED:
      return {
        ...state,
        loading: true,
      };
    case FETCH_USERS_SUCCEEDED:
      return {
        ...state,
        users: action.payload,
      };
    case FETCH_USERS_FAILED:
      return {
        ...state,
        error: action.payload,
      };
  }
};

const fetchUsers = () => {
  return function (dispatch) {
    dispatch(fetchUserRequested());
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        const users = response.data.map((user) => user.id);
        dispatch(fetchUserSucceede(users));
      })
      .catch((error) => {
        dispatch(fetchUserFailed(error.message));
      });
  };
};

const store = createStore(reducer, applyMiddleware(thunkMiddleware));

store.subscribe(() => {
  console.log("users", store.getState());
});

store.dispatch(fetchUsers());
