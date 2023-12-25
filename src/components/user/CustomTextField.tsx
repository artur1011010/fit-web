import {useEffect, useRef, useState} from "react";
import ListItem from "@mui/material/ListItem";
import {Button, ListItemIcon, TextField} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import * as React from "react";


export default function CustomTextField(prop: {
    label: string,
    value: string | undefined,
    editable: boolean
    handleChange?: Function | null,
}) {
    const [editActive, setEditActive] = useState(false);
    const [value, setValue] = useState('');

    const handleEdit = () => {
        setEditActive(true)
    }

    const handleSubmit = () => {
        setEditActive(false)
        // @ts-ignore
        const val = fieldRef.current.value
        console.log(val)
        setValue(val)
        // @ts-ignore
        prop.handleChange(val)
    }
    const handleInputChange = (event: any) => {
        setValue(event.target.value)
    }

    const editableStyle = {
        width: '100%',
        marginRight: '63px'
    };

    const style = {
        width: '100%',
    };

    const fieldRef = useRef()
    const render = () => {
        if (editActive) {
            return (
                <>
                    <TextField sx={style} InputLabelProps={{shrink: true}} label={prop.label}
                               id='field' type='text' margin="none"
                               inputRef={fieldRef}>
                    </TextField>
                    <Button onClick={() => handleSubmit()}>
                        <CheckIcon></CheckIcon>
                    </Button>
                </>
            );
        } else {
            return (
                <>
                    <TextField sx={prop.editable ? style : editableStyle} InputLabelProps={{shrink: true}}
                               disabled={true} value={prop.value}
                               label={prop.label} id='field' type='text' margin="none"
                               onChange={handleInputChange}
                    ></TextField>
                    {prop.editable ? <Button onClick={() => handleEdit()}>
                        <ModeEditIcon></ModeEditIcon>
                    </Button> : null}
                </>
            );
        }
    }
    return render();
}