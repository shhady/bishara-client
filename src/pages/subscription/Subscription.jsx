import React,{useEffect, useState} from 'react'
import "./subscription.css"
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
export default function Subscription({user}) {
  const navigate = useNavigate()
  const [theUser, setTheUser] = useState()
  console.log(theUser);

  useEffect(()=>{
    const getData = async ()=>{
      const result = await axios.get(process.env.REACT_APP_BACKEND_URL + `/users/${user?._id}`)
      setTheUser(result.data);
    }
    getData()
  },[user])

  return (
    <div className='container'>
     <h1 className='titleSubscription'>استمتع بفترة تجريبية مجانية لمدة 7 أيام</h1>
     <div className='textSubscriptionContainer'>
     <div className='textSubscription'>دروس خصوصية غير محدودة مع مدرس خاص</div>
     <div className='textSubscription'>*منهاج خاص بك</div>
     <div className='textSubscription'>ضمان الرضا الكامل لمدة ٣٠ يومًا</div>
     <div className='textSubscription'>الحصول على أكثر من 500 درس ودورات</div>
     <div className='textSubscription'>ملفات للتمارين والنوتة</div>
     <div className='textSubscription'>دروس زوم (zoom)جماعية</div>
     {/* <div className='textSubscription'>* لتحقيق النتائج المرغوبة, يجب على الفرد ان يلتزم بالدراسة لمدة لا تقل عن 6 اشهر</div> */}
     </div>
     <div className='colorful'>
      استفد من أفضل قيمة ممكنة
     </div>
     <div className='plans'>
      <div className='plan'><h2 className='titleSubscription' >ستة أشهر</h2>
      شهري/ <strong>199₪</strong> <span style={{color:"red", margin:"10px"}}><s><strong>299₪</strong></s></span>
      <div className='invoiceLine'>فاتورة 6 أشهر 1194 شيكل</div>
      <div className='textSubscription6'>* لتحقيق النتائج المرغوبة, يجب على الفرد ان يلتزم بالدراسة لمدة لا تقل عن 6 اشهر</div>
      <button className='Months6Btn'>ستة أشهر</button>
      </div>
      <div className='plan'  id='secondPlan'><h2 className='titleSubscription'>سنوي</h2>
      شهري/ <strong>125₪</strong> <span style={{color:"red", margin:"10px"}}><s><strong>209₪</strong></s></span>
      <div  className='invoiceLine'>فاتورة سنوية 1500 شيكل</div>
      <div style={{fontWeight:"bold" ,padding:"10px 30px"}}> اجعل الموسيقى من اولوياتك لمدة 365 يوماً القادمة</div>
      <div style={{fontWeight:"bold",padding:"10px 30px"}}>وفر الكثير مع الرزمة الاكثر شيوعاً</div>
      <div style={{fontWeight:"bold",padding:"10px 30px"}}  className='invoiceLine'>ستندهش مما يمكن ان يفعله عام باستخدام منصة فنان</div>

      <button className='Months12Btn'>اختر سنوي</button>
      </div>
      <div className='plan'><h2 className='titleSubscription'>مجاناً</h2>
      شهري/ <strong>0₪</strong> <span style={{color:"red", margin:"10px"}}><s><strong>65₪</strong></s></span>
      <div className='invoiceLine'>لا يوجد فاتورة</div>
      <div style={{fontWeight:"bold",padding:"10px 30px"}}  className='invoiceLine'>الدروس والدورات <br/>مراسلة الاستاذ<br/>فيديوهات عزف الفنانين<br/>نشرات شهريه</div>
      {theUser?.status === 'trial' ? (<div style={{fontWeight:"bold", color:"red", padding:"10px"}}> باقي {theUser?.daysLeft} ايام للاشتراك المجاني  </div>):(null)}
      {theUser?.status === 'trialEnd' ? (<div  style={{fontWeight:"bold", color:"red", padding:"10px"}}>انتهى الاشتراك المجاني</div>):(null)}
      {theUser?.status == "noTrial"  ? (<button className='Months6Btn' onClick={()=>navigate('/chooseTeacher')}>سجل مجاناً</button>):(null )}
     
      
     {/* add days left here  */}
      </div>
     </div>
    </div>
  )
}
