import * as React from "react";
import ResponsiveAppBar from "./components/nav/ResponsiveAppBar";
import {Outlet} from "react-router-dom";

export default function RootLayout() {
    return (
        <div>
            <header>
                <ResponsiveAppBar></ResponsiveAppBar>
            </header>
            <main>
                <Outlet/>
            </main>
        </div>
    );
}