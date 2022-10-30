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
              src="./Learn.jpg"
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
              src="./Train.JPG"
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
              src="./com.JPG"
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
