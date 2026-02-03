import React from 'react'
import { Routes, Route } from 'react-router-dom'
import CreateRoom from './pages/CreateRoom'
import JoinRoom from './pages/JoinRoom'
const App = () => {


  return (
    <>
    <Routes>
      <Route path='/' element={<CreateRoom/>}/>
    <Route path="/room/join/:roomId" element={<JoinRoom />} />
    </Routes>
    </>
  )
}

export default App