// src/App.tsx
import React, { useState } from 'react';
import Login from './components/Login/Login';
import Register from './components/Login/register';
import NewsList from './components/Login/News/NewList';
import AddNews from './components/Login/News/AddNews';


const App: React.FC = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
    const [showRegister, setShowRegister] = useState(false);

    const handleLogin = () => {
        setIsAuthenticated(true);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
    };

    const toggleAuthMode = () => {
        setShowRegister(!showRegister);
    };

    return (
        <div>
            <header>
                <h1>Application de News</h1>
                {isAuthenticated && <button onClick={handleLogout}>Déconnexion</button>}
            </header>
            <main>
                {isAuthenticated ? (
                    <>
                        <AddNews />
                        <NewsList />
                    </>
                ) : (
                    showRegister ? (
                        <Register onRegister={handleLogin} />
                    ) : (
                        <Login onLogin={handleLogin} />
                    )
                )}
                {!isAuthenticated && (
                    <button onClick={toggleAuthMode}>
                        {showRegister ? "Déjà inscrit ? Connectez-vous" : "Pas encore de compte ? Inscrivez-vous"}
                    </button>
                )}
            </main>
        </div>
    );
};

export default App;
