import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import {Button, FormControl, FormLabel, InputLabel, MenuItem, TextField, Select} from "@mui/material";
import Container from "@mui/material/Container";
import {UserDto, getEmptyUserDto} from "../../../dto/UserDto";
import Typography from "@mui/material/Typography";
import DataList from "../panel/DataList";

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
    const [formData, setFormData] = React.useState(getEmptyUserDto());

    let valueRef: string = '';

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const handleSubmit = () => {
        console.log('submit ' + valueRef);
    }

    const handleTextInputChange = (event: any) => {
        let va1ue = event.target.value;
        let field = event.target.id;

        switch (field) {
            case 'date-field':
                console.log('date-field: ' + va1ue)
                break;
            case 'user-name-field':
                console.log('user-name-field: ' + va1ue)
                break;
            case 'email-field':
                console.log('email-field: ' + va1ue)
                break;
            case 'phone-field':
                console.log('phone-field: ' + va1ue)
                break;
            case 'password-field':
                console.log('password-field: ' + va1ue)
                break;
        }
    }

    const handleSelectInputChange = (event: any) => {
        console.log('event.target.value: ' + event.target.value)
        console.log('event.target: ' + event.target.id)
    }

    return (
        <Box sx={{width: '100%'}}>
            <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                <Tabs value={value} onChange={handleChange} aria-label="user panel">
                    <Tab label="Dane użytkownika - form" {...a11yProps(0)} />
                    <Tab label="Profil Klienta" {...a11yProps(1)} />
                    <Tab label="Profil Trenera" {...a11yProps(2)} />
                    <Tab label="Dane użytkownika - view" {...a11yProps(3)} />
                </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
                <p>Dane użytkownika:</p>
                <FormControl sx={{width: '100%', p: 2}}>
                    <FormLabel htmlFor='user-name-field'>Nazwa użytkownika</FormLabel>
                    <TextField id='user-name-field' type='text' margin="normal"
                               onChange={handleTextInputChange}></TextField>

                    <FormLabel htmlFor='email-field'>Adres email</FormLabel>
                    <TextField id='email-field' type='email' margin="normal"
                               onChange={handleTextInputChange}></TextField>

                    <FormLabel htmlFor='phone-field'>Numer telefonu</FormLabel>
                    <TextField id='phone-field' type='text' margin="normal"
                               onChange={handleTextInputChange}></TextField>

                    <FormLabel id='gender-label' htmlFor='gender-select'>Płeć</FormLabel>
                    <Select
                        labelId="gender-label"
                        id="gender-select"
                        label="gender-label"
                        variant='outlined'
                        defaultValue={'M'}
                        onChange={handleSelectInputChange}
                    >
                        <MenuItem value={'M'}>Mężczyzna</MenuItem>
                        <MenuItem value={'F'}>Kobieta</MenuItem>
                    </Select>

                    <FormLabel htmlFor='date-field'>Data urodzenia</FormLabel>
                    <TextField id='date-field' type='date' margin="normal"
                               onChange={handleTextInputChange}></TextField>

                    <FormLabel htmlFor='password-field'>Hasło</FormLabel>
                    <TextField id='password-field' type='password' margin="normal"
                               onChange={handleTextInputChange}></TextField>

                    <Button onClick={() => handleSubmit()} variant="contained">Submit</Button>
                </FormControl>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                Profil Klienta
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
                Profil Trenera
            </CustomTabPanel>
            <CustomTabPanel value={value} index={3}>
                <DataList></DataList>
            </CustomTabPanel>
        </Box>
    );
}