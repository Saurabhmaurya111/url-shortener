const shortid = require("shortid");

const URL = require("../models/url");

async function handleGenerateNewShortUrl(req, res) {
  const body = req.body;
  if (!body.url) return res.status(400).json({ error: `Url is required` });
  const shortId = shortid();
  await URL.create({
    shortId: shortId,
    redirectedUrl: body.url,
    vistedHistory: [],
  });
  return res.json({ id: shortId });
}

async function handleAnalytics(req, res) {
 const shortId = req.params.shortId;
 const result = await URL.findOne({shortId});

 return res.json({
    totalClicks: result.vistedHistory.length,
    analytics: result.vistedHistory,
 })
}

module.exports = { handleGenerateNewShortUrl , handleAnalytics };
