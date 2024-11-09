// src/components/NewsList.tsx
import React, { useEffect, useState } from 'react';
import { getNews } from '../services/api';

const NewsList: React.FC = () => {
    const [newsList, setNewsList] = useState([]);

    useEffect(() => {
        const fetchNews = async () => {
            const response = await getNews();
            setNewsList(response.data);
        };
        fetchNews();
    }, []);

    return (
        <div>
            <h2>Liste des News</h2>
            <ul>
                {newsList.map((news) => (
                    <li key={news.id}>{news.title}</li>
                ))}
            </ul>
        </div>
    );
};

export default NewsList;
