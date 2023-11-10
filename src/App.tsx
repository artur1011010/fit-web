import React from 'react';
import './App.css';
import ResponsiveAppBar from "./components/nav/ResponsiveAppBar";

import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import {Main} from "./components/main/Main";
import {Profile} from "./components/user/profile/Profile";
import {Account} from "./components/user/account/Account";
import {Panel} from "./components/user/panel/Panel";
import {Blog} from "./components/blog/Blog";
import {ErrorPage} from "./components/error/ErrorPage";
import {Trainings} from "./components/trainers/Training";
import {Trainers} from "./components/trainers/Trainers";
import {Search} from "./components/Search";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
        errorElement: <ErrorPage />,
    },
    {
        path: "profile",
        element: <Profile />,
        errorElement: <ErrorPage />,
    },
    {
        path: "account",
        element: <Account />,
        errorElement: <ErrorPage />,
    },
    {
        path: "panel",
        element: <Panel />,
        errorElement: <ErrorPage />,
    },
    {
        path: "blog",
        element: <Blog />,
        errorElement: <ErrorPage />,
    },
    {
        path: "trainings",
        element: <Trainings />,
        errorElement: <ErrorPage />,
    },
    {
        path: "trainers",
        element: <Trainers />,
        errorElement: <ErrorPage />,
    },
    {
        path: "logout",
        element: <Blog />,
        errorElement: <ErrorPage />,
    },
    {
        path: "search",
        element: <Search />,
        errorElement: <ErrorPage />,
    },
]);

function App() {
    return (
        <div className="App">
            <ResponsiveAppBar></ResponsiveAppBar>
            <React.StrictMode>
                <RouterProvider router={router}/>
            </React.StrictMode>
        </div>
    );
}

export default App;
