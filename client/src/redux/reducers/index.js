import { combineReducers } from "redux";
// import reducers here
import auth from "./auth.reducers";
import tournament from "./tournament.reducers";
import entry from "./entry.reducers";
import trade from "./trade.reducers";

export default combineReducers({ auth, tournament, entry, trade });
