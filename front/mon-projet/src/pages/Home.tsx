// src/pages/Home.tsx
import React from 'react';

const Home: React.FC = () => {

    const [count, setCount] = React.useState(0);

    return (
        <div>
            <h1 onClick={() => setCount(count + 1)}>Accueil</h1>
            <p>Vous avez cliqué {count} fois</p>
        </div>
    );
};

export default Home;
