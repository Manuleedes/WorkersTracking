import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddEmployee = () => {

  const [employee, setEmployee] = useState({
    name: "",
    email: '',
    password: '',
    salary: '',
    address: '',
    cartegory_id: '',
    image: ''
  })
  const [cartegory,setCartegory ]= useState([]) 
  const navigate = useNavigate()
  useEffect(()=>{
      axios.get('http://localhost:3000/auth/cartegory')
      .then(result =>{
        if(result.data.Status){
          setCartegory(result.data.Result)
        }else{
          alert(result.data.Error)
        }
      }).catch(err => console.log(err))
  },[])

  const handleSubmit = (e)=>{
    e.preventDefault()
    const formData= new formData();
    formData.append('name',employee.name)
    formData.append('email',employee.email)
    formData.append('password',employee.password)
    formData.append('address',employee.address)
    formData.append('salary',employee.salary)
    formData.append('image',employee.image)
    formData.append('cartegory_id',employee.cartegory_id)


    axios.post('http://localhost:3000/auth/add_employee',formData)
    .then(result => {
      if(result.data.Status){
        navigate('/dashboard/employee')
      }else{
        alert(result.data.Error)
      }
    })
    .catch(err => console.log(err))
  }
  return (
<div className='d-flex justify-content-center align-items-center mt-3'>
  <div className='p-3 rounded w-50 border'>
    <h3 className='text-center'>Add Employee</h3>
    <form className='row g-1' onSubmit={handleSubmit}>
      <div className='col-12'>
        <label htmlFor="inputName" className='form-label'>Name</label>
        <input type="text" className='form-control rounded-0' id='inputName' placeholder='Enter Name'
        onChange={(e)=> setEmployee({...employee,name: e.target.value})}/>
      </div>
      <div className='col-12'>
        <label htmlFor="inputEmail4" className='form-label'>Email</label>
        <input type="email"className='form-control rounded-0' id='inputEmail4'
         placeholder='Enter Email' autoComplete='off' 
          onChange={(e)=> setEmployee({...employee,email: e.target.value})}/>
      </div>
      <div className='col-12'>
        <label htmlFor="inputPassword4" className='form-label'>Password</label>
        <input type="password"className='form-control rounded-0' id='inputPassword4'
         placeholder='Enter Password' onChange={(e)=> setEmployee({...employee,password: e.target.value})} />
      </div>
      <div className='col-12'>
      <label htmlFor="inputSalary" className='form-label'>Salary</label>
         <input type="text"className='form-control rounded-0' id='inputSalary'
         placeholder='Enter Salary' autoComplete='off'  
         onChange={(e)=> setEmployee({...employee,salary: e.target.value})} />
      </div>
      <div className='col-12'>
      <label htmlFor="inputAddress" className='form-label'>Address</label>
      <input type="text"className='form-control rounded-0' id='inputAddress'
         placeholder='1234 Main St' outoComplete="off" 
         onChange={(e)=> setEmployee({...employee,address: e.target.value})} />
      </div>
      <div className='col-12'>
      <label htmlFor="inputAddress" className='form-label'>Cartegory</label>
      <select name="cartegory" id="cartegory" className='form-select' 
      onChange={(e)=> setEmployee({...employee,cartegory_id: e.target.value})}>
      {cartegory.map(c=> {
        return <option value={c.id}>{c.name}</option>
      })}
      </select>
      </div>


      <div className='col-12 mb-3'>
      <label htmlFor="inputGroupFile01" className='form-label'>Select Image</label>
         <input type="file"className='form-control rounded-0' name='image' id="inputGroupFile01"
         placeholder='Enter Salary' autoComplete='off'  
         onChange={(e)=> setEmployee({...employee,image: e.target.files[0]})} />
      </div>
      <div className='col-12'>
        <button type='submit' className='btm btn-primary w-100'>Add Employee</button>
      </div>
      
    </form>

  </div>

</div>



  );



  


}

export default AddEmployee;
