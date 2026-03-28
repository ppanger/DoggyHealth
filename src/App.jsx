import React, { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Questionnaire from './pages/Questionnaire'
import Report from './pages/Report'
import useStore from './store/useStore'

function App() {
  const { loadHistory } = useStore()
  
  useEffect(() => {
    loadHistory()
  }, [])

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/questionnaire" element={<Questionnaire />} />
      <Route path="/report" element={<Report />} />
    </Routes>
  )
}

export default App