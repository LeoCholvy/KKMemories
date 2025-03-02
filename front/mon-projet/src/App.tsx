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
import Home from './pages/Home';
import About from './pages/About';
import Edit from "./pages/Edit";

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
          <li>
            <Link to="/edit">Modifier</Link>
          </li>
        </ul>
      </nav>

      {/* Définition des routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/edit" element={<Edit />} />
      </Routes>

      {/*  FOOTER  */}
      <nav className="footer">
        <ul>
          <li><Link to="/"><svg version="1.0" xmlns="http://www.w3.org/2000/svg"
            width="50px" viewBox="0 0 512.000000 512.000000"
            preserveAspectRatio="xMidYMid meet">

            <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
              fill="#000000" stroke="none">
              <path d="M2488 4862 c-23 -10 -434 -408 -1087 -1051 -1084 -1068 -1081 -1064
           -1081 -1142 0 -63 51 -135 113 -158 16 -6 102 -11 198 -11 l169 0 0 -1059 c0
           -725 3 -1069 11 -1088 14 -38 57 -83 96 -99 43 -18 1030 -21 1084 -3 51 17 97
           55 119 99 19 38 20 60 20 625 0 640 0 644 56 665 17 7 159 10 390 8 333 -3
           365 -4 381 -21 17 -16 18 -59 23 -625 l5 -607 25 -45 c14 -24 45 -58 68 -75
           l44 -30 543 0 543 0 39 31 c79 63 73 -30 73 1162 l0 1062 173 0 c149 0 177 3
           207 19 49 26 91 81 97 130 12 92 54 47 -1078 1162 -652 641 -1064 1041 -1087
           1051 -20 10 -53 17 -72 17 -19 0 -52 -7 -72 -17z"/>
            </g>
          </svg></Link></li>
          <li><Link to="/about"><svg version="1.0" xmlns="http://www.w3.org/2000/svg"
            width="45px" viewBox="0 0 512.000000 512.000000"
            preserveAspectRatio="xMidYMid meet">

            <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
              fill="#000000" stroke="none">
              <path d="M4008 5095 c-148 -37 -49 56 -1763 -1651 -2157 -2146 -2106 -2094
           -2142 -2174 -17 -36 -35 -85 -41 -110 -6 -25 -23 -261 -37 -525 -20 -365 -24
           -489 -16 -516 14 -46 79 -106 123 -114 18 -4 252 5 519 19 573 29 588 32 724
           142 22 18 854 849 1848 1848 1783 1790 1808 1816 1843 1891 69 143 69 292 2
           434 -27 58 -65 100 -327 364 -163 164 -317 311 -343 328 -106 68 -268 95 -390
           64z m162 -325 c27 -7 100 -75 312 -287 297 -299 299 -301 285 -388 -9 -54 -53
           -107 -256 -310 l-191 -190 -362 363 -363 362 210 211 c245 246 273 265 365
           239z m-435 -1062 l350 -347 -1470 -1471 c-808 -809 -1483 -1478 -1499 -1487
           -23 -12 -112 -20 -395 -34 -200 -10 -366 -18 -367 -16 -4 4 35 700 41 737 5
           30 205 234 1483 1512 1245 1246 1478 1475 1491 1465 9 -7 173 -168 366 -359z"/>
              <path d="M1995 326 c-41 -18 -82 -68 -95 -116 -20 -75 21 -159 94 -194 31 -15
           170 -16 1505 -16 1446 0 1472 0 1511 20 61 31 85 73 85 151 0 56 -4 71 -27
           101 -56 74 71 68 -1570 68 -1202 -1 -1479 -3 -1503 -14z"/>
            </g>
          </svg></Link></li>
        </ul>
      </nav>
    </div>
  );
};

export default App;
