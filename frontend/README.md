<p align="center">
  <img src="https://arweave.net/Iodraq9lSkvwvWKdHmKIs54STnKkCNK-YuS5c4avAyE" alt="Zero to Arweave Starter Kit Banner" width="100%" />
</p>

# Zero to Arweave Starter Kit

A comprehensive starter kit for building decentralized applications on Arweave using React, Vite, and three powerful SDKs:

- [Arweave Wallet Kit](https://docs.arweavekit.com/arweave-wallet-kit/introduction) - Unified wallet interaction
- [AR.IO SDK](https://docs.ar.io/build/ar-io-sdk/getting-started) - Gateway and name system integration
- [Turbo SDK](https://docs.ardrive.io/docs/turbo/turbo-sdk/#installation) - Fast and efficient data uploads

## Prerequisites

- Node.js 16+
- Package manager (pnpm or yarn)
- An Arweave wallet (JSON file)
- An AR.IO name (get one at https://arns.app)

## Features

- 🔐 **Wallet Integration** - Seamless wallet connection with Arweave Wallet Kit
- 📝 **Name System** - AR.IO name system integration for human-readable addresses
- 🚀 **Fast Uploads** - Turbo-powered deployments for efficient data uploads
- 🎨 **Modern UI** - Clean, responsive interface with Tailwind CSS
- 📱 **Mobile Ready** - Fully responsive design that works on all devices
- 🛠️ **Developer Tools** - Comprehensive scripts for deployment and management
- 🔗 **Hash Routing** - Client-side routing that works with Arweave's permanent storage

## Quick Start

1. Clone the repository
```bash
git clone https://github.com/PSkinnerTech/ZeroToArweave-StarterKit.git
```
2. Install dependencies:
```bash
# Using pnpm
pnpm install

# OR using yarn
yarn install
```
3. Place your Arweave wallet file in the project root as `wallet.json`
4. Start the development server:
```bash
pnpm run dev  # or yarn dev
```

## SDK Integration

### Arweave Wallet Kit
- Handles wallet connections and transactions
- Provides React hooks for wallet state
- Manages wallet permissions and address access

### AR.IO SDK
- Manages AR.IO name system integration
- Handles record updates and primary name resolution
- Provides gateway integration features

### Turbo SDK
- Powers fast and efficient deployments
- Handles manifest generation
- Manages data uploads to Arweave

## Available Scripts

### Development
```bash
# Start development server
pnpm dev  # or yarn dev

# Build for production
pnpm build  # or yarn build

# Preview production build
pnpm preview  # or yarn preview
```

### Deployment Scripts

#### Deploy to Arweave
```bash
pnpm run deploy  # or yarn deploy
```
This will:
- Build your application
- Upload to Arweave via Turbo
- Generate a manifest file
- Provide a deployment URL: `https://arweave.net/{manifestId}`

> ⚠️ **Important**: You must have Turbo credits in your wallet for deployment to work. If you need Turbo credits, visit [turbo-topup.com](https://turbo-topup.com) to purchase some.

#### Update AR.IO Name

> ⚠️ **Important**: You must first deploy your app using `pnpm run deploy` before setting up your ARNS name. Make sure you have a successful deployment before proceeding.

To use an ARNS name as your Arweave Dapp's URL, follow these steps:

1. Visit [arns.app](https://arns.app)
2. Connect your Arweave wallet
3. Purchase an ARNS name if you haven't already (requires $ARIO tokens)
4. Click "Manage Assets" in the top-right
5. Click the settings icon on your desired ARNS name
6. Copy the Process ID
7. Open `/scripts/setBaseArns.js` and update the `processId` in the `ant` configuration:
```javascript
const ant = ANT.init({
    signer: new ArweaveSigner(jwk),
    processId: 'YOUR_PROCESS_ID_HERE'
});
```
8. Run the ARNS update command:
```bash
pnpm run set-base  # or yarn set-base
```

This will:
- Update your AR.IO name with the latest deployment
- Make your site available at: `https://{your-name}.ar.io`

#### Set Undername Record

To set an undername record for your AR.IO name:

1. Make sure you have completed the base name setup above
2. Open `/scripts/setUndername.js` and update the `processId`
3. Run the undername command:
```bash
pnpm run set-undername  # or yarn set-undername
```

This will create an undername record that makes your site available at: `https://{undername}_{your-name}.ar.io`

#### View AR.IO Records

To view all records associated with your AR.IO name, follow these steps:

1. Visit [arns.app](https://arns.app)
2. Connect your Arweave wallet
3. Click "Manage Assets" in the top-right
4. Click the settings icon on your desired ARNS name
5. Copy the Process ID
6. Open `/scripts/getRecords.js` and update the `processId`:
```javascript
const ant = ANT.init({ 
    processId: 'YOUR_PROCESS_ID_HERE'
});
```
7. Run the records command:
```bash
pnpm run records  # or yarn records
```
This will display all records associated with your AR.IO name, including the current @ record if one exists.

#### Get Primary Name

To look up the primary name for any Arweave address:

1. Copy the Arweave address you want to look up
2. Run the primary name command with the address:
```bash
pnpm run primary <arweave-address>  # or yarn primary <arweave-address>
```

For example:
```bash
pnpm run primary vh-NTHVvlKZqRxc8LyyTNok65yQ55a_PJ1zWLb9G2JI
```

This will display the primary name associated with the provided Arweave address, if one exists.

## Development Workflow

1. Make changes to your application
2. Test locally with `pnpm run dev`
3. Build with `pnpm run build`
4. Deploy with `pnpm run deploy`
5. Update AR.IO name with `pnpm run set-base`
6. Set undername (if needed) with `pnpm run set-undername`
7. Verify records with `pnpm run records`

## Important Notes

- Never commit your Arweave Keyfile to version control, it's currently in the `.gitignore` file as long as you name your keyfile `wallet.json`.
- Keep your manifest ID after deployment
- AR.IO name updates may take a few minutes to propagate
- Default TTL for name records is 15 minutes
- Ensure proper permissions are granted when connecting wallets

## Troubleshooting

- If deployment fails, check your wallet balance
- If name updates fail, verify your AR.IO name ownership
- For wallet connection issues, ensure proper permissions
- Check the console for detailed error messages

## Contributing

Contributions are welcome! Please read our contributing guidelines for details.

## License

This project is licensed under the MIT License - see the  LICENSE file for details.
