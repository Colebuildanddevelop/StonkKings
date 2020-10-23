import { SERVER_URL } from "../../config";
export const CREATE_TRADE_BEGIN = "CREATE_TRADE_BEGIN";
export const CREATE_TRADE_SUCCESS = "CREATE_TRADE_SUCCESS";
export const CREATE_TRADE_FAILURE = "CREATE_TRADE_FAILURE";

const createTradeBegin = () => ({
  type: CREATE_TRADE_BEGIN,
});

const createTradeSuccess = (tradeInfo) => ({
  type: CREATE_TRADE_SUCCESS,
  payload: { tradeInfo },
});

const createTradeFailure = (err) => ({
  type: CREATE_TRADE_FAILURE,
  payload: { err },
});

export const createTrade = (tradeObj, token) => {
  return async (dispatch) => {
    try {
      dispatch(createTradeBegin());
      const result = await fetch(`${SERVER_URL}/api/trades`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
        body: JSON.stringify({
          entryId: tradeObj.entryId,
          stockTicker: tradeObj.stockTicker,
          time: tradeObj.time,
          buyOrSell: tradeObj.buyOrSell,
          price: tradeObj.price,
          amountOfShares: tradeObj.amountOfShares,
        }),
      });
      const tradeInfo = result.json();
      dispatch(createTradeSuccess(tradeInfo));
    } catch (err) {
      dispatch(createTradeFailure(err));
    }
  };
};

export const FETCH_TRADES_BY_ENTRY_BEGIN = "FETCH_TRADES_BY_ENTRY_BEGIN";
export const FETCH_TRADES_BY_ENTRY_SUCCESS = "FETCH_TRADES_BY_ENTRY_SUCCESS";
export const FETCH_TRADES_BY_ENTRY_FAILURE = "FETCH_TRADES_BY_ENTRY_FAILURE";

const fetchTradesByEntryBegin = () => ({
  type: FETCH_TRADES_BY_ENTRY_BEGIN,
});

const fetchTradesByEntrySuccess = (tradesByEntry) => ({
  type: FETCH_TRADES_BY_ENTRY_SUCCESS,
  payload: { tradesByEntry },
});

const fetchTradesByEntryFailure = (err) => ({
  type: FETCH_TRADES_BY_ENTRY_FAILURE,
  payload: { err },
});

export const getTradesByEntryId = (entryId) => async (dispatch) => {
  dispatch(fetchTradesByEntryBegin());
  try {
    const result = await fetch(`${SERVER_URL}/api/trades/${entryId}`);
    const tradesByEntry = await result.json();
    dispatch(fetchTradesByEntrySuccess(tradesByEntry));
  } catch (err) {
    dispatch(fetchTradesByEntryFailure(err));
  }
};
