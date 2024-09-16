chrome.storage.sync.get("customPrompt", (data) => {
  if (data.customPrompt) {
    const chatInput = document.querySelector("textarea");
    if (chatInput) {
      chatInput.value = data.customPrompt;
    }
  }
});
