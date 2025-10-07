import { useState } from 'react'
import PermutationGenerator from './component/PermutationGenerator'


function App() {
  const [count, setCount] = useState(0)

  return (
   <PermutationGenerator/>
  )
}

export default App
