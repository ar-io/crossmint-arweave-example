import NavBar from './components/NavBar';
import { useConnection } from '@arweave-wallet-kit/react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Purchase from './pages/Purchase';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const { connected } = useConnection();

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <NavBar />
      
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/purchase" element={
            <ProtectedRoute>
              <Purchase />
            </ProtectedRoute>
          } />
          <Route path="/dashboard" element={
            connected ? (
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 mb-10">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                  <div className="bg-indigo-600 px-6 py-4">
                    <h1 className="text-2xl font-bold text-white">Your NFT Dashboard</h1>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-600 mb-6">This is where you'll be able to view your minted NFTs and manage your collection.</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="bg-gray-100 rounded-lg p-4 animate-pulse">
                          <div className="h-48 bg-gray-200 rounded-md mb-4"></div>
                          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                        </div>
                      ))}
                    </div>
                    <p className="mt-6 text-center text-sm text-gray-500">Coming soon: Complete NFT gallery and minting interface</p>
                  </div>
                </div>
              </div>
            ) : (
              <Navigate to="/" replace />
            )
          } />
        </Routes>
      </main>
    </div>
  );
}

export default App;
