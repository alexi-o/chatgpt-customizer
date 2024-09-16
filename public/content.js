chrome.storage.sync.get("customPrompt", (data) => {
  if (data.customPrompt) {
    const chatInput = document.querySelector("textarea"); // Adjust this selector if needed
    if (chatInput) {
      chatInput.value = data.customPrompt;
    }
  }
});
