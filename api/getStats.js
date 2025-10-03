import fetch from 'node-fetch';

export default async function handler(req, res) {
  const { username } = req.query;
  const token = process.env.TWITTER_BEARER_TOKEN;

  if (!username) return res.status(400).json({ error: "Username required" });
  if (!token) return res.status(500).json({ error: "Twitter token missing" });

  try {
    const response = await fetch(
      `https://api.twitter.com/2/users/by/username/${username}?user.fields=public_metrics,profile_image_url`,
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );
    const data = await response.json();

    if (!data.data) return res.status(404).json({ error: "User not found" });

    const metrics = data.data.public_metrics;

    // Example: Yap = followers, posts = tweets, reach = followers*2
    return res.status(200).json({
      username: data.data.username,
      yap: metrics.followers_count,
      posts: metrics.tweet_count,
      reach: metrics.followers_count * 2,
      profile_image: data.data.profile_image_url.replace('_normal',''), // higher res
    });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}




