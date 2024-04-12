import React, { useState } from 'react';
import Anthropic from '@anthropic-ai/sdk';


function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const anthropic = new Anthropic({
    apiKey: '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',
  });

  // const callAnthropicAPI = async (prompt) => {
  //   const proxyUrl = 'http://localhost:8080/';
  //   const apiUrl = 'https://api.anthropic.com/v1/complete';
  
  //   try {
  //     const response = await fetch(`${proxyUrl}${apiUrl}`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'x-api-key': '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',
  //         'anthropic-version': '2023-04-02',
  //       },
  //       body: JSON.stringify({
  //         model: 'claude-3-opus-20240229',
  //         max_tokens: 1024,
  //         messages: [{ role: 'user', content: prompt }],
  //       }),
  //     });
  
  //     const data = await response.json();
  //     console.log(data.result);
  //     return data.result.message.content;
  //   } catch (error) {
  //     console.error('Error calling Anthropic API:', error);
  //     return 'Error occurred while calling the Anthropic API.';
  //   }
  // };

  const callAnthropicAPI = async (prompt) => {
    await anthropic.messages.create({
      model: "claude-3-opus-20240229",
      max_tokens: 1024,
      messages: [
        {"role": "user", "content": "Hello, world"}
      ]
    });
  


  const sendMessage = () => {
    if (input.trim() === '') return;
  
    callAnthropicAPI(input)
      .then((response) => {
        const newMessage = { text: response, sender: 'bot' };
        setMessages([...messages, newMessage]);
      })
      .catch((error) => {
        console.error('Error calling Anthropic API:', error);
      });
  
    const userMessage = { text: input, sender: 'user' };
    setMessages([...messages, userMessage]);
    setInput('');
  };

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.sender}`}>
            {message.text}
          </div>
        ))}
      </div>
      <input
        type="text"
        placeholder="Type a message..."
        value={input}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default Chat;