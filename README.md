# Intelligent-IDE

Intelligent-IDE is a web-based code editor with AI-assisted chat and live code explanations. It integrates **Gemini AI API** for code explanation and assistance, along with **OneCompiler API** for executing code in multiple programming languages.

## Features
- Code editor with syntax highlighting (CodeMirror)
- Supports multiple programming languages
- AI-assisted chat for debugging, code generation and explanations
- Live AI-powered code explanations
- Console output for executed code with support for user input
- Debug functionality to identify and correct code issues
- 
## Prerequisites
Make sure you have the following installed:
- **Node.js** (>= 16.x)
- **npm** or **yarn**
- An API key for **Gemini AI** (Google Generative AI API)
- An API key for **OneCompiler API** (RapidAPI)

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/Intelligent-IDE.git
   cd Intelligent-IDE
   ```
2. Install dependencies:
   ```sh
   npm install
   ```

## Configuration
Before running the app, set up your environment variables.

1. Create a **.env** file in the project root:
   ```sh
   touch .env
   ```
2. Add the following keys and replace them with your actual API keys:
   ```sh
   REACT_APP_GEMINI_API_KEY=your-gemini-api-key
   REACT_APP_ONECOMPILER_API_KEY=your-onecompiler-api-key
   ```

## Running the App
To start the development server, run:
```sh
npm start
```
This will launch the application at **http://localhost:3000/**.

## Usage
- Select a programming language from the dropdown.
- Write or paste your code into the editor.
- Click the **Run** button to execute the code.
- View the console output below the editor.
- Click the Debug button to get AI-suggested corrections and explanations for issues.
- Use the chat to ask questions, request code generation, or seek explanations.
- See real-time code explanations as you type, updated every second

## Technologies Used
- **React** (UI Framework)
- **CodeMirror** (Code Editor with Syntax Highlighting)
- **Google Gemini API** (AI Assistance for Explanations and Debugging)
- **OneCompiler API** (Code Execution)
- **Axios** (API Requests)

## Contributing
Feel free to contribute by creating issues or submitting pull requests. Make sure to follow coding best practices and include proper documentation.

## Contact
For questions or issues, reach out via GitHub Issues or email at ratnajaiswalrj22@gmail.com

