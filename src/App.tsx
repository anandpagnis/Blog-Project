import * as React from 'react';
import {BrowserRouter as Router, Routes, Route, Navigate, useNavigate} from 'react-router-dom';
import {AppProvider, type Navigation} from '@toolpad/core/AppProvider';
import {DashboardLayout, ThemeSwitcher, type SidebarFooterProps,} from '@toolpad/core/DashboardLayout';
import { createTheme } from '@mui/material/styles';
import {IconButton, Stack, TextField, Tooltip, Typography} from '@mui/material';


// Icons
import HomeIcon from '@mui/icons-material/Home';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import SearchIcon from '@mui/icons-material/Search';
import ModeIcon from '@mui/icons-material/Mode';
import WebIcon from '@mui/icons-material/Web';
import Blogicon from './assets/blogicon.svg';

// Import page components
import Posts from "./PostDisp.tsx";
import YourLetters from "./YourLetters.tsx";
import { Link } from 'react-router-dom';
import AccountMenu from "./Components/Profile.tsx";
import CreatePost from "./CreatePost.tsx";
import AccountPage from "./AccountPage.tsx";
import Explore from "./Explore.tsx";

const NAVIGATION: Navigation = [
    {
        kind: 'page',
        segment: 'home',
        title: 'Home',
        icon: <Link to="/"><HomeIcon /></Link>,
    },
    {
        kind: 'page',
        segment: 'explore',
        title: 'Explore',
        icon: <Link to="/Explore"><TravelExploreIcon /></Link>,
    },
    {
        kind: 'page',
        segment: 'YourLetters',
        title: 'Your Letters',
        icon: <WebIcon />,
    },
];

const demoTheme = createTheme({
    cssVariables: {
        colorSchemeSelector: 'data-toolpad-color-scheme',
    },
    colorSchemes: { light: true, dark: true },
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 600,
            lg: 1200,
            xl: 1536,
        },
    },
});

function ToolbarActionsSearch() {
    const navigate = useNavigate(); // Get the navigation function

    const handleClick = () => {
        navigate('/CreatePost'); // Navigate to the CreatePost page
    };
    return (
        <Stack direction="row" alignItems="center" justifyContent="center">
            <Tooltip title="Search" enterDelay={1000}>
                <div>
                    <IconButton
                        type="button"
                        aria-label="search"
                        sx={{
                            display: {xs: 'inline', md: 'none'},
                        }}
                    >
                        <SearchIcon/>
                    </IconButton>
                </div>
            </Tooltip>
            <TextField
                label="Search"
                variant="outlined"
                size="small"
                slotProps={{
                    input: {
                        endAdornment: (
                            <IconButton type="button" aria-label="search" size="small">
                                <SearchIcon/>
                            </IconButton>
                        ),
                        sx: {pr: 0.5},
                    },
                }}
                sx={{
                    display: {xs: 'none', md: 'inline-block'},
                    mr: 1,
                    flexGrow: 1
                }}
            />

            <button onClick={handleClick}
                style={{
                    padding: '8px',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    fontWeight: '900',
                    backgroundColor: 'var(--palette-primary-main)',
                    color: 'var(--palette-primary-contrastText)',
                }}
            >
                <ModeIcon/>
                <span>Create</span>
            </button>


            <AccountMenu/>

        </Stack>
    );
}

function SidebarFooter({mini}: SidebarFooterProps) {
    return (
        <Typography
            variant="caption"
            sx={{m: 1, whiteSpace: 'nowrap', overflow: 'hidden'}}
        >
            <ThemeSwitcher/>
        </Typography>
    );
}

function CustomAppTitle() {
    return (
        <Stack direction="row" alignItems="center" spacing={2}>
            <Typography variant="h6">Blog App</Typography>
        </Stack>
    );
}

export default function App() {
    return (
        <Router>
            <AppProvider
                navigation={NAVIGATION}
                theme={demoTheme}
            >
                <DashboardLayout
                    sidebarExpandedWidth="200px"
                    slots={{
                        appTitle: CustomAppTitle,
                        toolbarActions: ToolbarActionsSearch,
                        sidebarFooter: SidebarFooter,
                    }}
                >
                    <Routes>
                        <Route path="/" element={<Posts />} />
                        <Route path="/YourLetters" element={<YourLetters/>} />
                        <Route path="/CreatePost" element={<CreatePost />} />
                        <Route path="/Account" element={<AccountPage />} />
                        <Route path="/Explore" element={<Explore/>}/>
                        <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                </DashboardLayout>
            </AppProvider>
        </Router>
    );
}