import fetch from 'node-fetch';

export default async function handler(req, res) {
    const { username } = req.query;
    if (!username) return res.status(400).json({ error: "Username required" });

    try {
        const token = process.env.TWITTER_BEARER_TOKEN;
        if(!token) return res.status(500).json({ error: "Twitter token missing" });

        // Example fetch user (replace with real API call)
        // const response = await fetch(`https://api.twitter.com/2/users/by/username/${username}`, {
        //     headers: { Authorization: `Bearer ${token}` }
        // });
        // const data = await response.json();

        // Dummy stats for starter
        const stats = {
            username: username,
            yap: Math.floor(Math.random()*20),
            posts: Math.floor(Math.random()*15),
            reach: Math.floor(Math.random()*100000)
        };

        res.status(200).json(stats);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
