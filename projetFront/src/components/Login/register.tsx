import React, { useState } from 'react';
import { TextField, Button, Typography, Container, CircularProgress, Box } from '@mui/material';
import axios from 'axios';

interface RegisterProps {
    onRegister: () => void;
}

const Register: React.FC<RegisterProps> = ({ onRegister }) => {
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        
        if (!nom || !prenom || !login || !password) {
            setError('Veuillez remplir tous les champs.');
            setLoading(false);
            return;
        }

        try {
            const response = await axios.post('http://127.0.0.1:5000/api/users/register', {
                nom,
                prenom,
                login,
                password,
            });
            const token = response.data.token;
            localStorage.setItem('token', token);
            onRegister();
        } catch (err) {
            if (axios.isAxiosError(err) && err.response) {
                setError(err.response.data.error || 'Une erreur est survenue.');
            } else {
                setError('Erreur lors de l’inscription.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                backgroundColor: '#e3f2fd',
            }}
        >
            <Container maxWidth="xs" sx={{ backgroundColor: '#ffffff', padding: 3, borderRadius: 2, boxShadow: 3 }}>
                <Typography variant="h4" gutterBottom align="center" sx={{ color: '#1565c0' }}>
                    Créer un compte
                </Typography>
                <form onSubmit={handleRegister}>
                    <TextField
                        fullWidth
                        label="Nom"
                        variant="outlined"
                        margin="normal"
                        value={nom}
                        onChange={(e) => setNom(e.target.value)}
                        error={!!error}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': { borderColor: '#1565c0' },
                                '&:hover fieldset': { borderColor: '#0d47a1' },
                                '&.Mui-focused fieldset': { borderColor: '#0d47a1' },
                            },
                        }}
                    />
                    <TextField
                        fullWidth
                        label="Prénom"
                        variant="outlined"
                        margin="normal"
                        value={prenom}
                        onChange={(e) => setPrenom(e.target.value)}
                        error={!!error}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': { borderColor: '#1565c0' },
                                '&:hover fieldset': { borderColor: '#0d47a1' },
                                '&.Mui-focused fieldset': { borderColor: '#0d47a1' },
                            },
                        }}
                    />
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
                                '& fieldset': { borderColor: '#1565c0' },
                                '&:hover fieldset': { borderColor: '#0d47a1' },
                                '&.Mui-focused fieldset': { borderColor: '#0d47a1' },
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
                                '& fieldset': { borderColor: '#1565c0' },
                                '&:hover fieldset': { borderColor: '#0d47a1' },
                                '&.Mui-focused fieldset': { borderColor: '#0d47a1' },
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
                        fullWidth
                        style={{ marginTop: '1rem', backgroundColor: '#1565c0', color: '#ffffff' }}
                        disabled={loading}
                    >
                        {loading ? <CircularProgress size={24} sx={{ color: '#ffffff' }} /> : 'S’inscrire'}
                    </Button>
                </form>
            </Container>
        </Box>
    );
};

export default Register;
