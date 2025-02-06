// import React from 'react';
// import logo from './logo.svg';
// import './App.css';
//
// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.tsx</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }
//
// export default App;


// src/App.tsx
import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home.tsx';
import About from './pages/About.tsx';

const App: React.FC = () => {
  return (
      <div>
        {/* Navigation */}
        <nav>
          <ul>
            <li>
              <Link to="/">Accueil</Link>
            </li>
            <li>
              <Link to="/about">À propos</Link>
            </li>
          </ul>
        </nav>

        {/* Définition des routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>

      {/*  FOOTER  */}
      </div>
  );
};

export default App;
