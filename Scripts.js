const promptInput = document.getElementById("prompt");
const ratioInput = document.getElementById("ratio");
const durationInput = document.getElementById("duration");
const generateBtn = document.getElementById("generateBtn");
const statusBox = document.getElementById("status");
const resultBox = document.getElementById("result");
const videoPlayer = document.getElementById("videoPlayer");
const downloadBtn = document.getElementById("downloadBtn");

generateBtn.addEventListener("click", async () => {
  const prompt = promptInput.value.trim();
  const ratio = ratioInput.value;
  const duration = Number(durationInput.value);

  if (!prompt) {
    statusBox.textContent = "Please enter a video prompt.";
    promptInput.focus();
    return;
  }

  generateBtn.disabled = true;
  generateBtn.textContent = "Generating...";
  statusBox.textContent = "Your video is being generated...";
  resultBox.classList.add("hidden");

  try {
    /*
      IMPORTANT:
      Real AI video generation will be connected to your
      secure backend API here.

      Do NOT put your private API key in this JavaScript file.
    */

    const response = await fetch("/api/generate-video", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        prompt: prompt,
        aspectRatio: ratio,
        duration: duration
      })
    });

    if (!response.ok) {
      throw new Error("Video generation request failed.");
    }

    const data = await response.json();

    if (!data.videoUrl) {
      throw new Error("No video URL was returned.");
    }

    videoPlayer.src = data.videoUrl;
    downloadBtn.href = data.videoUrl;

    resultBox.classList.remove("hidden");
    statusBox.textContent = "Video generated successfully.";

  } catch (error) {
    console.error(error);

    statusBox.textContent =
      "Video generation is not connected yet. Backend/API setup is required.";
  } finally {
    generateBtn.disabled = false;
    generateBtn.textContent = "Generate Video";
  }
});
