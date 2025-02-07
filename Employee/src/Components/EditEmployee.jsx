import axios from 'axios';
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';



const EditEmployee = () => {
  const {id} = useParams()

  const [employee, setEmployee] = useState({
    name: "",
    email: '',
    salary: '',
    address: '',
    cartegory_id: ''
  
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
    axios.get('http://localhost:3000/auth/employee/'+id)
    .then(result =>{
      setEmployee({
        ...employee,
        name: result.data.Result[0].name,
        email: result.data.Result[0].email,
        address: result.data.Result[0].address,
        salary: result.data.Result[0].salary,
        cartegory_id: result.data.Result[0].cartegory_id
      })
    }).catch(err => console.log(err))
},[])

const handleSubmit= (e) =>{
  e.preventDefault()
  axios.put('http://localhost:3000/auth/edit_employee/'+id,employee)
  .then(result =>{
    if(result.data.Status){
      navigate('/dashboard/employee')
    }else{
      alert(result.data.Error)
    }
  }).catch(err => console.log(err))
}

  return (
    <div className='d-flex justify-content-center align-items-center mt-3'>
    <div className='p-3 rounded w-50 border'>
      <h3 className='text-center'>Edit Employee Data</h3>
      <form className='row g-1' onSubmit={handleSubmit}>
        <div className='col-12'>
          <label htmlFor="inputName" className='form-label'>Name</label>
          <input type="text" className='form-control rounded-0' value={employee.name} id='inputName' placeholder='Enter Name'
          onChange={(e)=> setEmployee({...employee,name: e.target.value})}/>
        </div>
        <div className='col-12'>
          <label htmlFor="inputEmail4" className='form-label'>Email</label>
          <input type="email"className='form-control rounded-0' id='inputEmail4'
           placeholder='Enter Email' autoComplete='off' value={employee.email}
            onChange={(e)=> setEmployee({...employee,email: e.target.value})}/>
        </div>
        <div className='col-12'>
        <label htmlFor="inputSalary" className='form-label'>Salary</label>
           <input type="text"className='form-control rounded-0' id='inputSalary'
           placeholder='Enter Salary' autoComplete='off' value={employee.salary}
           onChange={(e)=> setEmployee({...employee,salary: e.target.value})} />
        </div>
        <div className='col-12'>
        <label htmlFor="inputAddress" className='form-label'>Address</label>
        <input type="text"className='form-control rounded-0' id='inputAddress'
           placeholder='1234 Main St' outoComplete="off" value={employee.address} 
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
        <div className='col-12'>
          <button type='submit' className='btm btn-primary w-100'>Edit Employee</button>
        </div>
        
      </form>
  
    </div>
  
  </div>
  );
}

export default EditEmployee;
