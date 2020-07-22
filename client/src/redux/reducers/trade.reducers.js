import { 
  CREATE_TRADE_BEGIN,
  CREATE_TRADE_SUCCESS,
  CREATE_TRADE_FAILURE,
} from "../actions/trade.actions";

const initialState = {
  createdTrade: [],
  loading: false,
  error: null
}

const tradeReducer = (state=initialState, action) => {
  switch(action.type) {
    case CREATE_TRADE_BEGIN:
      return {
        ...state,
        loading: true
      }
    case CREATE_TRADE_SUCCESS:
      return {
        ...state,
        loading: false,
        createdTrade: action.payload.tradeInfo
      }
    case CREATE_TRADE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      }
    default:
      return state;
  }  
}

export default tradeReducer;