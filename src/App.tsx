import { Routes, Route } from 'react-router-dom'
import { Layout } from './components/Layout'
import { Home } from './pages/Home'
import { Softmax } from './pages/Softmax'
import { Attention } from './pages/Attention'
import { Transformer } from './pages/Transformer'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/softmax" element={<Softmax />} />
        <Route path="/attention" element={<Attention />} />
        <Route path="/transformer" element={<Transformer />} />
      </Routes>
    </Layout>
  )
}

export default App
