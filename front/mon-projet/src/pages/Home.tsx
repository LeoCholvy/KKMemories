// src/pages/Home.tsx
import React from 'react';
import Citation, {CitationType} from "../components/Citation";

const Home: React.FC = () => {
    return (
        <div>
            <h1>Accueil</h1>
            <Citation type={CitationType.Bordered} />
            <h2>Autres citations :</h2>
            <Citation />
            <Citation color="RED" />
        </div>
    );
};

export default Home;
