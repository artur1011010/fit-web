import * as React from "react";
import ResponsiveAppBar from "./components/nav/ResponsiveAppBar";
import {Outlet} from "react-router-dom";
import backgroundImg from "./components/main/main-background.jpg";

const mainClass = {
    height: '100%',
    minHeight: 'calc(100vh - 69px)',
    backgroundImage: `url(${backgroundImg})`,
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed',
}

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