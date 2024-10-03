import { setLoading } from "../Slices/Slices";
import { Dispatch } from "redux";


export const setLoadingTrueAsync = (dispatch: Dispatch) => {
  return new Promise<void>((resolve) => {
    dispatch(setLoading(true));
    resolve();
  });
};
export const setLoadingFalseAsync = (dispatch: Dispatch) => {
  return new Promise<void>((resolve) => {
    dispatch(setLoading(false));
    resolve();
  });
};
