<script>
  import { onMount } from "svelte";

  let customInstructions = {
    aboutUser: "",
    responseStyle: "",
  };

  let instructionsList = [];
  let statusMessage = "";
  let activeTab = "Prompts";

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

  function switchTab(tab) {
    activeTab = tab;
    statusMessage = "";
  }
</script>

<main>
  <header>
    <h2>ChatGPT Customizer</h2>
  </header>
  <div>
    <nav>
      <button
        on:click={() => switchTab("Prompts")}
        class:active={activeTab === "Prompts"}>Prompts</button
      >
      <button
        on:click={() => switchTab("Create")}
        class:active={activeTab === "Create"}>Create</button
      >
    </nav>
  </div>
  {#if activeTab === "Prompts"}
    <h3>Saved Custom Instructions</h3>
    {#if instructionsList.length > 0}
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
    {:else}
      <p>No saved prompts yet. Create one in the "Create" tab.</p>
    {/if}
  {/if}

  {#if activeTab === "Create"}
    <h3>Create New Custom Instructions</h3>
    <div>
      <label for="aboutUser"
        >What would you like ChatGPT to know about you?</label
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
  {/if}

  <div>{statusMessage}</div>
</main>

<style>
  main {
    padding: 10px;
  }

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }

  nav {
    display: flex;
  }

  nav button {
    margin-right: 10px;
    padding: 8px 16px;
    cursor: pointer;
    border: none;
    background-color: #ddd;
    border-radius: 4px;
  }

  nav button.active {
    background-color: #007bff;
    color: white;
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
