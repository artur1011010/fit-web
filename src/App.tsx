import React from 'react';
import './App.css';
import {
    createBrowserRouter, createRoutesFromElements, Route,
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
import RootLayout from "./RootLayout";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<RootLayout/>}>
            <Route path="/" element={<Main/>}></Route>
            <Route path="login" element={<Login/>}></Route>
            <Route path="register" element={<Register/>}></Route>
            <Route path="logout" element={<Logout/>}></Route>
            <Route path="profile" element={<Profile/>}></Route>
            <Route path="trainings" element={<Trainings/>}></Route>
            <Route path="logout" element={<Logout/>}></Route>
            <Route path="trainers" element={<Trainers/>}></Route>
        </Route>
    )
)

function App() {
    return (
        <div className="App">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <React.StrictMode>
                    <RouterProvider router={router}/>
                </React.StrictMode>
            </LocalizationProvider>
        </div>
    );
}

export default App;
