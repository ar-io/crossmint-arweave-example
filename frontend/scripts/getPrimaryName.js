import { ARIO } from '@ar.io/sdk';

async function getPrimaryName() {
    try {
        const ario = ARIO.init();
        
        // Get the address from command line arguments or use a default
        const address = process.argv[2];
        
        if (!address) {
            throw new Error('Please provide an Arweave address as an argument');
        }

        console.log(`Fetching primary name for address: ${address}\n`);
        
        try {
            const response = await ario.getPrimaryName({
                address: address
            });
            
            if (response) {
                console.log('Primary Name Found! 🎉');
                console.log('Full Response:');
                console.log(JSON.stringify(response, null, 2));
                console.log(`\nName: ${response.name}`);
                console.log(`Owner: ${response.owner}`);
                console.log(`Start Timestamp: ${response.startTimestamp}`);
                console.log(`\nView at: https://${response.name}.ar.io\n`);
            } else {
                console.log('There\'s currently no set primary name for this address yet.');
                console.log('To set a primary name for this address, head over to https://arns.app,');
                console.log('log in with the used address, and select the STAR next to the address');
                console.log('you\'d like to set as the primary address.\n');
            }
        } catch (e) {
            if (e.message.includes('Primary name data not found')) {
                console.log('There\'s currently no set primary name for this address yet.');
                console.log('To set a primary name for this address, head over to https://arns.app,');
                console.log('log in with the used address, and select the STAR next to the address');
                console.log('you\'d like to set as the primary address.\n');
            } else {
                throw e; // Re-throw if it's a different error
            }
        }

    } catch (error) {
        console.error('Error:', error.message);
        process.exit(1);
    }
}

getPrimaryName(); 