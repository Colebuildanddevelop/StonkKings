import { 
  CREATE_TRADE_BEGIN,
  CREATE_TRADE_SUCCESS,
  CREATE_TRADE_FAILURE,
  FETCH_TRADES_BY_ENTRY_BEGIN,
  FETCH_TRADES_BY_ENTRY_SUCCESS,
  FETCH_TRADES_BY_ENTRY_FAILURE
} from "../actions/trade.actions";


const initialState = {
  createdTrade: [],
  tradesByEntry: [],
  loadingCreatedTrade: false,
  loadingTradeByEntryArr: false,
  createTradeErr: null,
  tradesByEntryErr: null
}

const tradeReducer = (state=initialState, action) => {
  switch(action.type) {
    case CREATE_TRADE_BEGIN:
      return {
        ...state,
        loadingCreatedTrade: true
      }
    case CREATE_TRADE_SUCCESS:
      return {
        ...state,
        loadingCreatedTrade: false,
        createdTrade: action.payload.tradeInfo
      }
    case CREATE_TRADE_FAILURE:
      return {
        ...state,
        loadingCreatedTrade: false,
        createTradeErr: action.payload.error
      }
    case FETCH_TRADES_BY_ENTRY_BEGIN:
      return {
        ...state,
        loadingTradeByEntryArr: true
      }
    case FETCH_TRADES_BY_ENTRY_SUCCESS:
      return {
        ...state,
        loadingTradeByEntryArr: false,
        tradesByEntry: action.payload.tradesByEntry
      }
    case FETCH_TRADES_BY_ENTRY_FAILURE:
      return {
        ...state,
        loadingTradeByEntryArr: false,
        tradesByEntryErr: action.payload.err
      }

    default:
      return state;
  }  
}

export default tradeReducer;