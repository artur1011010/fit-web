import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Container from "@mui/material/Container";
import {getEmptyUserDto} from "../../../dto/UserDto";
import UserDataProfileView from "../panel/UserDataProfileView";
import ClientDataProfileView from "../panel/ClientDataProfileView";
import TrainerDataProfileView from "../panel/TrainerDataProfileView";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function CustomTabPanel(props: TabPanelProps) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{p: 3}}>
                    <Container>{children}</Container>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function UserDataPanel() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box sx={{width: '100%'}}>
            <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                <Tabs value={value} onChange={handleChange} aria-label="user panel">
                    <Tab label="Dane użytkownika" {...a11yProps(0)} />
                    <Tab label="Profil Klienta" {...a11yProps(1)} />
                    <Tab label="Profil Trenera" {...a11yProps(2)} />
                </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
                <UserDataProfileView></UserDataProfileView>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                <ClientDataProfileView></ClientDataProfileView>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
                <TrainerDataProfileView></TrainerDataProfileView>
            </CustomTabPanel>
        </Box>
    );
}