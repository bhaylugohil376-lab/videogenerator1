const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "..")));

app.post("/api/generate-video", async (req, res) => {
  try {
    const { prompt, aspectRatio, duration } = req.body;

    if (!prompt || prompt.trim().length === 0) {
      return res.status(400).json({
        error: "Prompt is required."
      });
    }

    console.log("Video request:", {
      prompt,
      aspectRatio,
      duration
    });

    // AI video API yahan connect hogi.
    // Private API key ko code me directly mat likhna.
    // Example:
    // const apiKey = process.env.VIDEO_API_KEY;

    return res.status(501).json({
      error: "AI video API is not connected yet."
    });

  } catch (error) {
    console.error("Server error:", error);

    return res.status(500).json({
      error: "Internal server error."
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
