import fs from 'fs';
import { ANT, ArweaveSigner } from '@ar.io/sdk';

async function setUndername() {
    try {
        // Check for wallet.json
        if (!fs.existsSync('./wallet.json')) {
            throw new Error('wallet.json not found in the root of your project');
        }
        
        // Use the updated transaction ID
        const manifestId = 'MxwKVOHvldSiIdZ83rTP_KZ0OAX6esKqaTq1SyK3UKo';
        
        console.log(`Using manifest ID: ${manifestId}`);

        const jwk = JSON.parse(fs.readFileSync('./wallet.json', 'utf8'));

        const ant = ANT.init({
            signer: new ArweaveSigner(jwk),
            processId: 'Ug719ELVWyfUpKPdksVXWGCJGLnfB7fJqWMYM-cC2us'
        });

        const { id: txId } = await ant.setUndernameRecord({
            undername: 'crossmint', // You might want to make this configurable
            transactionId: manifestId,
            ttlSeconds: 900 // 15 minutes
        });

        console.log('\nUndername Record Update Complete! 🎉');
        console.log(`Transaction ID: ${txId}`);
        console.log(`View your deployment at: https://crossmint.YOUR_NAME.ar.io\n`);
    } catch (error) {
        console.error('Failed to update undername record:', error);
        process.exit(1);
    }
}

setUndername();
