import React, { useEffect, useState } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import axios from 'axios';

export default function RequireAuth() {

  const [acc, setAcc] = useState(true);

  useEffect(() => {
    const Data = async () => {
      try {
        await axios.get('http://localhost:9982/Users/current',{
          withCredentials: true
        })
        .then((data) => { setAcc(data.data.is_admin)})
      }catch(err) {
        console.log(err)
      }
    };
    Data();
  },[acc])
  const location = useLocation();
  return(
    <>
      {acc ? (<Outlet /> ):(<Navigate state={{from: location}} replace to="/login" /> )}
    </>
  )
}
