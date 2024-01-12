import {Button, Rating, TextField} from "@mui/material";
import * as React from "react";
import {useState} from "react";
import {STRING_EMPTY} from "../../commons/StaticText";
import {OpinionDto} from "../../dto/OpinionDto";

export const RatingForm = (prop: {
    handleOpinionFunc(value: OpinionDto): void
}) => {
    const [value, setValue] = React.useState<number | null>(0);
    const [opinion, setOpinion] = useState(STRING_EMPTY);

    const handleChangeOpinion = (event: any) => {
        setOpinion(event.target.value)
    }

    const dispatchOpinion = () => {
        prop.handleOpinionFunc({content: opinion, rating: value})
    }

    return (
        <>
            <Rating
                name="simple-controlled"
                precision={0.5}
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
            />
            <TextField multiline rows={4} InputLabelProps={{shrink: true}}
                       sx={{width: '100%'}}
                       value={opinion}
                       id='field' type='text' margin="none"
                       onChange={handleChangeOpinion}
                       inputProps={{maxLength: 8000}}
            ></TextField>
            <Button onClick={() => dispatchOpinion()} variant="contained" sx={{mt: 1}}>Wyślij
                opinie</Button>
        </>
    );
};
