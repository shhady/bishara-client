import React,{useState, useEffect} from 'react'
import StartChat from "../Messenger/StartChat"

export default function BoxesTeacher() {
    const teacherId = useState(localStorage.getItem("teacherId"));
    const user = JSON.parse(localStorage.getItem("profile"));
    const [userId, setUserId] = useState("");

    useEffect(() => {
        if (!user) return;
        setUserId(user.user ? user.user._id : user.teacher._id);
      }, [user]);
  return (
    <div style={{marginBottom:"20px"}}>
        <div>
        <details  style={{border: "1px solid black"}}>
    <summary  style={{fontWeight:"bold", fontSize:"18px", cursor:"pointer"}} >
    تمارين الدورات
  </summary>
  لتحسين مستواك في العزف بطريقة صحيحة ومهنية، يمكنك تحميل ملفات التمارين ورفعها على الموقع بصيغة فيديو أو رسالة صوتية، وذلك لتلقي الملاحظات والنصائح التدريجية التي ستساعدك على التقدم بصورة أسرع.
</details>
</div>
        <div><details  style={{border: "1px solid black"}}>
    <summary  style={{fontWeight:"bold", fontSize:"18px", cursor:"pointer"}} >
    مراسلة الاستاذ 
    </summary>
    يمكنك التواصل مع الاستاذ مباشرة عن طريق إرسال رسالة والتحدث معه، وذلك للحصول على إجابات حول أسئلتك أو الاستفسارات المتعلقة بالمواد الدراسية أو أي موضوع آخر يتعلق بالتعليم والعزف.

{user?.user ? (
<div style={{display:"flex", justifyContent:"center", alignItems:"center", margin:"20px"}}>
<div >
    <StartChat teacherId={teacherId} userId={userId} />
  </div>
  </div>
) : null} 
</details>
</div>
        <div>
        <details  style={{border: "1px solid black"}}>
    <summary  style={{fontWeight:"bold", fontSize:"18px", cursor:"pointer"}} >
دروس خصوصية     </summary>
يمكنك تحميل مقطع فيديو أو تسجيل صوتي (أوديو) لعزفك، وذلك للحصول على الملاحظات والنصائح التي ستساعدك على تحسين مستواك وبالتالي بناء طريقة تعليم خاصة بك.
</details>
</div>
<div>
        <details  style={{border: "1px solid black"}}>
    <summary  style={{fontWeight:"bold", fontSize:"18px", cursor:"pointer"}} >
    النشرة المباشرة 
  </summary>
  يتم نشر نشرات حية باللغة العربية عبر تقنية الزووم، يقدمها أفضل المدرسين في العالم العربي، وتتناول مواضيع شيقة في عالم الموسيقى.
</details>
</div>
    </div>
  )
}
