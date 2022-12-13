import React from "react";
import "./LearnTrainCom.css";
export default function LearnTrainCom() {
  return (
    <div className="learn-train-com-container">
      <div style={{ textAlign: "center" }}>
        <h2>برامج تعليمية برعاية معلمي الموسيقى الخبراء</h2>
        <p>
          تعلم برامج كاملة منتقاة من قبل خبراء الموسيقى والمعلمين: نظرية
          الموسيقى الأساسية ، ودورة موسيقية شاملة ، و "X" سواء كنت مبتدئًا أو
          محترفًا ، انضم إلى مدرسة ToneGym لتوسيع معرفتك في الموسيقى وتصبح
          موسيقيًا أفضل
        </p>
      </div>
      <div className="cards3">
        <div className="card1">
          <div>
            <img
              src="https://images.unsplash.com/photo-1513883049090-d0b7439799bf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjJ8fGxlYXJuJTIwcGlhbm98ZW58MHx8MHx8&auto=format&fit=crop&w=600&q=60"
              alt="learn"
              width="200px"
              height="200px"
              style={{ borderRadius: "50%" }}
            />
          </div>
          <div>تعلم</div>
          <div>احصل على برامج تعلم نظرية كاملة برعاية معلمي موسيقى خبراء</div>
        </div>
        <div className="card2">
          <div>
            <img
              src="https://images.unsplash.com/photo-1512733596533-7b00ccf8ebaf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjF8fGxlYXJuJTIwcGlhbm98ZW58MHx8MHx8&auto=format&fit=crop&w=600&q=60"
              alt="Train"
              width="200px"
              height="200px"
              style={{ borderRadius: "50%" }}
            />
          </div>
          <div>تمرن</div>
          <div>
            احصل على تدريب عملي للأذن الموسيقية وحسّن مهارات الاستماع الأساسية
          </div>
        </div>
        <div className="card3">
          <div>
            <img
              src="https://images.unsplash.com/photo-1513171920216-2640b288471b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fGNvbm5lY3R8ZW58MHx8MHx8&auto=format&fit=crop&w=600&q=60"
              alt="learn"
              width="200px"
              height="200px"
              style={{ borderRadius: "50%" }}
            />
          </div>
          <div>تواصل</div>
          <div>
            انضم إلى مجتمع الموسيقيين لتكوين صداقات في رحلتك نحو التميز
            الموسيقي.
          </div>
        </div>
      </div>
    </div>
  );
}
