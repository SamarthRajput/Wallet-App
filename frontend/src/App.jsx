//whenever we are doing the frontend development we want to break the app down to smaller components and build those smaller components 
import { Signup } from './pages/Signup'
import { Signin } from './pages/Signin'
import { Dashboard } from './pages/Dashboard'
import { SendMoney } from './pages/SendMoney'
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/signup' element={ <Signup />}></Route>
          <Route path='/signin' element={ <Signin />}></Route>
          <Route path='/dashboard' element={ <Dashboard />}></Route>
          <Route path='/send' element={ <SendMoney />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
