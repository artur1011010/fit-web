import {useEffect, useRef, useState} from "react";
import ListItem from "@mui/material/ListItem";
import {Button, ListItemIcon, TextField, Tooltip} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import * as React from "react";


export default function CustomTextField(prop: {
    label: string,
    value: string | undefined,
    editable: boolean
    handleChange?: Function | null,
    multiline?: boolean
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

    const renderMultiline = () => {
        if (editActive) {
            return (
                <>
                    <TextField multiline rows={4} sx={style} InputLabelProps={{shrink: true}} label={prop.label}
                               id='field' type='text' margin="none"
                               inputRef={fieldRef} inputProps={{maxLength: 8000}}>
                    </TextField>
                    <Tooltip title="zatwierdź zmiany">
                        <Button onClick={() => handleSubmit()}>
                            <CheckIcon></CheckIcon>
                        </Button>
                    </Tooltip>
                </>
            );
        } else {
            return (
                <>
                    <TextField multiline rows={4} sx={prop.editable ? style : editableStyle}
                               InputLabelProps={{shrink: true}}
                               disabled={true} value={prop.value}
                               label={prop.label} id='field' type='text' margin="none"
                               onChange={handleInputChange}
                               inputProps={{maxLength: 8000}}
                    ></TextField>
                    {prop.editable ? <Tooltip title="edycja"><Button onClick={() => handleEdit()}>
                        <ModeEditIcon></ModeEditIcon>
                    </Button></Tooltip> : null}
                </>
            );
        }
    }

    const render = () => {
        if (prop.multiline) {
            return renderMultiline()
        }
        if (editActive) {
            return (
                <>
                    <TextField sx={style} InputLabelProps={{shrink: true}} label={prop.label}
                               id='field' type='text' margin="none"
                               inputRef={fieldRef}
                               inputProps={{maxLength: 255}}>
                    </TextField>
                    <Tooltip title="zatwiedź zmiany">
                        <Button onClick={() => handleSubmit()}>
                            <CheckIcon></CheckIcon>
                        </Button>
                    </Tooltip>
                </>
            );
        } else {
            return (
                <>
                    <TextField sx={prop.editable ? style : editableStyle} InputLabelProps={{shrink: true}}
                               disabled={true} value={prop.value}
                               label={prop.label} id='field' type='text' margin="none"
                               onChange={handleInputChange} inputProps={{maxLength: 255}}
                    ></TextField>
                    {prop.editable ?
                        <Tooltip title="edycja">
                            <Button onClick={() => handleEdit()}>
                                <ModeEditIcon></ModeEditIcon>
                            </Button></Tooltip> : null}
                </>
            );
        }
    }
    return render();
}