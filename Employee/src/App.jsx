import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Login from './Components/Login'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Dashboard from './Components/Dashboard'
import Home from './Components/Home'
import Employee from './Components/Employee'
import Cartegory from './Components/Cartegory'
import Profile from './Components/Profile'
import AddCartegory from './Components/AddCartegory'
import AddEmployee from './Components/AddEmployee'
import EditEmployee from './Components/EditEmployee'
function App() {

  return (

    <BrowserRouter>
    <Routes>
      <Route path='/adminlogin' element={<Login/>}>
      </Route>
        <Route path='/dashboard' element={<Dashboard/>}>
        <Route path='' element={<Home/>}></Route>
        <Route path='/dashboard/employee' element={<Employee/>}></Route>
        <Route path='/dashboard/cartegory' element={<Cartegory/>}></Route>
        <Route path='/dashboard/profile' element={<Profile/>}></Route>
        <Route path='/dashboard/add_cartegory' element={<AddCartegory/>}></Route>
        <Route path='/dashboard/add_employee' element={<AddEmployee/>}></Route>
        <Route path='/dashboard/edit_employee/:id' element={<EditEmployee/>}></Route>

      </Route>

    </Routes>
 
    </BrowserRouter>
  )

}

export default App
