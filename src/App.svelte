<script>
  import { onMount } from "svelte";

  let customInstructions = {
    aboutUser: "",
    responseStyle: "",
  };

  let instructionsList = [];
  let statusMessage = "";

  onMount(() => {
    chrome.storage.sync.get("instructionsList", (data) => {
      if (data.instructionsList) {
        instructionsList = data.instructionsList;
      }
    });
  });

  function saveInstructions() {
    if (customInstructions.aboutUser && customInstructions.responseStyle) {
      instructionsList.push({ ...customInstructions });
      chrome.storage.sync.set({ instructionsList }, () => {
        statusMessage = "Custom instructions saved!";
      });
      customInstructions = { aboutUser: "", responseStyle: "" };
    } else {
      statusMessage = "Please fill out all fields before saving.";
    }
  }

  function copyToClipboard(instructions) {
    const instructionsText = `What to know: ${instructions.aboutUser}\nHow to respond: ${instructions.responseStyle}`;
    navigator.clipboard.writeText(instructionsText).then(() => {
      statusMessage = "Instructions copied to clipboard!";
    });
  }
</script>

<main>
  <h1>ChatGPT Customizer</h1>

  <div>
    <label for="aboutUser">What would you like ChatGPT to know about you?</label
    >
    <textarea
      id="aboutUser"
      bind:value={customInstructions.aboutUser}
      placeholder="Provide information about yourself..."
    ></textarea>
  </div>

  <div>
    <label for="responseStyle">How would you like ChatGPT to respond?</label>
    <textarea
      id="responseStyle"
      bind:value={customInstructions.responseStyle}
      placeholder="Specify the response style..."
    ></textarea>
  </div>

  <button on:click={saveInstructions}>Save Custom Instructions</button>

  <h2>Saved Custom Instructions</h2>
  <ul>
    {#each instructionsList as instructions, index}
      <li>
        <strong>Instructions {index + 1}</strong><br />
        <button on:click={() => copyToClipboard(instructions)}
          >Copy to Clipboard</button
        >
        <p><strong>What to know:</strong> {instructions.aboutUser}</p>
        <p><strong>How to respond:</strong> {instructions.responseStyle}</p>
      </li>
    {/each}
  </ul>

  <div>{statusMessage}</div>
</main>

<style>
  main {
    padding: 10px;
  }

  label {
    display: block;
    margin-top: 10px;
  }

  textarea {
    width: 100%;
    height: 50px;
    margin-bottom: 10px;
  }

  button {
    margin-right: 10px;
    margin-top: 10px;
  }

  ul {
    list-style: none;
    padding: 0;
  }

  li {
    margin-bottom: 20px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  strong {
    display: block;
  }
</style>
