import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import CountryDetails from './components/CountryDetails';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/country/:code" element={<CountryDetails />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default App;
