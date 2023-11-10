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
import {Gender} from "./dto/Gender";

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
        path: "blog",
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
]);

store.dispatch({
    type: "SET_USER",
    payload: {
        id: 1,
        name: "John Doe",
        email: "john.doe@example.com",
        phoneNumber: "+15555555555",
        gender: Gender.M,
        dateOfBirth: new Date("1990-01-01"),
        trainer: null,
        client: null,
    },
});

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
