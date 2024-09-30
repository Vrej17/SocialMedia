import { setLoading } from "./Slices/Slices";
import { Dispatch } from "redux";

// export const fetchUsersWithLoader = async (dispatch: Dispatch) => {
//   setLoadingTrueAsync(dispatch);
//   const response = await fetch("https://jsonplaceholder.typicode.com/users");
//   const data = await response.json();

//   dispatch(addUser({ users: data }));
//   setLoadingFalseAsync(dispatch);
// };
// export const getPost = async (dispatch: Dispatch) => {
//   const fet = await fetch("https://jsonplaceholder.typicode.com/posts");
//   const re = await fet.json();
//   dispatch(addPost({ posts: re }));
// };
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
export const setLoadingAsync = (dispatch: Dispatch) => {
  dispatch(setLoading(true));
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      dispatch(setLoading(false));
      resolve();
    }, 500);
  });
};
