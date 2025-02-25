import './App.css'
import { Login } from './Components/Login'
import Register from './Components/Register';
import {Task} from './Components/Task'
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";

function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/Task' element={<Task/>}/>
      </Routes>
    </Router>
    </>
  )
}

export default App
