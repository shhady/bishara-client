import React from 'react'
import './NewHero.css'
import { Link } from 'react-router-dom'
import ScrollAnimation from '../scroll/ScrollAnimation'
export default function NewHero({user}) {
  console.log(user);
  return (
    <div className='newHero'>
      <div className='containerHero'>
        <div className='smallContainer'>
        <h1 className='title1'>منصة فنان التعليميه</h1>
        <h2 className='title2'>جميع الدروس والدورات مجانية</h2>
        {user ? (null):(<Link to="/auth"><button className='button1'>سجل الآن مجاناً</button></Link>)}
        </div>
          <div  className='smallContainer'>
            {!user ? (<Link to="/auth"><button className='button2'>ابدأ تجربتك المجانية لمدة 7 ايام</button></Link>):(null)}
         {user?.user?.status === "noTrial" && <Link to="/subscription" style={{ textDecoration: "none" }}>
        <button className='button2'>ابدأ تجربتك المجانية لمدة 7 ايام</button></Link>} 
        {user?.user?.status === "trial" && <button className='button2'> باقي {user?.user?.daysLeft} ايام للاشتراك المجاني</button>}
        {user?.user?.status === "trialEnd" && <button className='button2'>اشترك الآن</button>}
        {user?.teacher?._id && <Link to={`/mystudents/${user?.teacher?._id}`}><button className='button2'>المشتركين</button></Link>}

      <div className='bottomText'>
        دروس خصوصية غير محدودة بسعر 125 شيكل شهرياً - فترة تجريبية مجانية لمدة 7 أيام
      </div>
      <ScrollAnimation/>
      </div>
        </div>
        
    </div>
  )
}
