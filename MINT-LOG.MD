# SFT Minting Log

## Collection Creation

### Collection: little dumdumz
- **Date**: 2023-03-24
- **Chain**: base-sepolia
- **Collection ID**: 085a9a58-b5b3-4b79-af96-e01dcadead0d
- **Collection Type**: ERC-721 (Note: This will be updated to ERC-1155 for future mints)
- **Image URL**: https://btruuwgkero6dqsk6y2w72kgbtfbncafhdch3bepa33cdpxxdhfa.arweave.net/DONKWMokXeHCSvY1b-lGDMoWiAU4xH2Ejwb2Ib73Gco
- **Description**: dumdumz, but little
- **Status**: Created successfully
- **Action ID**: 085a9a58-b5b3-4b79-af96-e01dcadead0d

## Template Creation
- Not yet created (will create ERC-1155 template next)

## SFT Minting
- Not yet minted (will mint SFTs after template creation)

## Next Steps
1. Create an ERC-1155 collection with semi-fungible parameter
2. Create a template within the collection
3. Mint SFTs from the template
4. Check minting status

## Command Reference

### Collection Creation Command
```bash
curl --request POST \
     --url https://staging.crossmint.com/api/2022-06-09/collections/ \
     --header 'content-type: application/json' \
     --header 'x-api-key: sk_staging_YOUR_API_KEY' \
     --data '
{                    
  "chain": "base-sepolia",
  "fungibility": "semi-fungible",
  "metadata": {                
    "name": "little dumdumz",                                         
    "imageUrl": "https://btruuwgkero6dqsk6y2w72kgbtfbncafhdch3bepa33cdpxxdhfa.arweave.net/DONKWMokXeHCSvY1b-lGDMoWiAU4xH2Ejwb2Ib73Gco",
    "description": "dumdumz, but little"                                   
  }
}
'
```

### Template Creation Command (To Be Executed)
```bash
curl --request POST \
  --url https://staging.crossmint.com/api/2022-06-09/collections/YOUR_COLLECTION_ID/templates \
  --header 'accept: application/json' \
  --header 'content-type: application/json' \
  --header 'x-api-key: YOUR_API_KEY' \
  --data '
  {
    "onChain": {
      "tokenId": "1"
    },
    "supply": {
      "limit": 100
    },
    "metadata": {
      "name": "lil dumdumz SFT",
      "image": "https://btruuwgkero6dqsk6y2w72kgbtfbncafhdch3bepa33cdpxxdhfa.arweave.net/DONKWMokXeHCSvY1b-lGDMoWiAU4xH2Ejwb2Ib73Gco",
      "description": "Semi-fungible token with image permanently stored on Arweave",
      "attributes": [
        {
          "trait_type": "Storage",
          "value": "Arweave"
        },
        {
          "trait_type": "Permanence",
          "value": "Forever"
        }
      ]
    }
  }'
```

### SFT Minting Command (To Be Executed)
```bash
curl --request POST \
  --url https://staging.crossmint.com/api/2022-06-09/collections/YOUR_COLLECTION_ID/sfts \
  --header 'accept: application/json' \
  --header 'content-type: application/json' \
  --header 'x-api-key: YOUR_API_KEY' \
  --data '
  {
    "templateId": "YOUR_TEMPLATE_ID",
    "recipient": "email:YOUR_EMAIL:base-sepolia",
    "amount": 1
  }'
```

## Notes
- The original collection was created successfully but we're updating our approach to use ERC-1155 semi-fungible tokens
- Need to create a new collection with the `fungibility: "semi-fungible"` parameter
- All image assets are permanently stored on Arweave for true decentralization
- Once template is created and SFTs are minted, this log will be updated with their details
