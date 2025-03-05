// src/pages/Home.tsx
import React from 'react';
import Citation, {CitationType} from "../components/Citation";
import './Home.css';

const Home: React.FC = () => {
    return (
        <div className="quote-of-the-day">
            <h1>Citation du jour</h1>
            <Citation type={CitationType.Bordered} />
            <h2>Autres citations :</h2>
            <Citation />
            <Citation />
        </div>
    );
};

export default Home;
