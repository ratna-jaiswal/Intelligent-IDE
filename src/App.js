import React, { useState, useCallback } from 'react';
import axios from 'axios';
import './App.css';
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";
import { java } from "@codemirror/lang-java";
import { cpp } from "@codemirror/lang-cpp";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
import { markdown } from "@codemirror/lang-markdown";
import { json } from "@codemirror/lang-json";

function App() {
  const geminiApiKey = process.env.REACT_APP_GEMINI_API_KEY;
  const compilerApiKey = process.env.REACT_APP_ONECOMPILER_API_KEY;

  const languageExtensions = {
    javascript: javascript(),
    python: python(),
    java: java(),
    cpp: cpp(),
    html: html(),
    css: css(),
    markdown: markdown(),
    json: json(),
  };

  const [code, setCode] = useState('// Write your code here');
  const [consoleOutput, setConsoleOutput] = useState('');
  const [chatMessage, setChatMessage] = useState('');
  const [chatResponse, setChatResponse] = useState('AI response will appear here...');
  const [codeExplanation, setCodeExplanation] = useState('Code explanation will appear here...');
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');

  const getCodeExplanation = async (currentCode: string) => {
    if (!currentCode.trim() || currentCode === '// Write your code here') {
      setCodeExplanation('Start writing code to see the explanation...');
      return;
    }

    try {
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiApiKey}`,
        {
          contents: [
            {
              parts: [
                {
                  text: `You are an expert programmer. Please explain this ${selectedLanguage} code in most minimilastic way, not more than 30 words for a line:
                  \`\`\`
                  ${currentCode}
                  \`\`\`
                  Focus on the main concepts and functionality. Be brief but thorough.`
                }
              ]
            }
          ]
        }
      );
      
      console.log("Gemini API Response:", response.data); // Debugging line
      const aiResponse = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || 'No explanation available.';
      setCodeExplanation(aiResponse);
    } catch (error) {
      console.error('API Error:', error);
      setCodeExplanation('Error generating code explanation.');
    }
  };

  const handleCodeChange = useCallback((newCode: string) => {
    setCode(newCode);
    
    // Clear previous timeout before setting a new one
    if (window.codeExplanationTimeout) {
      clearTimeout(window.codeExplanationTimeout);
    }
    
    window.codeExplanationTimeout = setTimeout(() => {
      getCodeExplanation(newCode);
    }, 1000);
  }, [code]);
  

  

  const handleRun = async () => {
    setConsoleOutput('Executing code...');

    const languageMap = {
      javascript: { apiLang: 'nodejs', ext: 'js' },
      python: { apiLang: 'python3', ext: 'py' },
      java: { apiLang: 'java', ext: 'java' },
      cpp: { apiLang: 'cpp', ext: 'cpp' },
      html: { apiLang: 'html', ext: 'html' },
      css: { apiLang: 'css', ext: 'css' },
      markdown: { apiLang: 'markdown', ext: 'md' },
      json: { apiLang: 'json', ext: 'json' }
    };
  
    const languageInfo = languageMap[selectedLanguage] || { apiLang: 'nodejs', ext: 'js' };
    const fileName = `test.${languageInfo.ext}`; 
  
    const payload = {
      language: languageInfo.apiLang,
      stdin: '',
      files: [{ name: fileName, content: code }],
    };

    try {
      const response = await axios.post('https://onecompiler-apis.p.rapidapi.com/api/v1/run', payload, {
        headers: {
          'X-RapidAPI-Key': compilerApiKey,
          'X-RapidAPI-Host': 'onecompiler-apis.p.rapidapi.com',
          'Content-Type': 'application/json',
        },
      });
      if (response.data) {
        console.log(response.data);
        console.log(response.data.stdout);
        setConsoleOutput(response.data.stdout);
      } else {
        setConsoleOutput('No output received. Check API response.');
      }
    } catch (error) {
      console.error('Compilation Error:', error.response?.data || error.message);
      setConsoleOutput(`Error executing code: ${error.message}`);
    }
  };

  const handleSendMessage = async (event?: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event) {
      if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        if (!chatMessage.trim()) return;
        sendChatMessage();
      }
    } else {
      if (!chatMessage.trim()) return;
      sendChatMessage();
    }
  };

  const sendChatMessage = async () => {
    setChatResponse('Thinking...');

    try {
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiApiKey}`,
        {
          contents: [
            {
              parts: [
                {
                  text: `You're an AI assistant to help people with their doubts in their code, explain it in as minimalistic way as possible.
                  User's Code:
                  \`\`\`
                  ${code}
                  \`\`\`
      
                  Console Output:
                  \`\`\`
                  ${consoleOutput}
                  \`\`\`
      
                  User's Question:
                  ${chatMessage}
                  `
                }
              ]
            }
          ]
        }
      );

      const aiResponse = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || 'No response from AI.';
      setChatResponse(`AI: ${aiResponse}`);
    } catch (error) {
      console.error('API Error:', error.response?.data || error.message);
      setChatResponse('Error fetching AI response.');
    }

    setChatMessage('');
  };

  return (
    <div className="ide-container">
      {/* Top Navbar */}
      <div className="top-navbar">
        <div className="left-nav">
          <span>File</span>
          <span>Terminal</span>
          <span>Console</span>
          <span>Setting</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Left Section */}
        <div className="left-section">
          <div className="code-area">
            <div className="code-header">
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="language-select"
              >
                <option value="javascript">JavaScript</option>
                <option value="python">Python</option>
                <option value="java">Java</option>
                <option value="cpp">C++</option>
                <option value="html">HTML</option>
                <option value="css">CSS</option>
                <option value="md">Markdown</option>
                <option value="json">JSON</option>

              </select>
              <button onClick={handleRun}>Run</button>
            </div>

            <CodeMirror
              value={code}
              height="300px"
              extensions={[languageExtensions[selectedLanguage]]}
              onChange={(newCode) => {
                setCode(newCode);
                handleCodeChange(newCode);
              }}
              className="code-mirror-editor"
            />

          </div>
          <div className="console-area">
            <h3>Console/Terminal/Output</h3>
            <pre>{consoleOutput}</pre>
          </div>
        </div>

        {/* Right Section */}
        <div className="right-section">
          <div className="chat-section">
            <div className="chat-header">
              <h3>AI Chat</h3>
              <select defaultValue="english" className="chat-language-select">
                <option value="english">English</option>
                <option value="spanish">Spanish</option>
                <option value="french">French</option>
              </select>
            </div>
            <div className="chat-response">{chatResponse}</div>
            <div className="chat-input">
              <textarea
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                onKeyDown={handleSendMessage}
                placeholder="Ask questions about your code... (Press Enter to send, Shift+Enter for new line)"
              />
              <button onClick={() => handleSendMessage()}>Send</button>
            </div>
          </div>
          <div className="explanation-section">
            <h3>Live Code Explanation</h3>
            <div className="explanation-content">
              {codeExplanation}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;