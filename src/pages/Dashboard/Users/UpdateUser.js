import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function UpdateUser() {

  const id = window.location.pathname.split('/').slice(-1)[0];
  const [balance,setBalance] =useState('')
  const nav = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:9982/Users/${id}`,{
      withCredentials: true
    }).then((data) => {
      setBalance(data.data.balance);
    })
  }, [])

  async function submit(e){
		e.preventDefault();
		try {
			await axios.patch(`http://localhost:9982/users/update-balance/${id}`, {
				balance: balance,
			},{
        withCredentials: true
      });
			nav(`/dashboard/users/info/${id}`);
		}catch(err) {
      console.log(err)
		}
	}

  return (
    <div className='createUser'>
      <div className='container'>
        <div className='parent'>
          <form onSubmit={submit} className='card'>
            <h1>Edit the Balance</h1>
            <label htmlFor="bal">Balance: </label>
            <input id="bal" type='text' placeholder='Balance...' value={balance} onChange={(e) => setBalance(e.target.value)} required/>
            <button type='submit'>Edit</button>
          </form>
        </div>
      </div>
    </div>
  )
}
