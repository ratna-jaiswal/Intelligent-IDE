# Intelligent-IDE

Intelligent-IDE is a web-based code editor with AI-assisted chat and live code explanations. It integrates **Gemini AI API** for code explanation and assistance, along with **OneCompiler API** for executing code in multiple programming languages.

## Features
- Code editor with syntax highlighting (CodeMirror)
- Supports multiple programming languages
- AI-assisted chat for debugging and explanations
- Live AI-powered code explanations
- Console output for executed code

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
- Use the AI chat to ask questions related to your code.
- View live AI-generated code explanations.

## Technologies Used
- **React** (UI Framework)
- **CodeMirror** (Code Editor)
- **Google Gemini API** (AI Assistance)
- **OneCompiler API** (Code Execution)
- **Axios** (API Requests)

## Contributing
Feel free to contribute by creating issues or submitting pull requests. Make sure to follow coding best practices and include proper documentation.

## Contact
For questions or issues, reach out via GitHub Issues or email at ratnajaiswalrj22@gmail.com

