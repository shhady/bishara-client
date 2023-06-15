import React from 'react'
import './NewHero.css'
import { Link } from 'react-router-dom'
import ScrollAnimation from '../scroll/ScrollAnimation'
export default function NewHero({user}) {
  return (
    <div className='newHero'>
      <div className='containerHero'>
        <div className='smallContainer'>
        <h1 className='title1'>منصة فنان التعليميه</h1>
        <h2 className='title2'>جميع الدروس والدورات مجانية</h2>
        {user ? (null):(<Link to="/auth"><button className='button1'>سجل الآن مجاناً</button></Link>)}
        </div>
          <div  className='smallContainer'>
          <button className='button2'>ابدأ تجربتك المجانية لمدة 7 ايام</button>
      <div className='bottomText'>
        دروس خصوصية غير محدودة بسعر 125 شيكل شهرياً - فترة تجريبية مجانية لمدة 7 أيام
      </div>
      <ScrollAnimation/>
      </div>
        </div>
        
    </div>
  )
}
