import React, { useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import DescriptionIcon from '@mui/icons-material/Description';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';

import Chatbot from './../components/Chatbot/Chatbot';
import Documentation from '../components/Documentation/Documentation';
import logo from './../pages/logo.png'
const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: `-${drawerWidth}px`,
        ...(open && {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        }),
    }),
);

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));


const Home = () => {
    const [defaultSTT, setDefaultSST] = useState(false);
    const [autoSpeak, setAutoSpeak] = useState(true);
    const [webhookID, setWebhookID] = useState('55ff6231-6a17-4852-bdc9-040c7b9a524f');
    const [session, setSession] = useState('54580896')
    const [open, setOpen] = useState(false);
    const [mainWindowIndex, setMainWindowIndex] = useState(0);

    const handleMainWindowIndex = (index) => {
        setMainWindowIndex(index);
    }

    const handleDefaultSTT = (event) => {
        setDefaultSST(event.target.value === 'true' ? true : false);
    };

    const handleAutoSpeak = (event) => {
        setAutoSpeak(event.target.value === 'true' ? true : false);
    }

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };
    const theme = useTheme();


    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" open={open}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{ mr: 2, ...(open && { display: 'none' }) }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        Chek-bot: An intelligent chatbot that makes your life easier!
                    </Typography>
                    <img src={logo} alt="Logo" style={{ height: '50px', display: 'flex', justifyContent: 'flex-end', marginLeft: 'auto' }} />
                </Toolbar>
            </AppBar>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    {['Demo Page', 'Use cases'].map((text, index) => (
                        <ListItem key={text} disablePadding>
                            <ListItemButton onClick={() => { handleMainWindowIndex(index) }}>
                                <ListItemIcon>
                                    {index === 0
                                        ? <PlayCircleIcon />
                                        : index === 1
                                            ? <DescriptionIcon />
                                            : <MailIcon />}
                                </ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                <Divider />
                <List style={{ marginLeft: '1rem' }}>
                    <ListItem key='1' disablePadding>
                        <FormControl>
                            <FormLabel id="demo-controlled-radio-buttons-group">Auto-fill speech to text</FormLabel>
                            <RadioGroup
                                aria-labelledby="demo-controlled-radio-buttons-group"
                                name="controlled-radio-buttons-group"
                                value={defaultSTT}
                                onChange={handleDefaultSTT}
                            >
                                <FormControlLabel value={true} control={<Radio />} label="Enable" />
                                <FormControlLabel value={false} control={<Radio />} label="Disable" />
                            </RadioGroup>
                        </FormControl>
                    </ListItem>
                    <ListItem key='2' disablePadding>
                        <FormControl>
                            <FormLabel id="demo-controlled-radio-buttons-group">Auto-speak result</FormLabel>
                            <RadioGroup
                                aria-labelledby="demo-controlled-radio-buttons-group"
                                name="controlled-radio-buttons-group"
                                value={autoSpeak}
                                onChange={handleAutoSpeak}
                            >
                                <FormControlLabel value={true} control={<Radio />} label="Enable" />
                                <FormControlLabel value={false} control={<Radio />} label="Disable" />
                            </RadioGroup>
                        </FormControl>
                    </ListItem>
                </List>
                <Divider />
                <List style={{ marginLeft: '0.6rem' }}>
                    <ListItem key='1' disablePadding>
                        <TextField
                            required
                            id="filled-required"
                            label="Webhook ID"
                            value={webhookID}
                            variant="filled"
                            onChange={(e) => { setWebhookID(e.target.value) }}
                        />
                    </ListItem>
                    <ListItem key='2' disablePadding>
                        <TextField
                            required
                            id="filled-required"
                            label="Session ID"
                            value={session}
                            variant="filled"
                            onChange={(e) => { setSession(e.target.value) }}
                        />
                    </ListItem>
                </List>
            </Drawer>
            <Main open={open}>
                <DrawerHeader />
                {
                    mainWindowIndex === 0
                        ? <Chatbot
                            defaultSTT={defaultSTT}
                            autoSpeak={autoSpeak}
                            session={session}
                            webhookID={webhookID}
                        />
                        : <Documentation />
                }
            </Main>
        </Box >
    );
};

export default Home;