import React from 'react';
import './App.css';
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import ResponsiveAppBar from "./components/nav/ResponsiveAppBar";
import {Main} from "./components/main/Main";
import {Profile} from "./components/user/profile/Profile";
import {ErrorPage} from "./components/error/ErrorPage";
import {Trainings} from "./components/trainings/Training";
import {Trainers} from "./components/trainers/Trainers";
import {Login} from "./components/user/account/Login";
import {Register} from "./components/user/account/Register";
import {Logout} from "./components/user/account/Logout";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers';


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
        element: <Logout/>,
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

function App() {
    return (
        <div className="App">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
            <ResponsiveAppBar></ResponsiveAppBar>
                <React.StrictMode>
                    <RouterProvider router={router}/>
                </React.StrictMode>
            </LocalizationProvider>
        </div>
    );
}

export default App;
