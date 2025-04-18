import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { SocialDataProvider } from './context/SocialDataContext';
import Layout from './components/Layout';
import TopUsers from './pages/TopUsers';
import TrendingPosts from './pages/TrendingPosts';
import Feed from './pages/Feed';

function App() {
  return (
    <SocialDataProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<TopUsers />} />
            <Route path="trending" element={<TrendingPosts />} />
            <Route path="feed" element={<Feed />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </Router>
    </SocialDataProvider>
  );
}

export default App;