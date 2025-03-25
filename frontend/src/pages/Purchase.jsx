import React, { useState, useEffect } from 'react';
import { useAuth } from "@crossmint/client-sdk-react-ui";

const Purchase = () => {
  const { user } = useAuth();
  const apiKey = import.meta.env.VITE_CROSSMINT_API_KEY;
  const collectionId = import.meta.env.VITE_CROSSMINT_COLLECTION_ID;
  const arweaveImageUrl = "https://btruuwgkero6dqsk6y2w72kgbtfbncafhdch3bepa33cdpxxdhfa.arweave.net/DONKWMokXeHCSvY1b-lGDMoWiAU4xH2Ejwb2Ib73Gco";
  
  const [payerAddress, setPayerAddress] = useState('');
  const [orderId, setOrderId] = useState(null);
  const [orderStatus, setOrderStatus] = useState('');
  const [serializedTransaction, setSerializedTransaction] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // For debugging
  console.log("API Key:", apiKey ? "Exists" : "Missing");
  console.log("Collection ID:", collectionId);

  // Connect wallet function
  const connectWallet = async () => {
    try {
      setIsLoading(true);
      if (!window.ethereum) {
        throw new Error("MetaMask is not installed. Please install it to continue.");
      }
      
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setPayerAddress(accounts[0]);
      setIsLoading(false);
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  // Create order function
  const createOrder = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await fetch('https://staging.crossmint.com/api/2022-06-09/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey
        },
        body: JSON.stringify({
          payment: {
            method: 'base-sepolia',
            currency: 'eth',
            payerAddress: payerAddress
          },
          lineItems: {
            collectionLocator: `crossmint:${collectionId}`,
            callData: {
              totalPrice: '0.01'
            }
          }
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create order');
      }

      const data = await response.json();
      setOrderId(data.orderId);
      
      // Update the order with recipient info
      await updateOrderWithRecipient(data.orderId);
      
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  // Update order with recipient
  const updateOrderWithRecipient = async (id) => {
    try {
      const email = user?.email || '';
      
      if (!email) {
        setError('User email not found. Please ensure you are logged in.');
        setIsLoading(false);
        return;
      }

      const response = await fetch(`https://staging.crossmint.com/api/2022-06-09/orders/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey
        },
        body: JSON.stringify({
          recipient: {
            email: email
          }
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update order with recipient');
      }

      const data = await response.json();
      setSerializedTransaction(data.payment?.serializedTransaction);
      setOrderStatus('ready_for_payment');
      setIsLoading(false);
      
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  // Poll for order status
  const pollOrderStatus = async () => {
    if (!orderId) return;
    
    try {
      const response = await fetch(`https://staging.crossmint.com/api/2022-06-09/orders/${orderId}`, {
        headers: {
          'x-api-key': apiKey
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch order status');
      }

      const data = await response.json();
      setOrderStatus(data.phase);
      
      if (data.phase !== 'completed' && data.phase !== 'failed') {
        // Continue polling if order is still in progress
        setTimeout(pollOrderStatus, 5000);
      }
      
    } catch (err) {
      console.error('Error polling order status:', err);
    }
  };

  // Send transaction to wallet for signing
  const sendTransaction = async () => {
    try {
      setIsLoading(true);
      
      if (!serializedTransaction) {
        throw new Error('Transaction data not available');
      }
      
      if (!window.ethereum) {
        throw new Error('MetaMask is not installed');
      }
      
      // Request wallet to send transaction
      await window.ethereum.request({
        method: 'eth_sendTransaction',
        params: [JSON.parse(serializedTransaction)]
      });
      
      setOrderStatus('payment_processing');
      setIsLoading(false);
      
      // Start polling for status updates
      pollOrderStatus();
      
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  // Reset the checkout process
  const resetCheckout = () => {
    setOrderId(null);
    setOrderStatus('');
    setSerializedTransaction(null);
    setError(null);
  };

  // Get status message based on order status
  const getStatusMessage = () => {
    switch (orderStatus) {
      case 'quote':
        return 'Preparing your order...';
      case 'ready_for_payment':
        return 'Ready for payment. Please sign the transaction in your wallet.';
      case 'payment':
      case 'payment_processing':
        return 'Processing your payment...';
      case 'delivery':
        return 'Payment received! Delivering your NFT...';
      case 'completed':
        return 'Purchase complete! Your NFT has been delivered.';
      case 'failed':
        return 'Purchase failed. Please try again.';
      default:
        return '';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Purchase Your lil dumdumz NFT</h1>
      
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <div className="grid md:grid-cols-2 gap-8">
          {/* NFT Image Preview */}
          <div>
            <img 
              src={arweaveImageUrl}
              alt="NFT Preview" 
              className="w-full h-auto rounded-lg shadow-md" 
            />
          </div>
          
          {/* NFT Details and Purchase Interface */}
          <div>
            <h2 className="text-2xl font-medium mb-2">lil dumdumz NFT</h2>
            <p className="text-gray-600 mb-4">
              This NFT image is permanently stored on the Arweave network,
              ensuring it will remain accessible forever.
            </p>
            <div className="space-y-2 mb-6">
              <p><span className="font-medium">Storage:</span> Arweave</p>
              <p><span className="font-medium">Blockchain:</span> Base Sepolia</p>
              <p><span className="font-medium">Price:</span> 0.01 ETH</p>
            </div>
            
            {/* Authentication Check */}
            {user ? (
              <div>
                {!collectionId ? (
                  <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                    <p className="font-bold">Configuration Error</p>
                    <p>Collection ID is missing. Please check your environment variables.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* Status message display */}
                    {orderStatus && (
                      <div className="bg-blue-50 p-4 rounded-md mb-4">
                        <p className="font-medium">{getStatusMessage()}</p>
                      </div>
                    )}
                    
                    {/* Error message display */}
                    {error && (
                      <div className="bg-red-50 p-4 rounded-md mb-4 text-red-700">
                        <p className="font-medium">Error: {error}</p>
                      </div>
                    )}
                    
                    {/* Show connect wallet button if not connected yet */}
                    {!payerAddress && !orderId && (
                      <button
                        onClick={connectWallet}
                        disabled={isLoading}
                        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition"
                      >
                        {isLoading ? 'Connecting...' : 'Connect Wallet'}
                      </button>
                    )}
                    
                    {/* Show wallet address if connected */}
                    {payerAddress && !orderId && (
                      <div className="mb-4">
                        <p className="text-sm text-gray-600 mb-2">Connected wallet:</p>
                        <p className="font-mono text-sm bg-gray-100 p-2 rounded">{payerAddress}</p>
                        <button
                          onClick={createOrder}
                          disabled={isLoading}
                          className="w-full mt-4 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition"
                        >
                          {isLoading ? 'Creating Order...' : 'Create Order'}
                        </button>
                      </div>
                    )}
                    
                    {/* Show payment button when ready for payment */}
                    {orderStatus === 'ready_for_payment' && serializedTransaction && (
                      <button
                        onClick={sendTransaction}
                        disabled={isLoading}
                        className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition"
                      >
                        {isLoading ? 'Processing...' : 'Pay with Crypto'}
                      </button>
                    )}
                    
                    {/* Show order completed message */}
                    {orderStatus === 'completed' && (
                      <div className="bg-green-50 p-4 rounded-md border border-green-200">
                        <p className="font-medium text-green-800 mb-2">
                          Congratulations! Your NFT has been delivered successfully.
                        </p>
                        <p className="text-sm text-green-700">
                          You can view your NFT in your Crossmint wallet.
                        </p>
                        <button
                          onClick={resetCheckout}
                          className="mt-4 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition"
                        >
                          Purchase Another
                        </button>
                      </div>
                    )}
                    
                    {/* Show order failed message with retry option */}
                    {orderStatus === 'failed' && (
                      <div>
                        <p className="text-red-600 mb-4">
                          Your purchase couldn't be completed. Please try again.
                        </p>
                        <button
                          onClick={resetCheckout}
                          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition"
                        >
                          Try Again
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4">
                <p className="font-bold">Authentication Required</p>
                <p>Please sign in with Crossmint to purchase NFTs.</p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Instructions for testing */}
      <div className="bg-blue-50 p-6 rounded-lg mb-8">
        <h3 className="text-xl font-bold mb-2">Testing Instructions</h3>
        <p className="mb-4">
          To test the crypto payment flow:
        </p>
        <ol className="list-decimal pl-6 mb-4">
          <li>Make sure you have MetaMask installed</li>
          <li>Connect your wallet to the Base Sepolia testnet</li>
          <li>Ensure you have testnet ETH (you can get it from a faucet)</li>
          <li>Follow the on-screen instructions to complete the purchase</li>
        </ol>
        <p className="text-sm text-gray-600">
          Note: This is running in Crossmint's staging environment and using testnet cryptocurrency.
        </p>
      </div>
    </div>
  );
};

export default Purchase;
