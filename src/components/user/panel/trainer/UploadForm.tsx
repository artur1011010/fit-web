import {Button, LinearProgress, LinearProgressProps, TextField, Typography} from "@mui/material";
import axios from "axios";
import {useState} from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CloudOffIcon from '@mui/icons-material/CloudOff';
import Box from "@mui/material/Box";
import * as React from "react";
import {ACTIONS, storeAuth} from "../../../../config/storage";

function LinearProgressWithLabel(props: LinearProgressProps & { value: number }) {
    return (
        <Box sx={{display: 'flex', alignItems: 'center'}}>
            <Box sx={{width: '100%', mr: 1}}>
                <LinearProgress variant="determinate" {...props} />
            </Box>
            <Box sx={{minWidth: 35}}>
                <Typography variant="body2" color="text.secondary">{`${Math.round(
                    props.value,
                )}%`}</Typography>
            </Box>
        </Box>
    );
}

export default function UploadForm() {

    const UPLOAD_URL = `${process.env.REACT_APP_USER_URL}/user/upload`

    const [uploadProgress, setUploadProgress] = useState(0);
    const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
    const [progressBarVisible, setProgressBarVisible] = useState(false);

    const handleFileChange = (event: any) => {
        const file = event.target.files[0];
        // @ts-ignore
        console.log("selectedFile?.size " + file?.size)
        // @ts-ignore
        if (file?.size > 1240000) {
            clearFile();
        } else {
            setSelectedFile(file)
        }
    }

    const clearFile = () => {
        setSelectedFile(null);
    }

    const handleFileUpload = (event: any) => {
        const formData = new FormData();
        const auth = storeAuth(ACTIONS.GET, null);

        if (selectedFile !== null) {
            formData.append('file', selectedFile);
            axios.post(UPLOAD_URL, formData, {
                onUploadProgress: (progressEvent) => {
                    // @ts-ignore
                    const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    setUploadProgress(percentCompleted);
                    setProgressBarVisible(true)
                },
                headers: {
                    Authorization: `Bearer ${auth.access_token}`
                },
            })
                .then(response => {
                    console.log(response);
                    setProgressBarVisible(false)
                })
                .catch(error => {
                    console.error(error);
                    setProgressBarVisible(false)
                    // handle error here
                });
        }
    };

    const fileData = () => {
        if (selectedFile) {
            // @ts-ignore
            return (
                <Box>
                    <Typography variant='h5'>Szgczegóły przesyłanego pliku</Typography>
                    <p>
                        File Name:{" "}
                        {selectedFile?.name || ""}
                    </p>
                    <p>
                        File Type:{" "}
                        {selectedFile?.type || ""}
                    </p>
                    <p>
                        Last Modified:{" "}
                        {selectedFile?.lastModified.toString() || ""}
                    </p>
                </Box>
            );
        } else {
            return (
                <Box>
                    <br/>
                    <Typography variant='h5'>
                        Wybierz plik przed wysłaniem
                    </Typography>
                </Box>
            );
        }
    };

    return (
        <Box>
            <TextField
                type="file"
                onChange={handleFileChange}
            />
            <Button
                onClick={handleFileUpload}
                variant="contained"
                color="primary"
                startIcon={<CloudUploadIcon/>}
                sx={{mt: 1, ml: 2}}
            >
                Prześlij plik
            </Button>
            <Button
                onClick={clearFile}
                variant="contained"
                color="primary"
                startIcon={<CloudOffIcon/>}
                sx={{mt: 1, ml: 2}}
            >
                Wyczyść
            </Button>
            {fileData()}
            {progressBarVisible ? <LinearProgressWithLabel value={uploadProgress}/> : null}
        </Box>
    );
}