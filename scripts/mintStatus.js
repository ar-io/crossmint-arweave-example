// Load environment variables
require('dotenv').config();

const apiKey = process.env.CROSSMINT_API_KEY;
const env = "staging";
const actionId = "fdf45fa0-ff64-40db-b296-8a59882828f5"; // The action ID from your successful mint

const url = `https://${env}.crossmint.com/api/2022-06-09/actions/${actionId}`;
const options = {
    method: "GET",
    headers: { "X-API-KEY": apiKey },
};

fetch(url, options)
    .then((response) => response.json())
    .then((response) => {
        console.log(response);
        // Append status check to log file
        // If you want to automate this, you'd need to use a file system module like fs
        console.log("Don't forget to update mint-log.md with this status check");
    })
    .catch((err) => console.error(err));
