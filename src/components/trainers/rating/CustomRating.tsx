import React from "react";
import {Rating} from "@mui/material";

export function CustomRating(prop: {
    rating?: number,
    userVoted?: boolean,
    setFunction?: Function
}) {

    const [value, setValue] = React.useState<number | null>(2.49);

    return (
        <>
            <Rating
                name="simple-controlled"
                precision={0.5}
                value={value}
                readOnly
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
            />
        </>
    );
}