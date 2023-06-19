const redux = require("redux");
const produce = require("immer").produce;
const createStore = redux.createStore;

intialState = {
  name: "pfano",
  address: {
    street: "bunzhe",
    stand: 48,
  },
  surname: "muleya",
};

const EMP_DETAILS = "EMP_DETAILS";

function emp(street) {
  return {
    type: EMP_DETAILS,
    payload: street,
  };
}

const reducer = (state = intialState, action) => {
  switch (action.type) {
    case EMP_DETAILS:
      // return {
      //   ...state,
      //   address: {
      //     ...state.address,
      //     street: action.payload,
      //   },
      // };

      return produce(state, (draft) => {
        draft.address.street = action.payload;
      });
  }
};

const store = createStore(reducer);

console.log("intialState: ", store.getState());

const unsubscribe = store.subscribe(() => {
  console.log("updated: ", store.getState());
});

store.dispatch(emp("Tshabvuma"));

unsubscribe();
