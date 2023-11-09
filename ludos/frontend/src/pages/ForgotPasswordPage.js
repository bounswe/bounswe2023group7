import { useState } from 'react';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Grid } from '@mui/material';
const defaultTheme = createTheme();

export default function ForgotPasswordPage() {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container spacing={2} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Username"
              variant="outlined"
              value={username}
              onChange={(e) => {
                setUsernameEmpty(false);
                setUsername(e.target.value);
              }}
              error={usernameEmpty}
              helperText={usernameEmpty ? "Username cannot be empty." : ""}
            />
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>

  );
}