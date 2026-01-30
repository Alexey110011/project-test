/*import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
*/
//import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import './App.css'
// import { ThemeProvider, createTheme } from '@mui/material/styles'
// import  CssBaseline  from '@mui/material/CssBaseline'
import { Routes, Route} from 'react-router-dom'
import Detail from "./components/Detail";
import {Feed/*, LabTabs*/} from "./components/Feed";
// import { PaginatedItems } from './components/Pagination';
// import Product from './components/Product';
import Search from './components/Search';
import Basket from './components/Basket'
// const darkTheme = createTheme({
//   palette: {
//     mode: "dark"
//   }
//})
function App() {
  return (
    <>
       <Routes>
        <Route path='/' element={<Feed />} />
        <Route path='/basket' element={<Basket />} />
        <Route path='/detail/:id' element={<Detail />} />
        <Route path='/search' element={<Search />} />
      </Routes>
    </>
  )
}

export default App
