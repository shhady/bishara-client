import React from 'react'
import './NewHero.css'
import { Link} from "react-router-dom";

export default function NewHero() {
  return (
    <div className='newHero'>
        <div className='circlesWrapper'>
        <Link to="/courses" style={{textDecoration:"none", color:"black"}}>
        <div className='circlesHero'>
        دورات  
        <br/>
        مجانية
        </div>
        </Link>
        <Link to="/messenger" style={{textDecoration:"none", color:"black"}}>
        <div className='circlesHero1'>
        مراسلة <br/>الاستاذ 
                </div>
                </Link>
        <div className='circlesHero'>
        دروس <br/>خصوصية        </div>
        <Link to="/zoom" style={{textDecoration:"none", color:"black"}}>
        <div className='circlesHero1'>
        نشرات <br/>مباشرة         </div>
        </Link>
        <div className='circlesHero'> 
        تعليق <br/>على عزفك
         </div>
         </div>
    </div>
  )
}
