import { useDispatch, useSelector } from "react-redux";
import { RootReducerType } from "../index";
import { fetchDecodeData } from "src/actions/DecodeActions";
import { useEffect } from "react";

function ReduxModule() {
  const token = localStorage.getItem("access_token");

  const dispatch = useDispatch();

  const reduxToken = useSelector(
    (state: RootReducerType) => state.DecodeReducer
  );

  useEffect(() => {
    if (token) {
      console.log("header.js useEffect");
      dispatch(fetchDecodeData(token as string));
    } else {
      console.log("header.js not token");
    }
  }, []);

  return reduxToken;
}

export { ReduxModule };
