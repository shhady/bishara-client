import React from "react";
import "./About.css";
export default function about() {
  return (
    <div className="aboutus">
      <div className="aboutSection">
        <h2 style={{ textAlign: "center" }}>من نحن?</h2>
        <p>
          لدينا إيمان راسخ بأن المعرفة يجب أن يتم تقاسمها. إن نقل المعلومات من
          جيل إلى جيل هو الطريقة الوحيدة التي يمكن للثقافة أن تستمر فيها في
          التطور والنمو. لا يوجد مكان أكثر صحة من هذا في الموسيقى. بدون معلم
          رائع ، لا يمكن للطلاب في كل مستوى مهارة التقدم بشكل كافٍ. هذا هو السبب
          في أنه من الأهمية بمكان أن يتمكن جميع الطلاب من الوصول إلى أفضل
          المدربين من خلال كل مرحلة من مراحل تطورهم الموسيقي.
        </p>
      </div>
      <div className="instimage">
        <img
          src="./instnew.jpg"
          alt="instruments"
          width="80%"
          height="60%"
          style={{ borderRadius: "10px" }}
        />
      </div>
    </div>
  );
}
