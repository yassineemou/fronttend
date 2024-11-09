// src/components/AddNews.tsx
import React, { useState } from 'react';
import axios from 'axios';
import {
    TextField,
    Button,
    Typography,
    Container,
    Box,
    CircularProgress,
    Snackbar,
    Alert
} from '@mui/material';
import { DateTime } from 'luxon';

interface News {
    url: string;
    titre: string;
    dateAjout: string;
}

const AddNews: React.FC = () => {
    const [news, setNews] = useState<News>({
        url: '',
        titre: '',
        dateAjout: ''
    });
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [alertOpen, setAlertOpen] = useState(false);
    const [isError, setIsError] = useState(false);

    // Handle input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNews({
            ...news,
            [name]: value
        });
    };

    // Validate date format (YYYY-MM-DD)
    const isValidDate = (dateString: string) => {
        return DateTime.fromFormat(dateString, 'yyyy-MM-dd').isValid;
    };

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Basic validation
        if (!news.url || !news.titre || !news.dateAjout) {
            setMessage("Veuillez remplir tous les champs.");
            setIsError(true);
            setAlertOpen(true);
            return;
        }

        if (!isValidDate(news.dateAjout)) {
            setMessage("Date invalide. Utilisez le format AAAA-MM-JJ.");
            setIsError(true);
            setAlertOpen(true);
            return;
        }

        setLoading(true); // Show loading spinner
        setIsError(false);

        try {
            const token = localStorage.getItem('token'); // Retrieve JWT token

            // Send request with token in headers
            await axios.post('/api/news', news, {
                headers: { Authorization: `Bearer ${token}` }
            });

            setMessage('News ajoutée avec succès !');
            setNews({ url: '', titre: '', dateAjout: '' }); // Reset form
            setIsError(false);
        } catch (error) {
            setMessage('Erreur lors de l’ajout de la news.');
            setIsError(true);
        } finally {
            setLoading(false); // Hide loading spinner
            setAlertOpen(true);
        }
    };

    const handleCloseAlert = () => {
        setAlertOpen(false);
    };

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                backgroundColor: '#f5f5f5'
            }}
        >
            <Container maxWidth="sm" sx={{ padding: 3, backgroundColor: '#fff', borderRadius: 2, boxShadow: 3 }}>
                <Typography variant="h4" align="center" sx={{ color: '#00796b', marginBottom: 2 }}>
                    Ajouter une News
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        label="URL"
                        name="url"
                        variant="outlined"
                        margin="normal"
                        value={news.url}
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        fullWidth
                        label="Titre"
                        name="titre"
                        variant="outlined"
                        margin="normal"
                        value={news.titre}
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        fullWidth
                        label="Date d'ajout (AAAA-MM-JJ)"
                        name="dateAjout"
                        variant="outlined"
                        margin="normal"
                        value={news.dateAjout}
                        onChange={handleChange}
                        required
                        helperText="Utilisez le format AAAA-MM-JJ"
                        error={!!news.dateAjout && !isValidDate(news.dateAjout)}
                    />
                    <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            disabled={loading}
                            sx={{ backgroundColor: '#00796b', color: '#ffffff' }}
                        >
                            {loading ? <CircularProgress size={24} sx={{ color: '#ffffff' }} /> : 'Ajouter'}
                        </Button>
                    </Box>
                </form>
            </Container>

            {/* Feedback message */}
            <Snackbar open={alertOpen} autoHideDuration={4000} onClose={handleCloseAlert}>
                <Alert onClose={handleCloseAlert} severity={isError ? 'error' : 'success'}>
                    {message}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default AddNews;
