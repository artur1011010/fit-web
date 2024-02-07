import {Button} from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

export default function UploadButton(prop: {
    onClick: Function
}) {
    return (
        <Button
            variant="contained"
            color="primary"
            startIcon={<CloudUploadIcon />}
        >
            Upload
        </Button>
    );
}