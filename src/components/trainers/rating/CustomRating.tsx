import React from "react";
import {Rating} from "@mui/material";

export function CustomRating(prop: {
    rating: number,
}) {

    return (
        <>
            <Rating
                name="simple-controlled"
                precision={0.5}
                value={prop.rating}
                readOnly
            />
        </>
    );
}