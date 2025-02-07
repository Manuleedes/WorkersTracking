import React,{useEffect,useState} from 'react';
import axios from 'axios'
import {Link} from 'react-router-dom'

const Cartegory = () => {
  const [cartegory,setCartegory ]= useState([])
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
  return (
    <div className='px-5 mt-3'>
      <div className='d-flex justify-content-center'>
        <h3>
          Cartegory List
        </h3>
      </div>
      <Link to="/dashboard/add_cartegory" className='btn btn-success'>Add Cartegory</Link>
      <div className='mt-3'>
        <table className='table'>
          <thead>
            <tr>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
                {
                  cartegory.map(c => (
                    <tr>
                      <td>{c.name}</td>
                    </tr>
                  ))
                }
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Cartegory;
