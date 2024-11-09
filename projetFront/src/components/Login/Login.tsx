import React, { useState } from 'react';
import { TextField, Button, Typography, Container, CircularProgress, Box } from '@mui/material';
import axios from 'axios';

interface LoginProps {
    onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        
        // Validation du formulaire
        if (!login || !password) {
            setError('Veuillez remplir tous les champs.');
            setLoading(false);
            return;
        }

        try {
            const response = await axios.post('http://127.0.0.1:5000/api/users/login', { login, password });
            const token = response.data.token;
            localStorage.setItem('token', token);
            onLogin();
        } catch (err) {
            if (axios.isAxiosError(err) && err.response) {
                setError(err.response.data.message || 'Login ou mot de passe incorrect.');
            } else {
                setError('Une erreur est survenue.');
            }
        } finally {
            setLoading(false); // Réinitialiser l'état de chargement
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                backgroundColor: '#e0f7fa', // Couleur d'arrière-plan de la page
            }}
        >
            <Container maxWidth="xs" sx={{ backgroundColor: '#ffffff', padding: 3, borderRadius: 2, boxShadow: 3 }}>
                <Typography variant="h4" gutterBottom align="center" sx={{ color: '#00796b' }}>
                    Application de News
                </Typography>
                <form onSubmit={handleLogin}>
                    <TextField
                        fullWidth
                        label="Nom d'utilisateur"
                        variant="outlined"
                        margin="normal"
                        value={login}
                        onChange={(e) => setLogin(e.target.value)}
                        error={!!error}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': { borderColor: '#00796b' },
                                '&:hover fieldset': { borderColor: '#004d40' },
                                '&.Mui-focused fieldset': { borderColor: '#004d40' },
                            },
                        }}
                    />
                    <TextField
                        fullWidth
                        label="Mot de passe"
                        type="password"
                        variant="outlined"
                        margin="normal"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        error={!!error}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': { borderColor: '#00796b' },
                                '&:hover fieldset': { borderColor: '#004d40' },
                                '&.Mui-focused fieldset': { borderColor: '#004d40' },
                            },
                        }}
                    />
                    {error && (
                        <Typography color="error" variant="body2" align="center">
                            {error}
                        </Typography>
                    )}
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        style={{ marginTop: '1rem', backgroundColor: '#00796b', color: '#ffffff' }}
                        disabled={loading}
                    >
                        {loading ? <CircularProgress size={24} sx={{ color: '#ffffff' }} /> : 'Se connecter'}
                    </Button>
                </form>
            </Container>
        </Box>
    );
};

export default Login;