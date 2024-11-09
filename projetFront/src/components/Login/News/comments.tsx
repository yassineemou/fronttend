// src/components/Comments.tsx
import React, { useState, useEffect } from 'react';
import { getComments, addComment } from '../services/api';

interface CommentProps {
    newsId: string;
}

const Comments: React.FC<CommentProps> = ({ newsId }) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');

    useEffect(() => {
        const fetchComments = async () => {
            const response = await getComments(newsId);
            setComments(response.data);
        };
        fetchComments();
    }, [newsId]);

    const handleAddComment = async () => {
        if (!newComment) return;
        try {
            await addComment(newsId, { content: newComment });
            setNewComment('');
            // Refresh comments after adding a new one
            const response = await getComments(newsId);
            setComments(response.data);
        } catch (error) {
            console.error('Erreur lors de l\'ajout du commentaire', error);
        }
    };

    return (
        <div>
            <h3>Commentaires</h3>
            <ul>
                {comments.map((comment) => (
                    <li key={comment.id}>{comment.content}</li>
                ))}
            </ul>
            <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Ajouter un commentaire"
            />
            <button onClick={handleAddComment}>Ajouter</button>
        </div>
    );
};

export default Comments;
