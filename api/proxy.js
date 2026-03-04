const axios = require('axios');

export default async function handler(req, res) {
    // Your Xtream Link
    const targetUrl = "http://nocable.cc:8080/EJ9GvC/046694/35243";

    try {
        const response = await axios.get(targetUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0',
                'Referer': 'https://github.com/'
            },
            responseType: 'text'
        });

        let content = response.data;
        
        // This makes sure the relative paths in the M3U8 point back to the original server
        const baseUrl = targetUrl.substring(0, targetUrl.lastIndexOf('/') + 1);
        const fixedContent = content.replace(/^(?!http)(.*)$/gm, baseUrl + "$1");

        res.setHeader('Content-Type', 'application/vnd.apple.mpegurl');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.status(200).send(fixedContent);
        
    } catch (error) {
        res.status(500).send("Error fetching stream index");
    }
}
