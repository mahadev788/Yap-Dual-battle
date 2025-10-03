export default async function handler(req, res) {
  const { username, manualYap, manualPosts, manualReach } = req.query;

  if (!username) return res.status(400).json({ error: "Username required" });

  // Manual override
  if (manualYap || manualPosts || manualReach) {
    return res.status(200).json({
      username,
      yap: Number(manualYap || 0),
      posts: Number(manualPosts || 0),
      reach: Number(manualReach || 0)
    });
  }

  // Mock data if no manual input
  const mock = {
    username,
    yap: Math.floor(Math.random() * 30),
    posts: Math.floor(Math.random() * 20),
    reach: Math.floor(Math.random() * 200000),
    mockSource: true
  };

  res.status(200).json(mock);
}

