# Decentralized NFT Platform

A fully decentralized NFT platform that leverages Arweave for permanent storage and Crossmint for simplified NFT creation and purchasing. This application allows users to easily authenticate, purchase NFTs with cryptocurrency, and access the platform through a human-readable ArNS domain.

![NFT Platform Screenshot](https://btruuwgkero6dqsk6y2w72kgbtfbncafhdch3bepa33cdpxxdhfa.arweave.net/DONKWMokXeHCSvY1b-lGDMoWiAU4xH2Ejwb2Ib73Gco)

## Features

- **Permanent Storage**: NFT images stored on Arweave, ensuring permanent availability
- **Web3 Authentication**: Easy login via Crossmint (email, Google, or Farcaster)
- **NFT Purchasing**: Client-side crypto payment integration via Crossmint
- **Fully Decentralized**: Application deployed to Arweave for censorship resistance
- **Human-Readable Domain**: Accessible via AR.IO Name System (ArNS)
- **Responsive Design**: Optimized for all devices with a modern, engaging UI

## Technology Stack

- **Frontend**: React.js with Vite.js, TailwindCSS
- **Storage**: Arweave (via ArDrive SDK)
- **Authentication**: Crossmint Auth
- **Payments**: Crossmint Crypto Payments
- **NFT Standards**: ERC-1155 (Semi-Fungible Tokens)
- **Deployment**: ArDrive (via Turbo)
- **Domain**: AR.IO Name System

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- pnpm (recommended) or npm
- Arweave wallet file (for deployment)
- Crossmint developer account
- MetaMask or another Web3 wallet (for testing)

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/ar-io/crossmint-arweave-example.git
   cd decentralized-nft-platform
   ```

2. Install dependencies
   ```bash
   pnpm install
   ```

3. Set up environment variables by creating a `.env` file in the root directory:
   ```
   VITE_CROSSMINT_API_KEY="your_client_side_api_key"
   VITE_CROSSMINT_COLLECTION_ID="your_collection_id"
   ```

4. Place your Arweave wallet file as `wallet.json` in the project root (needed for deployment)

5. Start the development server
   ```bash
   pnpm dev
   ```

6. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
├── public/              # Static assets
├── scripts/             # Deployment and ArNS configuration scripts
├── src/
│   ├── components/      # Reusable UI components
│   │   ├── AuthButton.jsx      # Authentication button component
│   │   ├── CrossmintProviders.jsx  # Crossmint Auth providers
│   │   ├── Home.jsx            # Home page component
│   │   ├── NavBar.jsx          # Navigation bar component
│   │   └── ProtectedRoute.jsx  # Route protection component
│   ├── pages/           # Application pages
│   │   └── Purchase.jsx  # NFT purchase page
│   ├── App.jsx          # Main application component
│   ├── main.jsx         # Application entry point
│   └── index.css        # Global styles
├── .env                 # Environment variables
├── index.html           # HTML entry point
├── package.json         # Project dependencies and scripts
└── vite.config.js       # Vite configuration
```

## Usage

### Authentication Flow

1. Users visit the site and click "Sign in with Crossmint"
2. They can authenticate using email, Google, or Farcaster
3. Once authenticated, they can access protected features like NFT purchasing

### Purchase Flow

1. Authenticated users navigate to the Purchase page
2. Connect their MetaMask wallet to the application
3. Review the NFT details and price
4. Initiate the purchase process
5. Sign and send the transaction from their wallet
6. Receive the NFT in their Crossmint wallet

### Deployment Process

1. Build the application:
   ```bash
   pnpm build
   ```

2. Deploy to Arweave:
   ```bash
   pnpm deploy
   ```

3. Set up your AR.IO domain:
   ```bash
   pnpm set-base
   ```

## Collection Setup

Before users can purchase NFTs, you need to set up your collection:

1. Create a collection on Crossmint's staging/production console
2. Add at least one NFT to your collection
3. Get your collection ID and update your `.env` file
4. The NFT image should be stored on Arweave for true decentralization

## Customization

### Changing NFT Images

Update the `arweaveImageUrl` in the `Home.jsx` component to point to your own Arweave-stored image:

```jsx
const arweaveImageUrl = "https://arweave.net/YOUR_ARWEAVE_TX_ID";
```

### Modifying Theme Colors

The application uses TailwindCSS for styling. You can customize the color scheme by modifying the gradient classes in the components:

```jsx
// Example from NavBar.jsx
<span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
```

### Adding New Pages

1. Create a new component in the `pages` directory
2. Add a new route in `App.jsx`:
   ```jsx
   <Route path="/your-new-page" element={<YourNewPage />} />
   ```
3. Add a link to the new page in the NavBar component

## Deployment

### Local Build

```bash
pnpm build
```

This creates a production-ready build in the `dist` directory.

### Deploying to Arweave

1. Ensure you have your Arweave wallet file (`wallet.json`) in the project root
2. Run the deployment script:
   ```bash
   pnpm deploy
   ```
3. Save the manifest ID from the output

### Setting up ArNS Domain

1. Purchase an AR.IO name at [arns.app](https://arns.app/)
2. Update the `processId` in `/scripts/setBaseArns.js`
3. Update the `dataLink` with your deployment manifest ID
4. Run:
   ```bash
   pnpm set-base
   ```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Arweave](https://www.arweave.org/) for permanent storage
- [Crossmint](https://www.crossmint.com/) for NFT infrastructure
- [AR.IO](https://ar.io/) for decentralized domains
-  [ArDrive](https://ardrive.io) for deploying assets and frontend to Arweave
- [Zero-to-Arweave](https://github.com/ar-io/ZeroToArweave-StarterKit) for the starter kit
