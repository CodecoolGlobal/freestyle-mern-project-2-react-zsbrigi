import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import './styles.css';
import reportWebVitals from "./reportWebVitals";
import UserProfile from "./userComponents/UserProfile";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import MaingPage from "./mainPage Components/MainPage.js";
import Dishes from "./components/Dishes.js";
import Fridge from "./components/Fridge.js";
import UserForm from "./components/UserForm.js";
import UserLogin from "./components/UserLogin.js";
import FavoritePage from "./components/FavoritesPage.js";

const router = createBrowserRouter([
  {
    path: "/user/recipes",
    element: <UserProfile />,
  },
  {
    path: "/",
    element: <MaingPage></MaingPage>,
  },
  {
    path: "/dishes/:dishType",
    element: <Dishes />,
  },
  {
    path: "/fridge",
    element: <Fridge />
  },
  {
    path: "/user/login",
    element: <UserLogin />
  },
  {
    path: "/user/registration",
    element: <UserForm />
  },
  {
    path: '/user/favorites',
    element: <FavoritePage></FavoritePage>
  }
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
