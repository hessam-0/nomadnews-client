import { useState } from 'react'
import './App.css'
import ArticleList from './components/ArticleList'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='app'>
        <ArticleList/>
      </div>
    </>
  )
}

export default App
