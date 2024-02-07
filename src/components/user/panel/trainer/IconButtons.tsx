import {Button} from "@mui/material";
import {PhotoCamera} from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";

export default function IconButtons() {
    return (
        <IconButton color="primary" aria-label="upload picture" component="span">
            <PhotoCamera />
        </IconButton>
    );
}