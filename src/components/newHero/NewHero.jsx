import React from 'react'
import './NewHero.css'
import { Link } from 'react-router-dom'
import moment from 'moment';
import ScrollAnimation from '../scroll/ScrollAnimation'
export default function NewHero({user}) {
  const plan = JSON.parse(localStorage.getItem("plan"));
  const endDate = moment(plan?.endDate);
  const remainingMonths = endDate.diff(moment(), 'months');
  const remainingDays = endDate.diff(moment().add(remainingMonths, 'months'), 'days');
  return (
    <div className='newHero'>
      {/* <div className='circles1'>interaction</div>
      <div className='circles2'>try once</div>
      <div className='circles3'>subscribe</div> */}
      <div className='containerHero'>
        <div className='smallContainer'>
        <h1 className='title1'>منصة فنان التعليميه</h1>
        <h2 className='title2'>جميع الدروس والدورات مجانية</h2>
        {/* {user ? (null):(<Link to="/auth"><button className='button1'>سجل الآن مجاناً</button></Link>)} */}
        </div>
          <div  className='smallContainer'>
            {!user ? (<Link to="/auth"><button className='button2'>سجل الآن مجاناً</button></Link>):(<>{user?.role === "teacher" || user?.role === 'admin' && <Link to={`/mystudents/${user?._id}`}><button className='button2'>المشتركين</button></Link>}</>)}
            { user?.subscriptionPlan && plan?.status === "active" && <Link to="/subscription"><button className='button2'>{remainingMonths > 0 && (
            <h5>
              باقي
              {' '}
              {remainingMonths} {remainingMonths === 1 ? 'شهر' : 'اشهر'}
              {' و'}
              {remainingDays} {remainingDays === 1 ? 'يوم' : 'ايام'}  للاشتراك
            </h5>
          )}</button></Link>}
          {user && !user.subscriptionPlan && user.role !== 'admin' && user.role !== 'teacher' && <Link to="/subscription"><button  className='button3'>اشتراك</button></Link>}
         {/* {user?.user?.status === "noTrial" && <Link to="/subscription" style={{ textDecoration: "none" }}>
        <button className='button2'>ابدأ تجربتك المجانية لمدة 7 ايام</button></Link>} 
        {user?.user?.status === "trial" && <button className='button2'> باقي {user?.user?.daysLeft} ايام للاشتراك المجاني</button>}
        {user?.user?.status === "trialEnd" && <button className='button2'>اشترك الآن</button>} */}
        {/* {user?.teacher?._id && <Link to={`/mystudents/${user?._id}`}><button className='button2'>المشتركين</button></Link>} */}

      <div className='bottomText'>
        دروس خصوصية غير محدودة بسعر 110 شيكل شهرياً - فترة تجريبية مجانية لمدة 7 أيام
      </div>
      <ScrollAnimation/>
      </div>
        </div>
        
    </div>
  )
}
