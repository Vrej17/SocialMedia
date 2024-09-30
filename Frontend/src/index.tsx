import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import "./tailwind.css";
import { configureStore } from "@reduxjs/toolkit";
import { Reducers } from "./Slices/Slices";
import { Provider } from "react-redux";
import AuthForm from "./components/AuthForm/AuthForm";
import { setLoadingAsync } from "./HelperFunctions";
import { Posts } from "./components/Posts/Posts";
import Profile from "./components/Profile/Profile";
import UserProfile from "./components/UserProfile";
export const url = "https://jsonplaceholder.typicode.com/";

export const store = configureStore({
  reducer: { ...Reducers },
  devTools: true,
  
});
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    loader: () => {
      store.dispatch(setLoadingAsync);

      return null;
    },
    children: [
      {
        path: "/auth",
        element: <AuthForm />,
        loader: () => {
          store.dispatch(setLoadingAsync);
          return null;
        },
      },
      {
        path: "/users/:userId",
        element: <UserProfile />,
      },
      
      {
        path: "/posts",
        element: <Posts />,
        loader: () => {
          setLoadingAsync(store.dispatch);
          return null;
        },
      },
      {
        path: "/account",
        element: <Profile />,
      },
    ],
  },
]);

root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
