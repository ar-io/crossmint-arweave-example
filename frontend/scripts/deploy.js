import fs from 'fs';
import { Buffer } from 'node:buffer';
import TurboDeploy from './turbo.js';

function parseWallet(input) {
    try {
        return JSON.parse(input);
    } catch {
        try {
            return JSON.parse(Buffer.from(input, 'base64').toString('utf-8'));
        } catch {
            throw new Error('Invalid wallet format. Must be JSON or base64 encoded JSON');
        }
    }
}

(async () => {
    const walletPath = './wallet.json';
    
    if (!fs.existsSync(walletPath)) {
        console.error('wallet.json not found in project root');
        process.exit(1);
    }

    try {
        const walletData = fs.readFileSync(walletPath, 'utf8');
        const jwk = parseWallet(walletData);
        
        const manifestId = await TurboDeploy(jwk);
        console.log(`\nDeployment Complete! 🎉`);
        console.log(`View your deployment at: https://arweave.net/${manifestId}\n`);
    } catch (e) {
        console.error('Deployment failed:', e);
        process.exit(1);
    }
})();
