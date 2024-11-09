// src/services/api.ts
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/news'; // URL de base pour le back-end

// Appel pour ajouter une news
export const addNews = async (newsData: any) => {
    return axios.post(`${API_URL}/news`, newsData);
};

// Appel pour obtenir les news
export const getNews = async () => {
    return axios.get(`${API_URL}/news`);
};

// Appel pour ajouter un commentaire
export const addComment = async (newsId: string, commentData: any) => {
    return axios.post(`${API_URL}/news/${newsId}/comments`, commentData);
};

// Appel pour obtenir les commentaires
export const getComments = async (newsId: string) => {
    return axios.get(`${API_URL}/news/${newsId}/comments`);
};
