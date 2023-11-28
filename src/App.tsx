import React from 'react';
import './App.css';
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import {Provider} from 'react-redux'
import store from './config/store'
import ResponsiveAppBar from "./components/nav/ResponsiveAppBar";
import {Main} from "./components/main/Main";
import {Profile} from "./components/user/profile/Profile";
import {Account} from "./components/user/account/Account";
import {Panel} from "./components/user/panel/Panel";
import {Blog} from "./components/blog/Blog";
import {ErrorPage} from "./components/error/ErrorPage";
import {Trainings} from "./components/trainers/Training";
import {Trainers} from "./components/trainers/Trainers";
import {Search} from "./components/Search";
import {Login} from "./components/user/account/Login";
import {Register} from "./components/user/account/Register";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main/>,
        errorElement: <ErrorPage/>,
    },
    {
        path: "profile",
        element: <Profile/>,
        errorElement: <ErrorPage/>,
    },
    {
        path: "account",
        element: <Account/>,
        errorElement: <ErrorPage/>,
    },
    {
        path: "panel",
        element: <Panel/>,
        errorElement: <ErrorPage/>,
    },
    {
        path: "changelist",
        element: <Blog/>,
        errorElement: <ErrorPage/>,
    },
    {
        path: "trainings",
        element: <Trainings/>,
        errorElement: <ErrorPage/>,
    },
    {
        path: "trainers",
        element: <Trainers/>,
        errorElement: <ErrorPage/>,
    },
    {
        path: "logout",
        element: <Blog/>,
        errorElement: <ErrorPage/>,
    },
    {
        path: "search",
        element: <Search/>,
        errorElement: <ErrorPage/>,
    },
    {
        path: "login",
        element: <Login/>,
        errorElement: <ErrorPage/>,
    },
    {
        path: "register",
        element: <Register/>,
        errorElement: <ErrorPage/>,
    },
]);

store.dispatch({
    type: "SET_USER",
    payload: {},
});

store.dispatch({
    type: "SET_AUTH",
    payload: {isLogged : false},
})

function App() {
    return (
        <div className="App">
            <Provider store={store}>
                <ResponsiveAppBar></ResponsiveAppBar>
                <React.StrictMode>
                    <RouterProvider router={router}/>
                </React.StrictMode>
            </Provider>
        </div>
    );
}

export default App;
