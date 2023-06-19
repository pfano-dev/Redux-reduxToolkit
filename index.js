const redux = require("redux");
const bindActionCreators = redux.bindActionCreators; //THIS FUNCTION TAKE TWO ARGUMENT,  OBJECT ACTION AS AN FIRST ARGUMENT AND DISPATCH AS SECOND ARGUMENT
const combineReducers = redux.combineReducers; //THIS FUCTIUON TAKE OBJECT AS AN ARGUMENT

//logger to dasplay data in terminarl
const applyMiddleware = redux.applyMiddleware;
const reduxLogger = require("redux-logger");
const logger = reduxLogger.createLogger();

const createStore = redux.createStore;

const CAKE_ORDERED = "CAKE_ORDERED";
const RESTORE_CAKE = "RESTORE_CAKE";
const ICE_ORDERED = "ICE_ORDERED";
const RESTORE_ICE = "RESTORE_ICE";

//FUCTION CREATOR  IS A FUCTION THAT RETURN OBJECT

function orderCake() {
  //ACTION IS AN OBJECT WITH TYPE PROPERTY
  return {
    type: CAKE_ORDERED,
  };
}
function restoreCake(Qty = 1) {
  return {
    type: RESTORE_CAKE,
    payload: Qty,
  };
}
function orderIce() {
  //ACTION IS AN OBJECT WITH TYPE PROPERTY
  return {
    type: ICE_ORDERED,
  };
}
function restoreIce(Qty = 1) {
  return {
    type: RESTORE_ICE,
    payload: Qty,
  };
}

const intialState = {
  numOfCakes: 10,
  numOfIce: 20,
};

//REDUCER IS A FUNCTION THAT TAKE TWO PARAMETER , INTIAL OR PREVIOUS STATE AS FIRST ARGUMENTS AS A FIRST ARGUMENT AND ACTION AS SECOND ARGUMANT

const cakeReducer = (state = intialState, action) => {
  // console.log(action.type);
  switch (action.type) {
    case CAKE_ORDERED:
      return {
        ...state,
        numOfCakes: state.numOfCakes - 1,
      };
    case RESTORE_CAKE: {
      return {
        ...state,
        numOfCakes: state.numOfCakes + action.payload,
      };
    }
    case ICE_ORDERED: {
      return {
        ...state,
        numOfIce: state.numOfIce - 1,
      };
    }
    case RESTORE_ICE: {
      return {
        ...state,
        numOfIce: state.numOfIce + action.payload,
      };
    }
    default:
      return state;
  }
};

const iceReducer = (state = intialState, action) => {
  console.log(action.type);
  switch (action.type) {
    case CAKE_ORDERED:
      return {
        ...state,
        numOfCakes: state.numOfCakes - 1,
      };
    case RESTORE_CAKE: {
      return {
        ...state,
        numOfCakes: state.numOfCakes + action.payload,
      };
    }
    case ICE_ORDERED: {
      return {
        ...state,
        numOfIce: state.numOfIce - 1,
      };
    }
    case RESTORE_ICE: {
      return {
        ...state,
        numOfIce: state.numOfIce + action.payload,
      };
    }
    default:
      return state;
  }
};

const root = combineReducers({
  cake: cakeReducer,
  ice: iceReducer,
});

const store = createStore(root, applyMiddleware(logger));

console.log("intialState:", store.getState());

//SUBCRIBE TAKE A FUCTION AS AN ARGUMENTS AND RETUEN UPDATED STORE
const les = store.subscribe(() => {
  // console.log("uptadedStore: ", store.getState());
});

// store.dispatch(orderCake());
// store.dispatch(orderCake());
// store.dispatch(orderCake());
// store.dispatch(restoreCake(3));

const action = bindActionCreators(
  { orderCake, orderIce, restoreCake, restoreIce },
  store.dispatch
);

action.orderCake();
action.orderCake();
action.orderCake();
action.restoreCake(3);
action.orderIce();
action.orderIce();
action.orderIce();
action.restoreIce(3);

les();
