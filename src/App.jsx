import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import upImg from './assets/up.png'
import upArrow from './assets/up-arrow.png'
import upNew from './assets/upNew.png'
import './App.css'
const App = () => {
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState(null)

  // make request
  async function generateAnswer() {
    setAnswer('loading...')
    setQuestion('')
    const response = await axios({
      url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${import.meta.env.VITE_API_KEY}`,
      method: 'post',
      data: { contents: [{ parts: [{ text: question }] }] }
    })
    setAnswer(response.data.candidates[0].content.parts[0].text)
    console.log(response)
  }

  return (
    <div className='app-container'>
      <h1 className='title'>CHAT-AI</h1>
      <div className="app">
        <div className="answer">
          <p>{!answer?"Hello there! How can I assist you today?":answer}</p>
        </div>
        <div className="prompt">
          <input className='input-box'

            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Enter your question here..."
          />
          <button className='btn'

            onClick={generateAnswer}
          >
            <img className='image' src={upNew} alt="" />
          </button>

        </div>
      </div>
    </div>
  )
}

export default App
