import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { io } from 'socket.io-client'
import { useParams } from 'react-router-dom'
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const JoinRoom = () => {
  const { roomId } = useParams()
  const [message, setMessage] = useState('')
  const [chat, setChat] = useState([])
  const [socket, setSocket] = useState(null)
  const [status, setStatus] = useState('Connecting...')
  const messagesRef = useRef(null)

  useEffect(() => {
    let s
    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        try {
          const res = await axios.post(
            `${BACKEND_URL}/room/join/${roomId}`,
            {
              lat: coords.latitude,
              long: coords.longitude
            }
          )

          if (res.data.message === 'allowed') {
            s = io(BACKEND_URL)
            s.emit('join-room', roomId)
            s.on('receive-message', (msg) =>
              setChat((prev) => [...prev, { text: msg, self: false }])
            )
            setSocket(s)
            setStatus('Connected')
          } else {
            setStatus('Outside allowed range')
          }
        } catch {
          setStatus('Failed to join')
        }
      },
      () => setStatus('Location error')
    )

    return () => {
      if (s) {
        s.off('receive-message')
        s.disconnect()
      }
    }
  }, [roomId])

  useEffect(() => {
    messagesRef.current?.scrollTo({
      top: messagesRef.current.scrollHeight,
      behavior: 'smooth'
    })
  }, [chat])

  const sendMessage = (e) => {
    e.preventDefault()
    if (!socket || !message.trim()) return
    socket.emit('send-message', { roomId, message })
    setChat((prev) => [...prev, { text: message, self: true }])
    setMessage('')
  }
  return (
  <div className="min-h-screen bg-gradient-to-br from-indigo-200 via-blue-200 to-purple-200 flex items-center justify-center p-4">
    <div className="w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col">

      {/* HEADER */}
      <header className="px-6 py-5 bg-gradient-to-r from-indigo-700 to-blue-600 text-white flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-wide">Live Room</h1>
          <p className="text-xs opacity-80 mt-1">Room ID · {roomId}</p>
        </div>

        <span
          className={`px-4 py-1.5 text-xs rounded-full font-semibold tracking-wide shadow-md
            ${status === 'Connected'
              ? 'bg-green-500 shadow-green-400/60'
              : 'bg-yellow-500'
            }`}
        >
          {status}
        </span>
      </header>

      {/* CHAT */}
      <div
        ref={messagesRef}
        className="flex-1 overflow-y-auto px-8 py-6 space-y-4 bg-gradient-to-b from-gray-50 to-gray-100"
      >
        {chat.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-gray-500">
            <div className="text-5xl mb-4">💬</div>
            <p className="text-sm">No messages yet</p>
            <p className="text-xs opacity-70 mt-1">Start the conversation</p>
          </div>
        ) : (
          chat.map((item, idx) => (
            <div
              key={idx}
              className={`flex ${item.self ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[65%] px-4 py-2 rounded-2xl text-sm shadow-sm
                  ${item.self
                    ? 'bg-indigo-600 text-white rounded-br-none'
                    : 'bg-white text-gray-800 rounded-bl-none'
                  }`}
              >
                {item.text}
              </div>
            </div>
          ))
        )}
      </div>

      {/* INPUT */}
      <form
        onSubmit={sendMessage}
        className="px-6 py-4 bg-white border-t flex gap-3"
      >
        <input
          type="text"
          placeholder={
            status === 'Connected'
              ? 'Type a message…'
              : 'You are not connected'
          }
          className="flex-1 rounded-full px-5 py-3 text-sm bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={status !== 'Connected'}
        />

        <button
          type="submit"
          disabled={status !== 'Connected'}
          className={`px-6 rounded-full font-semibold text-sm transition
            ${status === 'Connected'
              ? 'bg-indigo-600 text-white hover:bg-indigo-700'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
        >
          Send
        </button>
      </form>
    </div>
  </div>
)

}

export default JoinRoom
