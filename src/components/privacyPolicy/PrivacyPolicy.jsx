
import React, { useState, useEffect } from 'react'

export default function PrivacyPolicy() {
    const [lang, setLang] = useState('ar')
    
    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
      
  return (
    <div style={{margin:"100px 0px", textAlign:"start", padding:"20px 20px"}}>
        <div style={{display:'flex', justifyContent:"space-between", alignItems:"center"}} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
       {lang === 'ar' ? <h2>سياسة الخصوصية</h2> : <h2>privacy policy </h2>} 
        <button style={{padding:"5px 10px", background:"#fcedd5"}} onClick={()=> setLang(lang === 'ar'? 'en':'ar')}>{lang === "ar"? ('To English'):('للعربية')}</button>
        </div>
        {lang === 'ar' ?  <div>
           
            <h3>
        تاريخ السريان: 23.7.2023</h3>

المقدمة
مرحبًا بكم في موقع funan.org  . نحن ملتزمون بحماية خصوصية جميع المستخدمين، بما في ذلك الأفراد من جميع الأعمار، الذين يزورون ويستخدمون موقعنا. توضح سياسة الخصوصية هذه كيفية جمعنا واستخدامنا والكشف عن المعلومات والبيانات التي يقدمها المستخدمون، بما في ذلك الفيديوهات التي يرسلونها لأنفسهم أثناء العزف على الآلات الموسيقية التي تعلموها.

من خلال الوصول إلى واستخدام موقعنا، فإنك توافق على الممارسات الموضحة في سياسة الخصوصية هذه. نحن نأخذ خصوصية مستخدمينا على محمل الجد، وقد قمنا بتنفيذ تدابير لضمان أمان وسرية المعلومات التي نجمعها.

<br/>
<strong>2.1 المعلومات الشخصية</strong>
<br/> 
عندما تقوم بإنشاء حساب أو استخدام ميزات معينة على موقعنا، قد نقوم بجمع معلومات شخصية مثل اسمك وعنوان بريدك الإلكتروني وعمرك وتفاصيل أخرى ذات صلة. هذه المعلومات ضرورية لتزويدك بتجربة مستخدم مخصصة ومحسنة على موقع funan.org .
<br/>
<strong>2.2 الفيديوهات والمحتوى</strong>
<br/>
نظرًا لأن موقعنا مكرس لتعلم الموسيقى، فقد نقوم بجمع الفيديوهات والمحتوى الذي ترسله، مثل تسجيلات العزف على الآلات الموسيقية. من خلال تحميل الفيديوهات، فإنك توافق على مشاركة هذا المحتوى مع مستخدمين آخرين وتقر بأنه قد يكون متاحًا للجمهور. يُرجى أخذ الحيطة والحذر عند مشاركة أي معلومات شخصية أو حساسة في الفيديوهات أو المحتوى الخاص بك.
<br/>
<strong>2.3 معلومات الاستخدام</strong> <br/>
قد نقوم بجمع معلومات الاستخدام مثل عنوان بروتوكول الإنترنت (IP) الخاص بك، ومعلومات الجهاز، ونوع المتصفح، والتفاعلات مع موقعنا. يُستخدم هذا النوع من البيانات لتحليل سلوك المستخدم وتحسين خدماتنا وتعزيز تجربة المستخدم.
<br/>
<strong>2.4 الكوكيز</strong> <br/>
في الوقت الحالي، لا يستخدم موقع funan.org  ملفات تعريف الارتباط. ومع ذلك، إذا قمنا بتنفيذ ملفات تعريف الارتباط في المستقبل، سيتم تحديث سياسة الخصوصية هذه على النحو المناسب لإبلاغك عن استخدامها والغرض منها.

كيفية استخدام المعلومات الخاصة بك
<br/>
<strong>3.1 توفير الخدمات</strong> <br/>
نستخدم المعلومات المجمعة لتقديم خدماتنا وتحسينها، وتصميم المحتوى وفقًا لاهتمامات المستخدمين، وتحسين تجربتهم التعليمية.
<br/>
<strong>3.2 التواصل</strong> <br/>
قد نستخدم عنوان بريدك الإلكتروني لإرسال تحديثات وإشعارات وإعلانات هامة تتعلق بحسابك أو خدماتنا. لديك الخيار لإلغاء الاشتراك في تلقي الاتصالات غير الضرورية.
<br/>
<strong>3.3 تفاعل المستخدم</strong> <br/>
قد يتم مشاركة فيديوهاتك ومحتواك مع مستخدمين آخرين على موقع funan.org  لتعزيز مجتمع متعلمي الموسيقى. يُرجى أن تكون حذرًا بشأن المعلومات والمحتوى الذي تختار مشاركته علنًا.
<br/>
<strong>3.4 الأبحاث والتحليلات</strong> <br/>
قد نقوم بتحليل البيانات المجمعة والمجهولة لأغراض البحث لفهم تفضيلات المستخدمين والاتجاهات في التعليم الموسيقي. يساعدنا هذا التحليل على تحسين خدماتنا وتلبية احتياجات المستخدمين بشكل أفضل.
<br/>
<strong>أمان البيانات</strong> <br/> 
نحن نستخدم تدابير أمان قياسية في الصناعة لحماية معلوماتك الشخصية ومنع الوصول غير المصرح به والكشف والتعديل. ومع ذلك، من المهم فهم أنه لا يمكن ضمان أمان تام لنقل البيانات عبر الإنترنت أو التخزين الإلكتروني. في حين نسعى لحماية معلوماتك، فإننا لا نستطيع ضمان الأمان المطلق.
<br/>
<strong>الخدمات من الأطراف الثالثة</strong> <br/> 
قد يحتوي موقعنا على روابط لمواقع وخدمات الأطراف الثالثة التي لا تخضع لسيطرتنا. يُرجى مراجعة سياسات الخصوصية الخاصة بتلك الخدمات من الأطراف الثالثة حيث قد تكون لها ممارسات بيانات مختلفة.
<br/>
<strong>خصوصية الأطفال</strong> <br/>
يترحب موقع funan.org  بالمستخدمين من جميع الأعمار، بما في ذلك الأطفال. نحن لا نقوم بجمع المعلومات الشخصية من الأطفال دون سن 13 عامًا دون موافقة الوالدين. إذا أدركنا أننا قمنا بجمع معلومات من طفل دون موافقة الوالدين، فسنتخذ الخطوات المناسبة لحذف تلك البيانات.
<br/>
<strong>
تغييرات على سياسة الخصوصية</strong> <br/>
يحتفظ موقع funan.org  بالحق في تعديل أو تحديث سياسة الخصوصية هذه من وقت لآخر. سيتم نشر أي تغييرات على هذه الصفحة، وسيتم تحديث تاريخ السريان وفقًا لذلك. نشجعك على مراجعة سياسة الخصوصية بانتظام لمتابعة كيفية حماية معلوماتك.
<br/>
<strong>
الاتصال بنا</strong> <br/>
إذا كان لديك أي أسئلة أو استفسارات أو طلبات تتعلق بسياسة الخصوصية هذه أو بياناتك، يُرجى التواصل معنا عبر البريد الإلكتروني bashbash1111@gmail.com.

</div> : <div dir='ltr'>
<h3>Effective Date: 23.7.2023</h3>

Introduction
Welcome to Funan.org ("us", "we", or "our"). We are committed to protecting the privacy of all users, including individuals of all ages, who visit and use our website. This Privacy Policy explains how we collect, use, and disclose the information and data provided by users, including the videos they submit of themselves playing musical instruments they have learned.

By accessing and using our website, you consent to the practices described in this Privacy Policy. We take the privacy of our users seriously, and we have implemented measures to ensure the security and confidentiality of the information we collect.

Information We Collect
<h4>2.1 Personal Information</h4>
When you sign up for an account or use certain features of our website, we may collect personal information, such as your name, email address, age, and other relevant details. This information is necessary to provide you with a personalized and enhanced user experience on Funan.org.

<h4>2.2 Videos and Content</h4>
As our website is dedicated to music learning, we may collect videos and other content you submit, such as recordings of yourself playing musical instruments. By uploading videos, you agree to share this content with other users and acknowledge that it may be accessible to the public. Please be cautious about sharing any personal or sensitive information in your videos or content.

<h4>2.3 Usage Information</h4>
We may collect usage information, such as your IP address, device information, browser type, and interactions with our website. This data is used to analyze user behavior, improve our services, and enhance user experience.

<h4>2.4 Cookies</h4>
At present, Funan.org does not use cookies. However, should we implement cookies in the future, this Privacy Policy will be updated accordingly to inform you about their use and purpose.

How We Use Your Information
<h4>3.1 Providing Services</h4>
We use the information collected to offer and improve our website's services, tailor content to users' interests, and optimize their learning experience.

<h4>3.2 Communication</h4>
We may use your email address to send you updates, notifications, and important announcements related to your account or our services. You have the option to opt-out of receiving non-essential communications.

<h4>3.3 User Interaction</h4>
Your videos and content may be shared with other users of Funan.org to foster a community of music learners. Please be mindful of the information and content you choose to share publicly.

<h4>3.4 Research and Analytics</h4>
We may analyze aggregated and anonymized data for research purposes to understand user preferences and trends in music education. This analysis helps us improve our services and better cater to user needs.

<h4>Data Security</h4>
We employ industry-standard security measures to safeguard your personal information and prevent unauthorized access, disclosure, or alteration. However, it is essential to understand that no method of data transmission over the internet or electronic storage is entirely secure. While we strive to protect your information, we cannot guarantee absolute security.

<h4>Third-Party Services</h4>
Our website may contain links to third-party websites or services that are not under our control. Please review the privacy policies of these third-party services as they may have different data practices.

<h4>Children's Privacy</h4>
Funan.org welcomes users of all ages, including children. We do not knowingly collect personal information from children under the age of 13 without parental consent. If we become aware that we have collected information from a child without parental consent, we will take appropriate steps to delete such data.

<h4>Changes to this Privacy Policy</h4>
Funan.org reserves the right to modify or update this Privacy Policy from time to time. Any changes will be posted on this page, and the effective date will be updated accordingly. We encourage you to review this Privacy Policy periodically to stay informed about how we protect your information.

<h4>Contact Us</h4>
If you have any questions, concerns, or requests regarding this Privacy Policy or your data, please contact us at bashbash1111@gmail.com.
    </div>}
        
        </div>
  )
}
