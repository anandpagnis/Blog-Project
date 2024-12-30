import * as React from 'react';
import {
    Container,
    Typography,
    Box,
    Switch,
    FormControlLabel,
    Divider
} from '@mui/material';

export default function SettingsPage() {
    const [darkMode, setDarkMode] = React.useState(false);
    const [notifications, setNotifications] = React.useState(true);

    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            <Typography variant="h4" gutterBottom>
                Settings
            </Typography>

            <Box sx={{ mb: 3 }}>
                <Typography variant="h6" sx={{ mb: 2 }}>
                    Appearance
                </Typography>
                <FormControlLabel
                    control={
                        <Switch
                            checked={darkMode}
                            onChange={(e) => setDarkMode(e.target.checked)}
                        />
                    }
                    label="Dark Mode"
                />
            </Box>

            <Divider sx={{ my: 2 }} />

            <Box sx={{ mb: 3 }}>
                <Typography variant="h6" sx={{ mb: 2 }}>
                    Notifications
                </Typography>
                <FormControlLabel
                    control={
                        <Switch
                            checked={notifications}
                            onChange={(e) => setNotifications(e.target.checked)}
                        />
                    }
                    label="Enable Notifications"
                />
            </Box>
        </Container>
    );
}