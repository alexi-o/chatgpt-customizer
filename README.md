### ChatGPT Customizer - Chrome Extension

#### Overview

ChatGPT Customizer is a Chrome extension that allows you to create, save, and manage custom prompts for ChatGPT. It helps you define specific instructions about yourself and how you would like ChatGPT to respond. You can easily copy these custom instructions to the clipboard for quick use during your interactions with ChatGPT.

#### Features

- **Create Custom Instructions**: Define what ChatGPT should know about you and how it should respond.
- **Save and Manage Prompts**: Save multiple sets of instructions for different scenarios and manage them easily.
- **Copy to Clipboard**: Quickly copy any saved prompt to the clipboard for use in ChatGPT.
- **Tabbed Interface**: Switch between "Prompts" to view saved instructions and "Create" to add new ones.

#### How to Use

1. **Creating a New Prompt**:

   - Open the extension and go to the "Create" tab.
   - Fill in the fields:
     - **What would you like ChatGPT to know about you?**
     - **How would you like ChatGPT to respond?**
   - Click "Save Custom Instructions" to save the prompt.

2. **Managing Prompts**:

   - Go to the "Prompts" tab to view all saved instructions.
   - Use the "Copy to Clipboard" button on any prompt to copy the instructions for quick use.

3. **Switching Tabs**:
   - Use the "Prompts" and "Create" buttons in the header to switch between viewing saved prompts and creating new ones.

#### File Structure

- **`manifest.json`**: Configures the Chrome extension, including permissions and icons.
- **`src/App.svelte`**: Main Svelte component for the extension's user interface.
- **`public/`**: Contains icons and `index.html` for the popup UI.

#### Icons

Icons were generated using Icon Kitchen and are included in the `icons` directory. The extension uses the following icons:

- **16x16, 32x32, 48x48, and 128x128 pixels** for different parts of the Chrome extension interface.

#### License

This project is licensed under the MIT License - see the LICENSE file for more details.
