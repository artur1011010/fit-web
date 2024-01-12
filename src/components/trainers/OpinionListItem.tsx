import * as React from "react";
import {
    Container, Divider, Rating, Typography
} from "@mui/material";
import {editDate2, isBlank} from "../../commons/Commons";

export default function OpinionListItem(prop: {
                                            userName: string,
                                            rating: number,
                                            content?: string,
                                            addedDate: Date
                                        }
) {

    return (
        <Container sx={{width: '90%', textAlign: 'left', mb:2}}>
            <Typography variant='h6' align='left'>{prop.userName} - {editDate2(prop.addedDate)}</Typography>
            <Rating
                name="simple-controlled"
                precision={0.5}
                value={prop.rating}
                readOnly
            />
            {!isBlank(prop.content) ? <Typography>{prop.content}</Typography> : null}
            <Divider sx={{mb: 2}}/>
        </Container>
    );
}