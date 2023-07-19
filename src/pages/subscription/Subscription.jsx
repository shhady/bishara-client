import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';
import moment from 'moment';
import "./subscription.css";
import Payment from "../payment/Payment"
import { Link } from "react-router-dom";
import Tcs from '../../components/t&cs/Tcs';
const Subscription = ({ user, setUser }) => {
  const [selectedTeacherYear, setSelectedTeacherYear] = useState(null);
  const [selectedTeacher6Months, setSelectedTeacher6Months] = useState(null);
  const [teachers, setTeachers] = useState([]);
  const plan = JSON.parse(localStorage.getItem("plan"));
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [period, setPeriod] = useState(null);
  const [TcsShow, setTcsShow] = useState("Tcs")
  const [showTeacherRequied, setShowTeacherRequied] = useState(null)
  // const plan = null
  // const endDate = moment(plan?.endDate);
  const endDate = moment().subtract(5, 'days');
  const remainingMonths = endDate.diff(moment(), 'months');
  const remainingDays = endDate.diff(moment().add(remainingMonths, 'months'), 'days');
  
  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/teachers`);
        setTeachers(response.data);
      } catch (error) {
        console.error('Failed to fetch teachers:', error);
      }
    };

    fetchTeachers();
  }, []);

  const handleTeacherSelectYear = (teacher) => {
    setSelectedTeacherYear(teacher);
  };

  const handleTeacherSelect6Months = (teacher) => {
    setSelectedTeacher6Months(teacher);
  };

  // const handleSubscriptionUpdate = async (period) => {
  //   let selectedTeacher = null;

  //   if (period === 'year') {
  //     selectedTeacher = selectedTeacherYear;
  //   } else if (period === '6 months') {
  //     selectedTeacher = selectedTeacher6Months;
  //   }

  //   if (selectedTeacher) {
  //     console.log(period);
  //     try {
  //       const token = localStorage.getItem('token');
  //       const response = await axios.put(
  //         `${process.env.REACT_APP_BACKEND_URL}/subscription-plans/${plan?._id}`,
  //         {
  //           period: period,
  //           teacherName: selectedTeacher.name,
  //           teacherId: selectedTeacher.value,
  //         },
  //         {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //           },
  //         }
  //       );
  //       console.log(response);
  //       window.localStorage.setItem('plan', JSON.stringify(response.data));
  //       setSelectedTeacherYear(null);
  //       setSelectedTeacher6Months(null);
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   }
  // };

  const handleSubscriptionSubmit = async () => {
    
    console.log(period);
    let selectedTeacher = null;

    if (period === 'year') {
      selectedTeacher = selectedTeacherYear;
    } else if (period === '6 months') {
      selectedTeacher = selectedTeacher6Months;
    }

    if (selectedTeacher) {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/subscription-plans`,
          {
            period: period,
            teacherId: selectedTeacher.value,
            userId: user._id,
            userName: `${user.firstName} ${user.lastName}`,
            teacherName: selectedTeacher.name
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const result = await axios.patch(
          `${process.env.REACT_APP_BACKEND_URL}/users/${user._id}`,
          {
            subscriptionPlan: response.data._id,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        window.localStorage.setItem("profile", JSON.stringify(result.data));
        console.log('Subscription plan:', result.data);
        console.log('Subscription plan created:', response.data);
        window.localStorage.setItem('plan', JSON.stringify(response.data));
        setUser(result.data);
        // Reset selected values
        setSelectedTeacherYear(null);
        setSelectedTeacher6Months(null);
      } catch (error) {
        if (error.response) {
          console.error('Failed to create subscription plan:', error.response.data);
        } else {
          console.error('Failed to create subscription plan:', error.message);
        }
      }
      try {
        const token = localStorage.getItem('token');
        const response = await axios.put(
          `${process.env.REACT_APP_BACKEND_URL}/subscription-plans/${plan?._id}`,
          {
            period: period,
            teacherName: selectedTeacher.name,
            teacherId: selectedTeacher.value,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response);
        window.localStorage.setItem('plan', JSON.stringify(response.data));
        setSelectedTeacherYear(null);
        setSelectedTeacher6Months(null);
      } catch (e) {
        console.log(e);
      }
    }
  };

  const teacherOptions = teachers.map((teacher) => ({
    value: teacher._id,
    name: teacher.firstName + ' ' + teacher.lastName,
    label: (
      <div style={{ display: "flex", justifyContent: 'flex-start', alignItems: "center" }}>
        <img src={teacher.avatar} alt={teacher.firstName} width={50} height={50} style={{ borderRadius: "50%" }} />
        <span style={{ color: 'black' }}>{`${teacher.firstName} ${teacher.lastName} - ${teacher.instrument}`}</span>
      </div>
    ),
  }));

  return (
    <div>
     {isPopupOpen ?  <> {TcsShow === "Tcs" ? <div style={{marginTop:"100px", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center"}}><div><Tcs/></div><div className='TcsBtns'><button onClick={()=>setTcsShow("payment")} className='TcsBtn'>موافق</button><button className='TcsBtn' onClick={()=>setIsPopupOpen(null)} >غير موافق</button></div> </div>:<><button style={{marginTop:"100px"}} onClick={()=>setIsPopupOpen(null)} className='TcsBtn'>صفحة الاشتراك</button><Payment user={user} handleSubscriptionSubmit={handleSubscriptionSubmit} period={period} selectedTeacher={selectedTeacherYear ?selectedTeacherYear:selectedTeacher6Months} setIsPopupOpen={setIsPopupOpen}/></>}</> : 
     <><div className='subscriptionPage'>
      <h1 className='titleSubscription'>استمتع بتجربة مجانية واحدة قبل الاشتراك</h1>
      <div className='textSubscriptionContainer'>
        <div className='textSubscription'>دروس خصوصية غير محدودة مع مدرس خاص</div>
        <div className='textSubscription'>*منهاج خاص بك</div>
        <div className='textSubscription'>الحصول على أكثر من 500 درس ودورات</div>
        <div className='textSubscription'>ملفات للتمارين والنوتة</div>
        <div className='textSubscription'>دروس زوم (zoom)جماعية</div>
      </div>
      <div className='plansContainer'>
        <div className='plan1'>
          <div className='colorful'>
            استفد من أفضل قيمة ممكنة
          </div>
          <h2 className='titleSubscription'>سنوي</h2>
          شهري/ <strong>125₪</strong> <span style={{ color: "red", margin: "10px" }}><s><strong>209₪</strong></s></span>
          <div className='invoiceLine'>فاتورة سنوية 1500 شيكل</div>
          <div style={{ fontWeight: "bold", padding: "10px 30px" }}> اجعل الموسيقى من أولوياتك لمدة 365 يوماً القادمة</div>
          <div style={{ fontWeight: "bold", padding: "10px 30px" }}>وفر الكثير مع الرزمة الأكثر شيوعًا</div>
          <div style={{ fontWeight: "bold", padding: "10px 30px" }} className='invoiceLine'>ستندهش مما يمكن أن يفعله عام باستخدام منصة فنان</div>
         {user ? (<> {endDate.isAfter(moment()) ? (<>
          {remainingMonths > 0 && (
            <h3>
              باقي
              {' '}
              {remainingMonths} {remainingMonths === 1 ? 'شهر' : 'اشهر'}
              {' و'}
              {remainingDays} {remainingDays === 1 ? 'يوم' : 'ايام'}  للاشتراك
            </h3>
          )}
          </>
          ) : (
            <>
              {!plan ? (<> <Select
            options={teacherOptions}
            value={selectedTeacherYear}
            onChange={handleTeacherSelectYear}
            placeholder='Select a teacher'
          />
          {showTeacherRequied && <div>يجب اختيار معلم</div>}
                <button className='Months12Btn' onClick={() => {
    if (selectedTeacherYear) {
      setTcsShow("Tcs");
      setIsPopupOpen(true);
      setPeriod('year');
    } else {
      setShowTeacherRequied(true);
    }
  }}>
                  اختر سنوي
                </button>
                </>
              ) : (<> <Select
            options={teacherOptions}
            value={selectedTeacherYear}
            onChange={handleTeacherSelectYear}
            placeholder='Select a teacher'
          />
          {showTeacherRequied && <div>يجب اختيار معلم</div>}
                <button className='Months12Btn' onClick={() => {
    if (selectedTeacherYear) {
      setTcsShow("Tcs");
      setIsPopupOpen(true);
      setPeriod('year');
    } else {
      setShowTeacherRequied(true);
    }
  }}>
                  تجديد لمدة سنة
                </button>
                </>
              )}
            </>
          )}</>):(<>للاشتراك يجب تسجيل الدخول<br/><Link to="/auth"> <button style={{padding:"5px 15px", margin:"10px", color:"black", background:"#fcedd5"}}>تسجيل الدخول</button></Link></>)}
         
        </div>
        <div className='plan2'>
          <h2 className='titleSubscription'>ستة أشهر</h2>
          شهري/ <strong>199₪</strong> <span style={{ color: "red", margin: "10px" }}><s><strong>299₪</strong></s></span>
          <div className='invoiceLine'>فاتورة 6 أشهر 1194 شيكل</div>
          <div className='textSubscription6'>* لتحقيق النتائج المرغوبة، يجب على الفرد أن يلتزم بالدراسة لمدة لا تقل عن 6 أشهر</div>
         {user ? (<>{endDate.isAfter(moment()) ? (
            <>
            {remainingMonths > 0 && (
              <h3>
                باقي
                {' '}
                {remainingMonths} {remainingMonths === 1 ? 'شهر' : 'اشهر'}
                {' و'}
                {remainingDays} {remainingDays === 1 ? 'يوم' : 'ايام'}  للاشتراك
              </h3>
            )}
            </>
          ) : (
            <>
              {!plan ? (
                <>
                <Select
            options={teacherOptions}
            value={selectedTeacher6Months}
            onChange={handleTeacherSelect6Months}
            placeholder='Select a teacher'
          />
                    {showTeacherRequied && <div>يجب اختيار معلم</div>}

                <button className='Months6Btn' onClick={() => {
    if (selectedTeacher6Months) {
      setTcsShow("Tcs");
      setIsPopupOpen(true);
      setPeriod('6 months');
    } else {
      setShowTeacherRequied(true);
    }
  }}>
                  ستة أشهر
                </button>
                </>
              ) : (<>
                <Select
            options={teacherOptions}
            value={selectedTeacher6Months}
            onChange={handleTeacherSelect6Months}
            placeholder='Select a teacher'
          />
                    {showTeacherRequied && <div>يجب اختيار معلم</div>}

                <button className='Months6Btn' onClick={() => {
    if (selectedTeacher6Months) {
      setTcsShow("Tcs");
      setIsPopupOpen(true);
      setPeriod('6 months');
    } else {
      setShowTeacherRequied(true);
    }
  }}>
                  تجديد ستة أشهر
                </button>
                </>
              )}
            </>
          )}</>):(<>للاشتراك يجب تسجيل الدخول<br/><Link to="/auth"> <button style={{padding:"5px 15px", margin:"10px", color:"black", background:"#fcedd5"}}>تسجيل الدخول</button></Link></>)}
          
        </div>
      </div></div></>} 
    </div>
  );
};

export default Subscription;
