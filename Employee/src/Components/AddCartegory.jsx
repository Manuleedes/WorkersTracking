import React, { useState } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'

const AddCartegory = () => {
  const [cartegory, setCartegory] = useState()
  const navigate = useNavigate()

  const handleSubmit =(e)=> {
    e.preventDefault()
    axios.post('http://localhost:3000/auth/add_cartegory',{cartegory})
    .then(result => {
      if(result.data.Status){
        navigate('/dashboard/cartegory')
      }else{
        alert(result.data.Error)
      }
    })
    .catch(err => console.log(err))
  }
  return(
    <div className='d-flex justify-content-center align-items-center h-75'>
    <div className='p-3 rounded w-25 border'>
      <h2>Add Cartegory</h2>
      <form action="" onSubmit={handleSubmit}>
          <div className='mb-3'>
              <label htmlFor="cartegory"><strong>Cartegory:</strong></label>
              <input type="text" name='cartegory' placeholder='Enter Cartegory' 
              onChange={(e)=>setCartegory(e.target.value) }  
              className='form-control rounded-0' />
          </div>
          <button className='btn btn-success w-100 rounded-0 mb-2'>Add Cartegory</button>
      </form>
    </div>
  </div>
  );
}

export default AddCartegory;
