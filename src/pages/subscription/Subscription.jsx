import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';
import "./subscription.css"
const Subscription = ({ user }) => {
  const [selectedTeacherYear, setSelectedTeacherYear] = useState(null);
  const [selectedTeacher6Months, setSelectedTeacher6Months] = useState(null);
  const [teachers, setTeachers] = useState([]);

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

  const handleSubscriptionSubmit = async (period) => {
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
        const result = await axios.put(
          process.env.REACT_APP_BACKEND_URL + `/trial`,
          {
            email: user.email, // fix here
            teacherId: selectedTeacher.value,
            trialDateStart: new Date(),
            status: "active"
          }
        );
        window.localStorage.setItem("profile" ,JSON.stringify(result.data));
        console.log('Subscription plan created:', response.data);
        window.localStorage.setItem('plan', JSON.stringify(response.data));
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
    }
  };
  

  const teacherOptions = teachers.map((teacher) => ({
    value: teacher._id,
    name: teacher.firstName + ' ' + teacher.lastName,
    label: (
      <div style={{display:"flex", justifyContent:'flex-start', alignItems:"center"}} >
        <img src={teacher.avatar} alt={teacher.firstName} width={50} height={50} style={{borderRadius:"50%"}}/>
        <span style={{color:'black'}}>{`${teacher.firstName} ${teacher.lastName} - ${teacher.instrument}`}</span>
      </div>
    ),
  }));

  return (
    <div style={{ marginTop: '100px' }}>
      <h1 className='titleSubscription'>استمتع بفترة تجريبية مجانية لمدة 7 أيام</h1>
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
      شهري/ <strong>125₪</strong> <span style={{color:"red", margin:"10px"}}><s><strong>209₪</strong></s></span>
      <div  className='invoiceLine'>فاتورة سنوية 1500 شيكل</div>
      <div style={{fontWeight:"bold" ,padding:"10px 30px"}}> اجعل الموسيقى من اولوياتك لمدة 365 يوماً القادمة</div>
      <div style={{fontWeight:"bold",padding:"10px 30px"}}>وفر الكثير مع الرزمة الاكثر شيوعاً</div>
      <div style={{fontWeight:"bold",padding:"10px 30px"}}  className='invoiceLine'>ستندهش مما يمكن ان يفعله عام باستخدام منصة فنان</div>
          <Select
            options={teacherOptions}
            value={selectedTeacherYear}
            onChange={handleTeacherSelectYear}
            placeholder='Select a teacher'
          />
          <button className='Months12Btn' onClick={() => handleSubscriptionSubmit('year')}>اختر سنوي</button>
        </div>
        <div className='plan2'>
          <h2 className='titleSubscription' >ستة أشهر</h2>
      شهري/ <strong>199₪</strong> <span style={{color:"red", margin:"10px"}}><s><strong>299₪</strong></s></span>
      <div className='invoiceLine'>فاتورة 6 أشهر 1194 شيكل</div>
      <div className='textSubscription6'>* لتحقيق النتائج المرغوبة, يجب على الفرد ان يلتزم بالدراسة لمدة لا تقل عن 6 اشهر</div>
          <Select
            options={teacherOptions}
            value={selectedTeacher6Months}
            onChange={handleTeacherSelect6Months}
            placeholder='Select a teacher'
          />
          <button className='Months6Btn' onClick={() => handleSubscriptionSubmit('6 months')}>ستة أشهر</button>
        </div>
      </div>
    </div>
  );
};

export default Subscription;
