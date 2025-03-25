// Load environment variables
require('dotenv').config();

const apiKey = process.env.CROSSMINT_API_KEY;
const chain = "base-sepolia"; // Corrected to Base testnet for development
const env = "staging"; // Using staging environment
const recipientEmail = "me@patrickskinner.tech";
const recipientAddress = `email:${recipientEmail}:${chain}`;

// Direct link to the image on Arweave from README.MD
const arweaveImageUrl = "https://btruuwgkero6dqsk6y2w72kgbtfbncafhdch3bepa33cdpxxdhfa.arweave.net/DONKWMokXeHCSvY1b-lGDMoWiAU4xH2Ejwb2Ib73Gco";

// Use the collection ID from .env
const collectionId = process.env.COLLECTION_ID;

const url = `https://${env}.crossmint.com/api/2022-06-09/collections/${collectionId}/nfts`;
const options = {
    method: "POST",
    headers: {
        accept: "application/json",
        "content-type": "application/json",
        "x-api-key": apiKey,
    },
    body: JSON.stringify({
        recipient: recipientAddress,
        metadata: {
            name: "lil dumdumz NFT",
            image: arweaveImageUrl,
            description: "My decentralized NFT with image stored on Arweave",
            attributes: [
                {
                    trait_type: "Storage",
                    value: "Arweave"
                },
                {
                    trait_type: "Permanence",
                    value: "Forever"
                }
            ]
        },
    }),
};

fetch(url, options)
    .then((res) => res.json())
    .then((json) => {
        console.log(json);
        console.log("Save this actionId for checking status:", json.actionId);
    })
    .catch((err) => console.error("Error:", err));
