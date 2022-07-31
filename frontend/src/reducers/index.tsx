import { combineReducers } from "redux";
import DecodeReducer from "./DecodeReducer";
import ImgIDReducer from "./ImgIDReducer";
// 모든 리듀서를 관할하는 것임
const rootReducer = combineReducers({
  DecodeReducer,
  ImgIDReducer,
});

export default rootReducer;
