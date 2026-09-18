import { useState, useEffect, useRef } from 'react'

function App() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const wsRef = useRef(null)

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:3000')
    wsRef.current = ws

    ws.onmessage = (event) => {
      setMessages(prev => [...prev, event.data])
    }

    ws.onopen = () => console.log('Connected to backend')

    return () => ws.close()
  }, [])

  const sendMessage = () => {
    if (input.trim() === '') return
    wsRef.current.send(input)
    setInput('')
  }

  return (
    <div style={{ maxWidth: 500, margin: '40px auto', fontFamily: 'sans-serif' }}>
      <h2>EmergencyCom</h2>
      <div style={{ border: '1px solid #ccc', height: 300, overflowY: 'auto', padding: 10, marginBottom: 10 }}>
        {messages.map((msg, i) => <div key={i}>{msg}</div>)}
      </div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        placeholder="Type a message..."
        style={{ width: '80%' }}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  )
}

export default App