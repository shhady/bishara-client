import React from 'react'
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
export default function SpecificPractice() {
    const {id} = useParams()
    console.log(id)
    useEffect(()=>{
        const fetch= async()=>{
            const res = await axios.get(
                process.env.REACT_APP_BACKEND_URL + `/practice/${id}`
              );
              console.log(res)
        }
        fetch()
        
        
    },[id])
    
  return (
    <div style={{marginTop:"200px"}}>SpecificPractice</div>
  )
}
