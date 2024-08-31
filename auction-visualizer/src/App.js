import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import EnglishAuction from './components/EnglishAuction';

function App() {
    return (
        <Router>
            <div>
                <nav>
                    <ul>
                        <li><Link to="/english-auction">English Auction</Link></li>
                        {/* Add more links for other auction types */}
                    </ul>
                </nav>
                <Routes>
                    <Route path="/english-auction" element={<EnglishAuction />} />
                    {/* Add more routes as needed */}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
