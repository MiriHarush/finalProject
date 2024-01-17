import React, { useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  Typography,
  Paper,
  Grid,
  TextField,
  Button,
  FormHelperText,
} from '@mui/material';
import { UserContext } from '../context/users.context';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [loading, setLoading] = useState(false);
  const { resetPassword } = useContext(UserContext);
  // const { token } = useParams();
  const urlParams = new URLSearchParams(window.location.search);
const token = urlParams.get('token');
  // const token = localStorage.getItem('userToken');
  console.log("token", token);
  const validatePassword = () => {
    if (password.length < 8 || !/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/[0-9]/.test(password)) {
      setPasswordError('Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, and one number');
      return false;
    }

    return true;
  };

  const validateConfirmPassword = () => {
    if (confirmPassword !== password) {
      setConfirmPasswordError('Passwords do not match');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isPasswordValid = validatePassword();
    const isConfirmPasswordValid = validateConfirmPassword();

    if (!isPasswordValid || !isConfirmPasswordValid) {
      return;
    }

    setLoading(true);

    try {
      const resetToken = token;
      const newPassword = password;
      console.log(resetToken);
      const response = await resetPassword({ resetToken, newPassword });

      if (response.success) {
        console.log('Password reset successful');
      } else {
        console.error('Password reset failed:', response.error.message);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} style={{ padding: 20, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h5" align="center" gutterBottom style={{ color: 'rgb(174, 124, 61)' }}>
          Reset Password
        </Typography>
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="New Password"
                type="password"
                fullWidth
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={Boolean(passwordError)}
                helperText={passwordError}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Confirm New Password"
                type="password"
                fullWidth
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                error={Boolean(confirmPasswordError)}
                helperText={confirmPasswordError}
                sx={{
                  '&:focus': {
                    borderColor: 'rgb(174, 124, 61)',
                  },
                  '& label.Mui-focused': {
                    color: 'rgb(174, 124, 61)',
                  },
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: 'rgb(174, 124, 61)',
                    },
                    '&:hover fieldset': {
                      borderColor: 'rgb(174, 124, 61)',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'rgb(174, 124, 61)',
                    },
                  },
                }}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            variant="contained"
            // color="primary"
            fullWidth
            style={{ marginTop: 20, backgroundColor: 'rgb(174, 124, 61)' }}
            disabled={loading}
          >
            {loading ? 'Resetting Password...' : 'Reset Password'}
          </Button>
          <FormHelperText style={{ marginTop: 10 }}>
            <a href="/login">Remember your password? Log in here</a>.
          </FormHelperText>
        </form>
      </Paper>
    </Container>
  );
};

export default ResetPassword;
