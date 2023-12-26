import {useEffect, useRef, useState} from "react";
import ListItem from "@mui/material/ListItem";
import {Button, MenuItem, Select, TextField} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import * as React from "react";


export default function CustomSelectField(prop: {
    label: string,
    value?: string,
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
                    <Select
                        labelId="gender-label"
                        id="gender-select"
                        variant='outlined'
                        defaultValue={'BEGINNER'}
                        sx={style}
                        inputRef={fieldRef}
                    >
                        <MenuItem value={'BEGINNER'}>BEGINNER</MenuItem>
                        <MenuItem value={'NOVICE'}>NOVICE</MenuItem>
                        <MenuItem value={'INTERMEDIATE'}>INTERMEDIATE</MenuItem>
                        <MenuItem value={'ADVANCED'}>ADVANCED</MenuItem>
                        <MenuItem value={'ELITE'}>ELITE</MenuItem>
                    </Select>
                    <Button onClick={() => handleSubmit()}>
                        <CheckIcon></CheckIcon>
                    </Button>
                </>
            );
        } else {
            return (
                <>
                    <TextField sx={style} InputLabelProps={{shrink: true}}
                               disabled={true} value={prop.value}
                               label={prop.label} id='field' type='text' margin="none"
                               onChange={handleInputChange}
                    ></TextField>
                    <Button onClick={() => handleEdit()}>
                        <ModeEditIcon></ModeEditIcon>
                    </Button>
                </>
            );
        }
    }
    return render();
}