import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './components/Home.jsx';
import Settings from './pages/Settings';
import ProductList from './pages/ProductList';
import './index.css';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          {/* 今後ここに <Route path="search" element={<Search />} /> などを追加 */}
          <Route path="/settings" element={<Settings />} />
          <Route path="/ProductList" element={<ProductList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
