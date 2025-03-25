import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from "@crossmint/client-sdk-react-ui";

// Make sure to use the 'default' export
const Home = () => {
  const { user, login } = useAuth();
  const arweaveImageUrl = "https://btruuwgkero6dqsk6y2w72kgbtfbncafhdch3bepa33cdpxxdhfa.arweave.net/DONKWMokXeHCSvY1b-lGDMoWiAU4xH2Ejwb2Ib73Gco";

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Collect Unique Digital Art from lil dumdumz
              </h1>
              <p className="text-xl mb-8 text-indigo-100">
                Fully decentralized NFTs with permanent storage on Arweave. Own a piece of digital history that lasts forever.
              </p>
              <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4">
                {user ? (
                  <Link 
                    to="/purchase" 
                    className="px-8 py-3 bg-white text-indigo-600 rounded-full font-bold text-lg shadow-lg hover:bg-indigo-50 transition duration-300"
                  >
                    Purchase NFT
                  </Link>
                ) : (
                  <button
                    onClick={login}
                    className="px-8 py-3 bg-white text-indigo-600 rounded-full font-bold text-lg shadow-lg hover:bg-indigo-50 transition duration-300"
                  >
                    Connect Wallet
                  </button>
                )}
                <a 
                  href="#learn-more" 
                  className="px-8 py-3 bg-transparent border-2 border-white rounded-full font-bold text-lg hover:bg-white hover:bg-opacity-10 transition duration-300"
                >
                  Learn More
                </a>
              </div>
            </div>
            <div className="relative">
              <div className="relative z-10 overflow-hidden rounded-2xl shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-500">
                <img 
                  src={arweaveImageUrl} 
                  alt="Featured NFT" 
                  className="w-full h-auto"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                  <p className="text-white text-xl font-semibold">lil dumdumz #1</p>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-indigo-200">Price: 0.01 ETH</span>
                    <span className="bg-indigo-500 text-white px-3 py-1 rounded-full text-sm">Limited Edition</span>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-5 -right-5 h-48 w-48 bg-yellow-400 rounded-full opacity-70 blur-3xl -z-10"></div>
              <div className="absolute -top-5 -left-5 h-36 w-36 bg-purple-500 rounded-full opacity-70 blur-3xl -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="learn-more" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-16 text-gray-800">
            A Truly <span className="text-indigo-600">Decentralized</span> NFT Platform
          </h2>
          
          <div className="grid md:grid-cols-3 gap-12">
            <div className="bg-gray-50 rounded-xl p-8 shadow-md transform hover:scale-105 transition duration-300">
              <div className="h-14 w-14 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Permanent Storage</h3>
              <p className="text-gray-600">
                Your NFT images are stored on Arweave, ensuring they'll be accessible forever. No more broken NFTs due to centralized servers going offline.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-8 shadow-md transform hover:scale-105 transition duration-300">
              <div className="h-14 w-14 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Simplified Purchasing</h3>
              <p className="text-gray-600">
                Crossmint integration allows for easy NFT purchasing with cryptocurrency, making blockchain technology accessible to everyone.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-8 shadow-md transform hover:scale-105 transition duration-300">
              <div className="h-14 w-14 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Decentralized Domain</h3>
              <p className="text-gray-600">
                Our app is hosted on the AR.IO network, ensuring it will remain accessible indefinitely with a human-readable domain name.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* NFT Preview Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Featured NFT</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              A limited edition artwork with permanent storage on Arweave and verification on the Base Sepolia blockchain.
            </p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden max-w-4xl mx-auto">
            <div className="md:flex">
              <div className="md:w-1/2">
                <img 
                  src={arweaveImageUrl} 
                  alt="Featured NFT" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="md:w-1/2 p-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">lil dumdumz NFT #1</h3>
                <div className="flex items-center mb-6">
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm mr-3">Available</span>
                  <span className="text-gray-500 text-sm">Limited Edition of 100</span>
                </div>
                <p className="text-gray-600 mb-6">
                  This unique NFT features stunning artwork permanently stored on the Arweave network, 
                  ensuring its availability for generations to come. Own a piece of digital history that can't be altered or deleted.
                </p>
                <div className="border-t border-gray-200 pt-6 mb-6">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-500">Storage</span>
                    <span className="font-medium">Arweave</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-500">Blockchain</span>
                    <span className="font-medium">Base Sepolia</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-500">Price</span>
                    <span className="font-medium">0.01 ETH</span>
                  </div>
                </div>
                {user ? (
                  <Link 
                    to="/purchase" 
                    className="block w-full py-3 px-4 bg-indigo-600 text-white text-center font-medium rounded-lg hover:bg-indigo-700 transition duration-300"
                  >
                    Purchase This NFT
                  </Link>
                ) : (
                  <button
                    onClick={login}
                    className="block w-full py-3 px-4 bg-indigo-600 text-white text-center font-medium rounded-lg hover:bg-indigo-700 transition duration-300"
                  >
                    Connect Wallet to Purchase
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-indigo-600 text-white py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to own your piece of digital history?</h2>
          <p className="text-xl text-indigo-100 mb-8 max-w-3xl mx-auto">
            Join the movement for truly permanent digital ownership with our decentralized NFT platform.
          </p>
          {user ? (
            <Link 
              to="/purchase" 
              className="inline-block px-8 py-4 bg-white text-indigo-600 rounded-full font-bold text-lg shadow-lg hover:bg-indigo-50 transition duration-300"
            >
              Purchase Your NFT Now
            </Link>
          ) : (
            <button
              onClick={login}
              className="inline-block px-8 py-4 bg-white text-indigo-600 rounded-full font-bold text-lg shadow-lg hover:bg-indigo-50 transition duration-300"
            >
              Connect Wallet to Get Started
            </button>
          )}
        </div>
      </section>
    </>
  );
};

// Make sure to add this default export
export default Home;
