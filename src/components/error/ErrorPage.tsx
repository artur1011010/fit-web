import {useRouteError} from "react-router-dom";
import {Image} from "@mui/icons-material";
import img from "./error.gif"


export function ErrorPage() {
    const error: unknown = useRouteError();
    console.error(error);

    return (
        <div id="error-page">
            <h1>Oops!</h1>
            <p>Mamy problem :(</p>
            <img src={img} alt="error"></img>
        </div>
    );
}