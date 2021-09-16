import { combineReducers } from "redux";
import authReducer from "./authReducers";
import errorReducer from "./errorReducers";
import batteryReducer from "./batteryReducers";
import electronicReducer from "./electronicReducers";
import oilReducer from "./oilReducers";
import ReviewReducer from "./reviewReducers";
import HighlightReducer from "./highlightReducers";
import QuoteReducer from "./quoteReducers";
import CarReducer from "./carReducers";
import ServiceReducer from "./servicesReducers"
export default combineReducers({
    auth: authReducer,
    errors: errorReducer,
    battery: batteryReducer,
    electronic: electronicReducer,
    oil: oilReducer,
    review: ReviewReducer,
    highlight: HighlightReducer,
    quote: QuoteReducer,
    car: CarReducer,
    services: ServiceReducer
});