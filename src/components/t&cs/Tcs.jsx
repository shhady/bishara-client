import React,{useState, useEffect} from 'react'
import "./tcs.css"
import {  useLocation } from 'react-router-dom';

export default function Tcs() {
  const [marginTop, setMarginTop] = useState('')
  const location = useLocation();
  useEffect(() => {
    if (location.pathname.includes('terms')) {
        setMarginTop("100px")
    }
  }, [location]);
  return (
    <div>
    <div className='TcsContent' style={{padding:"10px 10px", marginTop:`${marginTop}`}}>
    <h2 style={{textAlign:"center"}}>الشروط والاحكام</h2>
    لن يشارك فنان أبدًا معلوماتك الشخصية مع أي طرف ثالث. سيتم استخدام أي معلومات نجمعها من قبلنا فقط لتخصيص منصة فنان لك وتحسين جودة الخدمة التي نقدمها. قد يتضمن ذلك محاولات لتخصيص التوصيات لدروسك بناءً على سجل المشاهدة السابق ، أو تشغيل تنبيهات البريد الإلكتروني بناءً على الفنانين الذين قمت بوضع إشارة مرجعية عليهم. يمكنك إلغاء الاشتراك في رسائل البريد الإلكتروني في أي وقت في حسابك ، ويمكنك طلب حذف البيانات وتصدير البيانات في أي وقت أيضًا. لمزيد من الأسئلة ، اتصل بمسؤول حماية البيانات لدينا ، بشارة هاروني ، على
     funanmusic@gmail.com.
    تكشف سياسة الخصوصية هذه عن ممارسات الخصوصية للموقع. تنطبق سياسة الخصوصية هذه فقط على المعلومات التي تم جمعها بواسطة فنان أو الشركات التابعة لها على الموقع الإلكتروني وسوف تُعلمك بما يلي:
    ما هي معلومات التعريف الشخصية التي يتم جمعها منك من خلال موقع الويب، وكيفية استخدامها ومع من يمكن مشاركتها.
    ما هي الخيارات المتاحة لك فيما يتعلق باستخدام المعلومات الخاصة بك.
    الإجراءات الأمنية المعمول بها لحماية إساءة استخدام معلوماتك.
    كيف يمكنك تصحيح أي أخطاء في المعلومات.
    
    تصف سياسة الخصوصية هذه اتفاقية فنان و / أو الشركات التابعة لها معك فيما يتعلق بكيفية تعاملنا مع معلومات معينة على موقع الويب. لا تتناول هذه السياسة المعلومات التي تم الحصول عليها من مصادر أخرى مثل عمليات الإرسال عن طريق البريد أو الهاتف أو الأجهزة الأخرى أو من جهة الاتصال الشخصية. باستخدام أو الوصول إلى موقع الويب و / أو تقديم معلومات على الموقع ، فإنك توافق على جمع واستخدام والكشف عن معلومات معينة وفقًا لسياسة الخصوصية هذه.
    
    
    Translation is too long to be saved
    المعلومات التي يتم جمعها على موقعنا إذا قمت فقط بتنزيل مادة أو تصفح من خلال موقع الويب ، فقد تقوم خوادمنا تلقائيًا بجمع معلومات معينة منك والتي قد تشمل: (أ) اسم المجال والمضيف الذي تصل من خلاله إلى الإنترنت ؛ (ب) برنامج المتصفح الذي تستخدمه ونظام التشغيل الخاص بك ؛ و (ج) عنوان الإنترنت الخاص بالموقع الذي قمت بربطه بالموقع. يمكن استخدام المعلومات التي نجمعها تلقائيًا لتحسين موقع الويب أو مواقع الشركات التابعة لجعلها مفيدة بقدر الإمكان لزوارنا ؛ ومع ذلك ، لن تكون هذه المعلومات مرتبطة بالمعلومات الشخصية التي تختار تزويدنا بها. نحن نجمع المعلومات الشخصية ونحتفظ بها عندما تختار تقديم هذه المعلومات. على سبيل المثال ، إذا اخترت ملء نموذج على موقع الويب ، فإننا نحتفظ بالمعلومات التي قدمتها. يجب ألا ترسل أي معلومات لا تريد الاحتفاظ بها. بعد أن نتخذ الإجراء المناسب ردًا على إرسالك ، نحتفظ بالمعلومات التي تقدمها لسجلاتنا وللاتصال بك من وقت لآخر. يرجى ملاحظة أنه إذا قررنا تغيير الطريقة التي نستخدم بها المعلومات الشخصية أو نحتفظ بها ، فقد نقوم بتحديث سياسة الخصوصية هذه وفقًا لتقديرنا الخاص.
    إشعار للأطفال دون سن 16 عامًا وأولياء أمورهم أو الأوصياء القانونيين
    إذا كان عمرك أقل من 16 عامًا وترغب في الاتصال بنا ، فيرجى فعل ذلك من خلال والديك أو الأوصياء القانونيين. مواقع الويب والشركات التابعة لها مخصصة للبالغين فقط. لا تقوم فنان أو الشركات التابعة لها بجمع المعلومات الشخصية من الأطفال الذين تقل أعمارهم عن 16 عامًا. إذا كان عمرك أقل من 16 عامًا ، فيرجى عدم إرسال أي معلومات شخصية إلينا بما في ذلك على سبيل المثال لا الحصر عنوان البريد الإلكتروني و / أو الاسم و / أو معلومات الاتصال الخاصة بك.
    
    إفشاء المعلومات الشخصية لأطراف ثالثة
    نحن نمنع الوصول إلى المعلومات الشخصية غير العامة التي تقدمها على الموقع على الموظفين والأطراف الثالثة الأخرى الذين يحتاجون إلى معرفة المعلومات حتى نتمكن من تقديم خدمات معينة لك. لا تقوم فنان أو الشركات التابعة لها ببيع أو تأجير المعلومات الشخصية التي تختار تزويدنا بها إلى أي طرف ثالث. أيضًا ، لن نكشف عن المعلومات الشخصية التي تزودنا بها إلى أي طرف ثالث دون موافقتك ، باستثناء (أ) وفقًا لما يقتضيه القانون ؛ (ب) للمقاول (المتعاقدون) المستقلون الذين يستضيفون الموقع أو يحافظون عليه أو يخدمونه ، و (ج) لمقدمي الخدمات والشركات التابعة حيث سيمكن الإفصاح هذا الطرف من أداء الأعمال أو الدعم الفني أو المهني.
    
    استلام المواد الترويجية
    قد نرسل لك معلومات أو مواد مثل الرسائل الإخبارية عن طريق البريد الإلكتروني أو البريد العادي عندما ترسل عناوين عبر موقع الويب. إذا كنت لا ترغب في تلقي معلومات أو مواد ترويجية ، فيرجى إرسال بريد إلكتروني يتضمن اسمك وعنوانك البريدي وعنوان بريدك الإلكتروني إلى funanmusic@gmail.com مع سطر الموضوع "إزالة المعلومات". بدلاً من ذلك ، يمكنك "إلغاء الاشتراك" باستخدام الرابط ذي الصلة من أي وسيلة اتصال (بريد إلكتروني ، مراسلة ، وما إلى ذلك) عندما نتلقى طلبك ، قد نتخذ خطوات معقولة لإزالة اسمك من هذه القوائم.
    
    وصولك إلى المعلومات والتحكم فيها
    يمكنك إلغاء الاشتراك في أي جهات اتصال مستقبلية منا في أي وقت عن طريق الاتصال بنا. للقيام بذلك ، يرجى إرسال بريد إلكتروني مع اسمك وعنوانك البريدي وعنوان بريدك الإلكتروني إلى funanmusic@gmail.com مع سطر الموضوع "إنهاء الاتصالات". بدلاً من ذلك ، يمكنك "إلغاء الاشتراك" باستخدام الرابط ذي الصلة من أي وسيلة اتصال (بريد إلكتروني ، مراسلة ، إلخ.)
    
    يمكنك القيام بما يلي عن طريق الاتصال بنا عبر عنوان البريد الإلكتروني أعلاه أو رقم الهاتف الوارد على موقع الويب: (أ) الاطلاع على البيانات التي لدينا عنك ، إن وجدت ؛ (ب) تغيير / تصحيح أي بيانات لدينا عنك (ج) جعلنا نحذف أي بيانات لدينا عنك (د) تعبر عن أي قلق لديك بشأن استخدامنا لبياناتك.
    
    ملفات تعريف الارتباط الخاصة بالموقع
    
    ملف تعريف الارتباط هو ملف نصي صغير يمكن لأي موقع ويب وضعه على محرك الأقراص الثابتة بجهاز الكمبيوتر الخاص بك لحفظ السجلات أو لأغراض إدارية أخرى. قد يستخدم موقع الويب ملفات تعريف الارتباط للمساعدة في تخصيص تجربتك على الموقع. لديك القدرة على قبول أو رفض ملفات تعريف الارتباط. على الرغم من أن معظم متصفحات الويب تقبل ملفات تعريف الارتباط تلقائيًا ، إلا أنه يمكنك عادةً تعديل إعداد المستعرض الخاص بك لرفض ملفات تعريف الارتباط. إذا قررت رفض ملفات تعريف الارتباط ، فقد لا تتمكن من استخدام ميزات موقع الويب بالكامل. يمكن أيضًا استخدام ملفات تعريف الارتباط في مواقع معينة يمكن الوصول إليها من خلال الروابط الموجودة على موقع الويب.
    
    حماية الموقع
    نتخذ الاحتياطات المعقولة لحماية معلوماتك الشخصية الحساسة. عندما ترسل معلومات شخصية حساسة عبر موقع الويب أو موقع ويب تابع لشركة تابعة ، فإننا نتخذ خطوات معقولة لحماية هذه المعلومات. إذا قمنا بجمع معلومات شخصية حساسة (مثل بيانات بطاقة الائتمان) ، يتم تشفير هذه المعلومات وإرسالها إلينا بطريقة آمنة. يمكنك التحقق من ذلك بالبحث عن رمز قفل مغلق أسفل متصفح الويب الخاص بك ، أو البحث عن "https" في بداية عنوان صفحة الويب. بالإضافة إلى ذلك ، نحن لا نجمع بيانات حساسة داخل خوادمنا ولكن من خلال موردي الطرف الثالث. يتم توجيه معلومات بطاقتك الائتمانية من قبل شركة كارد كوم 
    
    بينما نستخدم التشفير لحماية المعلومات الحساسة المرسلة عبر الإنترنت ، فإننا نبذل أيضًا جهودًا لحماية معلوماتك في وضع عدم الاتصال. يُمنح فقط الموظفين الذين يحتاجون إلى المعلومات لأداء وظيفة معينة (على سبيل المثال ، الفواتير أو خدمة العملاء) الوصول إلى معلومات التعريف الشخصية. نحن نبذل جهودًا لنطلب من أي مزود تابع لطرف ثالث نتعاقد معه مخازن معلومات التعريف الشخصية في بيئة آمنة.
    
    روابط لمواقع أخرى
    فنان ليست مسؤولة عن ممارسات أو سياسات المواقع المرتبطة بالموقع أو منه. إذا اخترت استخدام رابط يصل إلى موقع ويب تابع لطرف آخر ، فستخضع لممارسات وسياسات هذا الموقع.
    
    
    شروط الاستخدام www.funan.org
    مرحبًا بكم في موقع فنان، وإلى منتجات وخدمات الفيديو التي يقدمها فنان أو الموسيقيون التابعون لها و المدرجون في الموقع . من خلال الوصول إلى هذا الموقع ، فإنك ("أنت" أو "الخاص بك") توافق على الالتزام بشروط الاستخدام التالية ("الشروط") إلى الحد الذي يسمح به القانون المعمول به. إذا كنت لا توافق على الالتزام بالشروط ، فلا يجوز لك الوصول إلى الموقع أو استخدامه.
    
    تحتفظ فنان بالحق في إجراء تغييرات على الموقع الإلكتروني والمنتجات وتعديل هذه الشروط في أي وقت وفقًا لتقديرها الخاص. من خلال وصولك إلى الموقع أو استخدامه ، فإنك توافق على الالتزام بالشروط ، بما في ذلك على سبيل المثال لا تحديد لأي تغييرات أو تعديلات.
    
    يقدم فنان خدمة اشتراك مخصصة تسمح لأعضائنا بالوصول إلى الدروس و الدورات والمحتوى المباشر المسجلة مسبقًا ("محتوى فنان") ، والتي يتم بثها عبر الإنترنت إلى بعض أجهزة التلفزيون والكمبيوتر والأجهزة الأخرى المتصلة بالإنترنت ("أجهزة فنان الجاهزة "). كما ويقدم موقع فنان خدمات من الموسيقيين التابعين للموقع
    
    لقد وافقت على شروط الاستخدام هذه ، والتي تحكم استخدامك لخدمتنا. تخضع معلومات التعريف الشخصية لبيان الخصوصية الخاص بنا ، والذي تم تضمين شروطه هنا. يرجى مراجعة بيان الخصوصية الخاص بنا لفهم ممارساتنا.
    
    كما هو مستخدم في شروط الاستخدام هذه ، تعني "خدمة فنان" أو "خدمتنا" أو "الخدمة" الخدمة الشخصية التي تقدمها فنان لاكتشاف محتوى فنان ومشاهدته ، بما في ذلك جميع الميزات والوظائف والتوصيات والمراجعات والموقع الإلكتروني و واجهات المستخدم ، وكذلك جميع المحتويات والبرامج المرتبطة بخدمتنا.
    
    عضوية
    1. عضوية فنان الخاصة بك سوف تستمر وتجدد تلقائيا حتى يتم إنهاؤها. لاستخدام خدمة فنان يجب أن يكون لديك اتصال بالإنترنت وجهاز فنان جاهز وتزويدنا بواحدة أو أكثر من طرق الدفع. "طريقة الدفع" تعني طريقة دفع حالية وصالحة ومقبولة ، والتي قد يتم تحديثها من وقت لآخر والتي قد تشمل الدفع من خلال حسابك مع طرف ثالث. يجب عليك إلغاء عضويتك قبل أن يتم تجديدها لتجنب دفع رسوم العضوية التالية(انظر "الإلغاء" أدناه).
    
    2. قد نقدم عددًا من رسوم للعضوية ، بما في ذلك رسوم الترويجية الخاصة أو العضويات التي تقدمها جهات خارجية جنبًا إلى جانب توفير منتجاتها وخدماتها. نحن لسنا مسؤولين عن المنتجات والخدمات التي تقدمها هذه الأطراف الثالثة. قد تحتوي بعض رسوم العضوية على شروط وقيود مختلفة ، والتي سيتم الكشف عنها عند تسجيلك أو في وسائل الاتصال الأخرى المتاحة لك. يمكنك العثور على تفاصيل محددة بخصوص عضويتك في فنان من خلال زيارة موقعنا الإلكتروني والنقر على رابط "الحساب".
    
    التجارب المجانية
    1. قد تبدأ عضويتك في فنان بتجربة مجانية. سيتم تحديد مدة الفترة التجريبية المجانية لعضويتك أثناء الاشتراك وتهدف إلى السماح للأعضاء الجدد والسابقين بتجربة الخدمة.
    
    2. يتم تحديد أهلية الإصدار التجريبي المجاني من قِبل فنان وفقًا لتقديرها الخاص ، وقد نحدد المدة لمنع إساءة استخدام الإصدار التجريبي المجاني. نحتفظ بالحق في إلغاء الإصدار التجريبي المجاني وتوقيف حسابك في حال قررنا أنك غير مؤهل. أفراد الأسر التي لديها عضوية فنان حالية أو حديثة غير مؤهلين. قد نستخدم معلومات مثل معرف الجهاز أو طريقة الدفع أو عنوان البريد الإلكتروني للحساب المستخدم مع عضوية فنان الحالية أو الحديثة لتحديد الأهلية. بالنسبة للجمع بين العروض الأخرى ، قد يتم تطبيق قيود.
    
    3. سنفرض رسوم العضوية للدورة التالية على طريقة الدفع الخاصة بك في نهاية الفترة التجريبية المجانية وسيتم تجديد عضويتك تلقائيًا ما لم تقم بإلغاء عضويتك قبل نهاية الفترة التجريبية المجانية. لعرض سعر العضوية المطبق وتاريخ انتهاء الفترة التجريبية المجانية ، قم بزيارة موقعنا على الويب وانقر على صفحة "الحساب".
    
    الفواتير والإلغاء
    دورة الفواتير. رسوم العضوية لخدمة فنان ، أي رسوم أخرى قد تتكبدها فيما يتعلق باستخدامك للخدمة ، مثل الضرائب ورسوم المعاملات المحتملة ، سيتم خصمها من طريقة الدفع الخاصة بك في تاريخ الفاتورة المحدد المشار إليه في صفحة "الحساب" الخاصة بك. سيعتمد طول دورة الفوترة على نوع الاشتراك الذي تختاره عند الاشتراك في الخدمة. يتم الحصول على رسوم العضوية بالكامل عند الدفع. في بعض الحالات ، قد يتغير تاريخ الدفع الخاص بك ، على سبيل المثال إذا لم يتم تسوية طريقة الدفع الخاصة بك بنجاح أو إذا بدأت عضويتك المدفوعة في يوم غير وارد في شهر معين. قم بزيارة موقعنا على الويب وانقر على صفحة "الحساب" لمعرفة تاريخ الدفع التالي. قد نفوض طريقة الدفع الخاصة بك تحسبًا للعضوية أو الرسوم المتعلقة بالخدمة من خلال طرق مختلفة ، بما في ذلك تفويض ما يصل إلى شهر واحد تقريبًا من الخدمة بمجرد التسجيل. في بعض الحالات ، قد يتم تخفيض رصيدك أو حد الائتمان المتاح لديك ليعكس التفويض خلال الفترة التجريبية المجانية.
    
    طرق الدفع. لاستخدام خدمة فنان يجب عليك توفير طريقة دفع واحدة أو أكثر. أنت تصرح لنا بتحصيل رسوم أي طريقة دفع مرتبطة بحسابك في حالة رفض طريقة الدفع الأساسية الخاصة بك أو لم تعد متاحة لنا لسداد رسوم اشتراكك. أنت تظل مسؤولاً عن أي مبالغ لم يتم تحصيلها. إذا لم تتم تسوية دفعة بنجاح ، بسبب انتهاء الصلاحية ، أو عدم كفاية الأموال ، أو غير ذلك ، ولم تقم بإلغاء حسابك ، فيجوز لنا تعليق وصولك إلى الخدمة حتى يتم خصم طريقة دفع صالحة بنجاح. بالنسبة لبعض طرق الدفع ، قد يفرض عليك المُصدر رسومًا معينة ، مثل رسوم المعاملات الأجنبية أو الرسوم الأخرى المتعلقة بمعالجة طريقة الدفع الخاصة بك. تحقق مع مزود خدمة طريقة الدفع للحصول على التفاصيل.
    
     تحديث طرق الدفع الخاصة بك. يمكنك تحديث طرق الدفع بالذهاب إلى صفحة "الحساب". قد نقوم أيضًا بتحديث طرق الدفع الخاصة بك باستخدام المعلومات المقدمة من مزودي خدمة الدفع. بعد أي تحديث ، فإنك تفوضنا بمواصلة تحصيل الرسوم من طريقة (طرق) الدفع المعمول بها.
    
    الإلغاء. يمكنك إلغاء عضوية فنان الخاصة بك في أي وقت ، وسوف تستمر في الوصول إلى خدمة فنان حتى نهاية فترة الفاتورة الخاصة بك. للإلغاء ، انتقل إلى صفحة "الحساب" على موقعنا الإلكتروني واتبع التعليمات الخاصة بالإلغاء. إذا قمت بإلغاء عضويتك ، فسيتم إغلاق حسابك تلقائيًا في نهاية فترة الفوترة الحالية. لمعرفة موعد إغلاق حسابك ، انقر على صفحة "الحساب". إذا قمت بالتسجيل في فنان باستخدام حسابك لدى طرف ثالث كطريقة دفع وترغب في إلغاء عضوية فنان الخاصة بك ، فقد تحتاج إلى القيام بذلك من خلال هذا الطرف الثالث ، على سبيل المثال عن طريق زيارة حسابك لدى الطرف الثالث المعني وإيقاف التشغيل التجديد التلقائي أو إلغاء الاشتراك من خدمة فنان من خلال تلك الجهة الخارجية. قد تجد أيضًا معلومات الفواتير حول عضويتك في فنان من خلال زيارة حسابك لدى الطرف الثالث المعني.
    
    تغييرات الأسعار وخطط الاشتراك. نحتفظ بالحق في تغيير خطط الاشتراك الخاصة بنا أو تعديل الأسعار لخدمتنا أو أي مكونات منها بأي طريقة وفي أي وقت حسبما نحدده وفقًا لتقديرنا الخاص والمطلق. باستثناء ما هو منصوص عليه صراحةً في شروط الاستخدام هذه ، فإن أي تغييرات في الأسعار أو تغييرات في خطة الاشتراك الخاصة بك ستصبح سارية المفعول بعد إخطارك.
    
    المدفوعات غير قابلة للاسترداد بعد ضمان استرداد الأموال لمدة 90 يومًا ولا توجد مبالغ مستردة أو أرصدة لفترات مستخدمة جزئيًا. ومع ذلك ، بعد أي إلغاء ، ستستمر في الوصول إلى الخدمة حتى نهاية فترة الفوترة الحالية. في أي وقت ولأي سبب من الأسباب ، قد نقدم استردادًا أو خصمًا أو أي اعتبار آخر لبعض أعضائنا أو جميعهم ("الائتمانات credits"). إن مبلغ وشكل هذه الاعتمادات ، وقرار منحها ، يخضع لتقديرنا الوحيد والمطلق. لا يمنحك توفير الاعتمادات في حالة واحدة الحق في الحصول على ائتمانات في المستقبل لحالات مماثلة ، ولا يلزمنا بتقديم ائتمانات في المستقبل ، تحت أي ظرف من الظروف.
    
    معلومات حقوق النشر والعلامات التجارية يتيح لك فنان موقع الويب funan.org للحصول على معلومات حول المنتجات والوصول إليها. أنت وحدك المسؤول عن المعلومات التي تقدمها إلى موقع الويب والمنتجات التي تختارها. يعد المحتوى الموجود على موقع الويب ، مثل النصوص والرسومات والشعارات والصور ومقاطع الفيديو والبرامج ("المحتوى") بالإضافة إلى تجميع المحتوى و "شكل ومظهر" موقع الويب ملكية خاصة لـ فنان و / أو الشركات التابعة لها أو موردي المحتوى الآخرين وهي محمية بموجب قوانين حقوق النشر والعلامات التجارية. لا يجوز إعادة إنتاج موقع الويب أو المحتوى أو تجميع المحتوى أو "الشكل والمظهر" لموقع الويب أو نسخه أو نسخه أو بيعه أو نشره أو زيارته أو استغلاله بأي طريقة أخرى دون الحصول على موافقة كتابية مسبقة من فنان. في حالة قيامك بتحميل أي محتوى ، بما في ذلك على سبيل المثال الصور أو البيانات أو مقاطع الفيديو أو البرامج ، إلى هذا الموقع ، فإنك بموجب هذا (1) تقر وتضمن لـ فنان والشركات التابعة لها أن لديك جميع الحقوق اللازمة لتحميل هذا المحتوى ؛ (2) الموافقة على تعويض فنان والشركات التابعة لها عن أي دعاوى انتهاك طرف ثالث متعلقة بذلك ؛ و (3) منح فنان ترخيصًا دائمًا غير قابل للإلغاء لاستخدام هذا المحتوى الذي تم تحميله لأي أغراض في أي وسائط موجودة حاليًا أو مطورة فيما بعد.
    
    
    
    ترخيص لاستخدامك
    لأي فترة زمنية تستخدم فيها الموقع الإلكتروني وتلتزم بالشروط ، تمنحك فنان ترخيصًا محدودًا وقابل للإلغاء وغير حصري للوصول إلى الموقع لاستخدامك ولكن ليس لنسخ أو تنزيل أو تعديل الموقع أو محتواه بأي شكل من الأشكال. أو المنتجات ، أو أي جزء منها ، إلا بموافقة خطية صريحة من فنان. لا يجوز لك استخدام الإطارات لإرفاق أي علامة تجارية أو شعار أو محتوى أو معلومات ملكية أخرى واردة على الموقع الإلكتروني دون موافقة كتابية صريحة من فنان. لا يجوز لك استخدام أي علامات وصفية أو أي "نص مخفي" آخر يستخدم أسماء أو علامات تجارية فنان أو الشركات التابعة لها دون موافقة خطية صريحة من فنان.
    
    أنت توافق على استخدام موقع الويب والمنتجات للأغراض المشروعة فقط ، وتقر بأن عدم قيامك بذلك قد يعرضك للمسؤولية المدنية أو الجنائية. أنت توافق على عدم تعطيل أو تعديل أو التدخل في موقع الويب أو المنتجات أو البرامج والأجهزة والخوادم المرتبطة بها بأي شكل من الأشكال وتوافق على عدم إعاقة أو التدخل في وصول الآخرين إلى الموقع و / أو استخدامه. أنت توافق أيضًا على عدم تغيير أو العبث بأي معلومات أو مواد على أو مرتبطة بالموقع أو المنتجات التي لم تدخلها.
    
    يؤدي أي استخدام غير مصرح به أو انتهاك للشروط إلى إنهاء الترخيص الممنوح من قبل فنان تلقائيًا للوصول إلى الموقع والمنتجات واستخدامهما.
    
    روابط الموقع
    قد يوفر موقع الويب روابط أو مراجع لأطراف ثالثة أو مواقع أو تطبيقات أطراف ثالثة. فنان ليس مسؤول عن أي معلومات تختار تقديمها لتلك الأطراف الثالثة أو مواقع أو تطبيقات الطرف الثالث ؛ أي معلومات أو منتجات أو خدمات تحصل عليها من تلك الأطراف الثالثة أو مواقع أو تطبيقات الطرف الثالث ؛ أو أي أضرار تنشأ عن وصولك إلى أو استخدام هذه المعلومات أو الخدمات أو المنتجات أو مواقع أو تطبيقات الطرف الثالث. يتم توفير أي روابط كوسيلة راحة لزوار الموقع الإلكتروني وأي إدراج لأي من هذه الروابط في الموقع لا يعني ضمناً تأييدًا أو ضمانًا للأطراف الثالثة أو مواقع أو تطبيقات الطرف الثالث أو أمانها أو محتواها أو منتجاتها أو عروضها أو خدماتها. يتم تحذيرك من أن أي مواقع أو تطبيقات خاصة بأطراف خارجية تخضع لشروط الاستخدام وسياسات الخصوصية الخاصة بها ، لذلك عند ربط معلومات أو منتجات أو خدمات أو مواقع الويب أو التطبيقات الخاصة بطرف ثالث أو الوصول إليها بطريقة أخرى ، يجب عليك التأكد من زيارة الصفحات المناسبة لتحديد شروط الاستخدام وسياسات الخصوصية التي ستطبق على استخدامك.
    إخلاء المسؤولية عن الضمانات وتحديد المسؤولية
    لا يقدم فنان أي إقرارات أو ضمانات بشأن الموقع الإلكتروني و / أو المنتجات و / أو المواد و / أو المحتوى على الموقع الإلكتروني لأي غرض من الأغراض. من خلال وصولك إلى الموقع الإلكتروني أو المنتجات أو المحتوى واستخدامك له ، فإنك تقر وتوافق على أنك تستخدم موقع الويب و / أو أي روابط لمواقع ويب أو مواقع ويب تابعة لجهات خارجية أو معلومات أو منتجات أو خدمات تابعة لطرف ثالث في يدك. يتم توفير موقع الويب والمنتجات والمحتوى من قبل فنان "كما هي" وعلى أساس "كما هو متاح" ، وبدون أي ضمان من أي نوع ، سواء كان صريحًا أو ضمنيًا ، بما في ذلك ، على سبيل المثال لا الحصر ، الضمانات الضمنية للتسويق ، غرض معين أو عدم الانتهاك. لا يضمن فنان دقة أو اكتمال المعلومات أو المنتجات أو المواد أو المحتوى أو النص أو الرسومات أو ردود البريد الإلكتروني أو الروابط أو العناصر الأخرى الموجودة على الموقع الإلكتروني أو على أي موقع ويب آخر أو موقع ويب أو معلومات خاصة بطرف ثالث أو جزء ثالث خدمات. لا تضمن فنان أن الموقع أو خوادمه أو الرسائل المرسلة من فنان أو الموقع الإلكتروني خالية من الفيروسات أو المكونات الضارة الأخرى. لن تكون فنان مسؤولة عن الأضرار من أي نوع الناشئة عن الوصول إلى و / أو استخدام الموقع أو المحتوى أو المنتجات أو أي مادة أو مادة أو منتج أو خدمة أو موقع ويب لطرف ثالث ، بما في ذلك ، على سبيل المثال لا الحصر ، أي غير مباشر ، الأضرار الخاصة أو العرضية أو العقابية أو التبعية. فنان ليس مسؤول عن أي برامج طرف ثالث أو أي محتوى أو منتجات يتم تنزيلها من خلال الموقع الإلكتروني ولا تقدم أي مطالبة بأن الموقع متوافق مع جميع برامج المتصفح. فنان ليست مسؤولة عن أي فقد للبيانات أو تلف الأجهزة أو البرامج الناتج عن استخدام الموقع أو المحتوى أو المنتجات ، ولا هي مسؤولة عن أمن المعلومات التي تم تمريرها إلكترونيًا إلى الموقع. في أي حال ، تقتصر مسؤولية فنان على المبلغ الذي دفعته إلى فنان أو الشركات التابعة لها بموجب الموقع الإلكتروني في آخر ستة (6) أشهر قبل المطالبة التي أصبحت معروفة أو كما يسمح بها القانون المعمول به.
    
    من المفترض أن تكون المعلومات الموجودة على الموقع وفي أي ردود عليك لأغراض المعلومات العامة فقط ، وليست سرية. أي معلومات تزودك بها على مسؤوليتك الخاصة.
    
    القانون 
    من خلال الوصول إلى موقع الويب وزيارته ، فإنك توافق على أن الشروط يجب أن تخضع وتفسر وفقًا لقوانين دولة اسرائيل ، بغض النظر عن مبادئ تنازع القانون.
    
    تحكم
    توافق أنت وجميع الأطراف في الشروط على التحكيم في أي دعوى أو نزاع ، بما في ذلك جميع المطالبات القانونية وأي مطالبات خاصة بالدولة أو الاتحاد ، والتي قد تنشأ عن أو تتعلق بالموقع الإلكتروني و / أو المحتوى و / أو المنتجات. من خلال الموافقة على التحكيم ، تدرك أنت وجميع الأطراف وتوافق على أنك وأنت تتنازل عن حقوقك وحقوقهم في الحفاظ على إجراءات حل أخرى متاحة ، مثل دعوى قضائية أو إجراء إداري ، لتسوية قضيتك أو تسوية قضيتك.
    الإخطار بدعوى الانتهاك
    إذا كنت مالكًا لحقوق الطبع والنشر أو وكيلًا لها وتعتقد أن أي معلومات مقدمة من المستخدم أو محتوى أو برنامج آخر على موقع الويب والذي ينتهك حقوق الطبع والنشر الخاصة بك ، فيمكنك إرسال إشعار وفقًا لقانون حقوق النشر من خلال تقديم وكيل حقوق الطبع والنشر بالمعلومات: 
    
    (1) توقيع مادي أو إلكتروني لشخص مخول بالتصرف نيابة عن مالك الحق الحصري المزعوم انتهاكه ؛
    (2) تحديد العمل المحمي بحقوق الطبع والنشر المزعوم انتهاكه ، أو إذا تمت تغطية العديد من الأعمال المحمية بحقوق الطبع والنشر في موقع واحد عبر الإنترنت من خلال إخطار واحد ، فيجب تقديم قائمة تمثيلية لهذه الأعمال في ذلك الموقع ؛
    (3) تحديد المواد التي يُزعم أنها تنتهك أو تخضع لنشاط الانتهاك والتي يجب إزالتها أو تعطيل الوصول إليها ومعلومات كافية بشكل معقول للسماح لوكيل حقوق الطبع والنشر بتحديد موقع المادة ؛
    (4) معلومات كافية بشكل معقول للسماح لوكيل حقوق الطبع والنشر بالاتصال بك ، مثل العنوان ورقم الهاتف وعنوان البريد الإلكتروني إذا كان متاحًا ؛
    (5) إقرار بأن لديك اعتقاد حسن النية بأن استخدام المواد بالطريقة المشكو منها غير مصرح به من قبل مالك حقوق الطبع والنشر أو وكيله أو القانون ؛ وتقر بأنه في حالة عدم امتثالك لجميع متطلبات هذا القسم ، فقد لا يكون إشعار قانون الألفية الجديدة لحقوق طبع ونشر المواد الرقمية الخاص بك صالحًا.
    </div>
    </div>
  )
}
