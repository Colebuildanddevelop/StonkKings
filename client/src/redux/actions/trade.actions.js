export const CREATE_TRADE_BEGIN = "CREATE_TRADE_BEGIN";
export const CREATE_TRADE_SUCCESS = "CREATE_TRADE_SUCCESS";
export const CREATE_TRADE_FAILURE = "CREATE_TRADE_FAILURE";

const createTradeBegin = () => ({
  type: CREATE_TRADE_BEGIN 
});

const createTradeSuccess = tradeInfo => ({
  type: CREATE_TRADE_SUCCESS,
  payload: { tradeInfo }
});

const createTradeFailure = err => ({
  type: CREATE_TRADE_FAILURE,
  payload: { err }
});

export const createTrade = (tradeObj, token) => {
  return dispatch => {
    console.log("tradeObj", tradeObj)
    dispatch(createTradeBegin());
    return fetch("http://localhost:3000/api/trades", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token
      },
      body: JSON.stringify({
        entryId: tradeObj.entryId,
        stockTicker: tradeObj.stockTicker,
        time: tradeObj.time,
        buyOrSell: tradeObj.buyOrSell,
        price: tradeObj.price,
        amountOfShares: tradeObj.amountOfShares
      })
    })
    .then(res => res.json())
    .then(tradeInfo => {
      dispatch(createTradeSuccess(tradeInfo))
      return tradeInfo;
    })
    .catch(err => dispatch(createTradeFailure(err)));
  };
};