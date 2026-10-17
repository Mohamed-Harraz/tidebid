// Khamsat service filler. Loaded with (0,eval)(await fetch(...).then(r=>r.text()))
window.RAW = 'https://raw.githubusercontent.com/Mohamed-Harraz/tidebid/5ce2dac/k/';
const sleep = ms => new Promise(r => setTimeout(r, ms));

window.KH = {
  bot: {
    title: 'برمجة بوت تليجرام بالذكاء الاصطناعي للرد على عملائك تلقائيا',
    cat: ['programming', 'ai-chatbot'], price: 25, days: 3,
    tags: ['بوت تليجرام', 'ذكاء اصطناعي', 'شات بوت', 'خدمة عملاء', 'Python'],
    desc: `هل يضيع وقتك في الرد على نفس الأسئلة كل يوم؟ سأبرمج لك بوت تليجرام ذكي يرد على عملائك تلقائيًا على مدار الساعة، بأسلوب طبيعي وباللهجة التي تناسبهم.

البوت يتعلم من معلومات نشاطك (الأسعار، المنتجات أو المنيو، مواعيد العمل، طرق الدفع والتوصيل، والأسئلة الشائعة) ويستخدم نموذج ذكاء اصطناعي حديث لفهم السؤال حتى لو كتبه العميل بطريقة مختلفة.

مناسب للمطاعم والعيادات والمتاجر الإلكترونية ومراكز التدريب وأي نشاط يتلقى أسئلة متكررة.

السعر الأساسي يشمل بوتًا يرد من معلومات نشاطك حتى 30 سؤالًا وجوابًا، مع أزرار للقوائم الأساسية، وتحويل المحادثة لك عند الحاجة، وتجربة كاملة قبل التسليم. فهم الرسائل الصوتية وحفظ الطلبات في Google Sheets والتشغيل على سيرفر متاحة في التطويرات.

ملاحظة: تكلفة نموذج الذكاء الاصطناعي والسيرفر (إن وجدت) على المشتري، وأساعدك في اختيار الخيار المجاني أو الأرخص.`,
    feats: [['ردود ذكية بالعامية', 'يفهم السؤال بأكثر من صياغة ويرد بأسلوب طبيعي يناسب عملاءك.'],
      ['أزرار وقوائم', 'قوائم للمنتجات أو الخدمات تسهل على العميل الوصول لما يريد بسرعة.'],
      ['تحويل لموظف', 'عند سؤال لا يعرفه البوت يحوّل المحادثة لك أو لموظفك فورًا.'],
      ['كود نظيف', 'مكتوب بلغة Python ومشروح لسهولة التعديل والتطوير لاحقًا.']],
    gets: [['بوت تليجرام جاهز', 'يعمل باسم نشاطك ومعلوماتك.'],
      ['الكود المصدري', 'ملفات المشروع كاملة مع ملف إعدادات سهل التعديل.'],
      ['شرح التشغيل', 'خطوات مكتوبة لتشغيل البوت وتحديث المعلومات بنفسك.'],
      ['دعم بعد التسليم', 'متابعة 7 أيام لأي مشكلة في التشغيل.']],
    ups: [['فهم الرسائل الصوتية من العملاء والرد عليها', 10, '01'],
      ['استقبال الطلبات وحفظها تلقائيًا في Google Sheets', 15, '02'],
      ['تشغيل البوت على سيرفر 24 ساعة وإعداد كل شيء لك', 10, '01'],
      ['زيادة معلومات البوت إلى 100 سؤال وجواب', 10, '01']],
    instr: `لبدء العمل أرسل لي من فضلك:
1) اسم نشاطك ونوعه.
2) الأسئلة الشائعة وإجاباتها، أو ملف أو صور للأسعار والمنيو أو الكتالوج.
3) اللهجة أو أسلوب الرد المفضل.
4) هل تريد تحويل بعض المحادثات لموظف؟
وسأرسل لك خطوات إنشاء البوت من BotFather للحصول على التوكن.`,
    imgs: 'bot'
  },
  alert: {
    title: 'برمجة بوت تليجرام يرسل لك تنبيهات فورية بالأسعار أو الطلبات الجديدة',
    cat: ['programming', 'chatbots-development'], price: 15, days: 2,
    tags: ['بوت تليجرام', 'تنبيهات', 'أتمتة', 'Python', 'متابعة أسعار'],
    desc: `سأبرمج لك بوت تليجرام يراقب ما يهمك ويرسل لك رسالة فورية عند حدوث أي تغيير، بدلًا من المتابعة اليدوية طوال اليوم.

أمثلة على الاستخدام:
- تنبيه عند انخفاض سعر منتج في موقع معين أو وصوله لسعر محدد.
- إشعار بكل طلب جديد في متجرك أو نموذج تسجيل.
- تقرير يومي أو كل ساعة بأرقام من جدول بيانات أو موقع.
- متابعة أسعار الذهب أو العملات أو أي بيانات منشورة.

نفذت بوتًا مشابهًا يجمع أسعار الذهب والفضة كل 5 دقائق ويرسل تقريرًا ورسمًا بيانيًا كل ساعة (الصورة في معرض الأعمال).

السعر الأساسي يشمل مصدر بيانات واحدًا (موقع أو API أو جدول) ونوع تنبيه واحدًا يُرسل لك أو لجروب. الرسوم البيانية والتشغيل على سيرفر والمصادر الإضافية متاحة في التطويرات.`,
    feats: [['مراقبة مستمرة', 'يتحقق من البيانات كل بضع دقائق حسب ما تحدده.'],
      ['تنبيه فوري', 'رسالة واضحة فيها التفاصيل المهمة فقط.'],
      ['لك أو لفريقك', 'الإرسال لحسابك أو لجروب أو قناة.'],
      ['سهل التعديل', 'تغيير الحدود والشروط من ملف إعدادات بسيط.']],
    gets: [['بوت تنبيهات جاهز', 'يراقب ويرسل التنبيهات حسب الشروط المتفق عليها.'],
      ['الكود المصدري', 'ملفات المشروع كاملة.'],
      ['شرح التشغيل', 'خطوات مكتوبة للتشغيل وتغيير الإعدادات.'],
      ['دعم بعد التسليم', 'متابعة 7 أيام لأي مشكلة.']],
    ups: [['رسوم بيانية داخل البوت بأزرار (يوم / أسبوع / شهر)', 10, '01'],
      ['مصدر بيانات إضافي للمراقبة', 5, '01'],
      ['تشغيل البوت على سيرفر 24 ساعة وإعداد كل شيء لك', 10, '01'],
      ['تقرير دوري مجدول (كل ساعة أو يوميًا)', 5, '01']],
    instr: `لبدء العمل أرسل لي من فضلك:
1) ما الذي تريد مراقبته (رابط الصفحة أو مصدر البيانات).
2) متى يرسل البوت التنبيه (مثلًا: عند نزول السعر عن قيمة معينة).
3) هل التنبيه لك فقط أم لجروب أو قناة.
4) كل كم دقيقة تريد التحقق.`,
    imgs: 'alert'
  },
  scrape: {
    title: 'استخراج بيانات أي موقع وتسليمها في ملف Excel أو CSV',
    cat: ['programming', 'web-scraping'], price: 10, days: 2,
    tags: ['استخراج بيانات', 'Web Scraping', 'Python', 'Excel', 'جمع بيانات'],
    desc: `تحتاج قائمة منتجات بأسعارها، أو بيانات شركات، أو تقييمات، أو أي بيانات منشورة على موقع؟ سأكتب سكربت Python يجمع البيانات تلقائيًا ويسلمها لك مرتبة في ملف Excel أو CSV أو JSON.

ما يشمله السعر الأساسي:
- موقع واحد حتى 1000 صف من البيانات.
- حتى 8 أعمدة (مثل: الاسم، السعر، الرابط، التقييم).
- تنظيف البيانات وإزالة التكرار.
- عينة أولية قبل الجمع الكامل للتأكد من الشكل المطلوب.

أعمل على المواقع العادية والمواقع التي تعتمد على JavaScript. لا أجمع بيانات تتطلب الدخول بحساب غيرك، أو بيانات شخصية محمية، أو ما يخالف شروط الموقع.

التحديث الدوري التلقائي وإرسال النتائج على تليجرام متاحة في التطويرات.`,
    feats: [['سريع ودقيق', 'سكربت آلي يجمع آلاف الصفوف في وقت قصير.'],
      ['صفحات متعددة', 'يتنقل بين صفحات الموقع تلقائيًا.'],
      ['بيانات نظيفة', 'إزالة التكرار وتوحيد الشكل قبل التسليم.'],
      ['قابل لإعادة الاستخدام', 'تستطيع تشغيل السكربت بنفسك لاحقًا.']],
    gets: [['ملف البيانات', 'بصيغة Excel أو CSV أو JSON.'],
      ['سكربت Python', 'الكود المستخدم في الجمع.'],
      ['شرح التشغيل', 'خطوات تشغيل السكربت بنفسك.'],
      ['تعديل مجاني', 'إضافة أو حذف عمود بعد التسليم.']],
    ups: [['كل 1000 صف إضافي من البيانات', 5, '01'],
      ['تحديث تلقائي يومي للبيانات', 15, '02'],
      ['إرسال النتائج تلقائيًا على تليجرام', 10, '01'],
      ['موقع إضافي بنفس البيانات', 10, '01']],
    instr: `لبدء العمل أرسل لي من فضلك:
1) رابط الموقع أو الصفحة.
2) البيانات (الأعمدة) التي تحتاجها بالضبط.
3) العدد التقريبي للصفوف.
4) صيغة الملف المفضلة (Excel أو CSV أو JSON).`,
    imgs: 'scrape'
  },
  excel: {
    title: 'أتمتة ملفات Excel و Google Sheets بالمعادلات والسكربتات',
    cat: ['programming', 'scripting'], price: 10, days: 2,
    tags: ['Excel', 'Google Sheets', 'أتمتة', 'Apps Script', 'تقارير'],
    desc: `توقف عن تكرار نفس الشغل اليدوي كل يوم في Excel. سأحوّل ملفك إلى نظام يعمل تلقائيًا بالمعادلات الذكية أو Apps Script أو Python.

أمثلة لما أنفذه:
- ربط Google Forms أو موقعك بجدول منظم يتحدث تلقائيًا.
- تقارير وملخصات تُحسب وحدها (يومية أو شهرية).
- دمج عشرات الملفات وتنظيف البيانات المكررة.
- تلوين الحالات وتنبيهات عند المواعيد أو انخفاض المخزون.
- لوحة متابعة Dashboard برسوم بيانية.

السعر الأساسي يشمل مهمة أتمتة واحدة واضحة على ملف واحد (مثلًا: تقرير تلقائي، أو ربط نموذج بجدول، أو دمج وتنظيف ملفات) مع شرح مختصر للاستخدام. اللوحات والتنبيهات والمهام الإضافية متاحة في التطويرات.`,
    feats: [['يوفر وقتك', 'ما كان يأخذ ساعات يتم في ثوانٍ.'],
      ['بدون برامج إضافية', 'يعمل داخل Excel أو Google Sheets نفسه.'],
      ['مختبر على بياناتك', 'أجرب الحل على ملفك قبل التسليم.'],
      ['شرح واضح', 'تعرف كيف تستخدمه وتعدله.']],
    gets: [['الملف بعد الأتمتة', 'جاهز للاستخدام مباشرة.'],
      ['المعادلات أو السكربت', 'مكتوبة بشكل منظم.'],
      ['شرح الاستخدام', 'خطوات مختصرة مكتوبة.'],
      ['تعديل مجاني', 'تعديل بسيط بعد التسليم.']],
    ups: [['لوحة متابعة Dashboard برسوم بيانية', 15, '02'],
      ['إرسال ملخص يومي تلقائي على الإيميل أو تليجرام', 10, '01'],
      ['مهمة أتمتة إضافية', 10, '01'],
      ['ماكرو VBA أو سكربت Python لمعالجة ملفات كثيرة', 15, '02']],
    instr: `لبدء العمل أرسل لي من فضلك:
1) نسخة من الملف (يمكنك حذف البيانات الحساسة أو استبدالها ببيانات تجريبية).
2) وصف المطلوب أتمتته بالتفصيل.
3) هل تستخدم Excel أم Google Sheets.`,
    imgs: 'excel'
  },
  landing: {
    title: 'تصميم وبرمجة صفحة هبوط احترافية سريعة ومتجاوبة',
    cat: ['programming', 'landing-page-development'], price: 20, days: 3,
    tags: ['صفحة هبوط', 'Landing Page', 'HTML', 'تصميم مواقع', 'Next.js'],
    desc: `سأصمم وأبرمج لك صفحة هبوط عصرية تعرض منتجك أو خدمتك بشكل جذاب وتشجع الزائر على التواصل أو الشراء.

ما يشمله السعر الأساسي:
- صفحة واحدة حتى 5 أقسام (مثل: الرئيسية، المميزات، المنتجات أو الأسعار، آراء العملاء، التواصل).
- تصميم متجاوب يعمل بشكل ممتاز على الموبايل والكمبيوتر.
- دعم كامل للعربية (من اليمين لليسار) أو الإنجليزية.
- زر واتساب أو نموذج تواصل لعملائك.
- سرعة تحميل عالية وإعدادات SEO أساسية.

من أعمالي: موقع تعريفي ومبيعات لبرنامج هندسي، ومتجر إلكتروني كامل لأدوات الصيد بلغتين (الصور في معرض الأعمال).

النسخة بلغتين، والأقسام الإضافية، ورفع الصفحة على استضافة متاحة في التطويرات.`,
    feats: [['تصميم عصري', 'شكل احترافي يعكس هوية منتجك.'],
      ['متجاوبة', 'تعمل بشكل ممتاز على كل الشاشات.'],
      ['سريعة جدًا', 'كود خفيف بدون إضافات ثقيلة.'],
      ['سهلة التعديل', 'كود منظم تستطيع تعديل نصوصه بسهولة.']],
    gets: [['صفحة هبوط كاملة', 'جاهزة للنشر.'],
      ['ملفات المصدر', 'كل ملفات الصفحة والصور.'],
      ['طريقة الرفع', 'شرح رفع الصفحة على استضافة.'],
      ['تعديلات', 'جولتا تعديل حتى تكون راضيًا.']],
    ups: [['نسخة بلغتين عربي وإنجليزي', 10, '01'],
      ['قسم إضافي في الصفحة', 5, '01'],
      ['رفع الصفحة على استضافة مجانية وربط الدومين', 10, '01'],
      ['ربط نموذج التواصل بالإيميل أو Google Sheets', 10, '01']],
    instr: `لبدء العمل أرسل لي من فضلك:
1) اسم المنتج أو الخدمة ونبذة عنه.
2) النصوص والصور والشعار (إن وجدت).
3) الألوان المفضلة وأمثلة لمواقع تعجبك.
4) الهدف من الصفحة (بيع، تسجيل، تواصل).`,
    imgs: 'landing'
  },
  pcb: {
    title: 'تصميم دائرة PCB على KiCad مع ملفات Gerber جاهزة للتصنيع',
    cat: ['engineering', 'pcb'], price: 20, days: 4,
    tags: ['PCB', 'KiCad', 'تصميم دوائر', 'Gerber', 'إلكترونيات'],
    desc: `سأصمم لك لوحة الدائرة المطبوعة PCB لمشروعك على برنامج KiCad، من المخطط وحتى ملفات التصنيع.

ما يشمله السعر الأساسي:
- رسم المخطط Schematic لدائرة بسيطة حتى 30 مكوّنًا.
- تصميم لوحة من طبقتين (Layout) مع مراعاة قواعد التصميم.
- ملفات Gerber و Drill جاهزة للإرسال لأي مصنع.
- قائمة المكونات BOM.
- فحص DRC و ERC قبل التسليم.

أعمل أيضًا على نسخ وإعادة رسم لوحة موجودة من صورها (هندسة عكسية)، فقد طورت برنامجًا خاصًا يحوّل صور اللوحات الإلكترونية إلى مشروع KiCad (الصور في معرض الأعمال).

الدوائر الأكبر، واللوحات 4 طبقات، ونسخ اللوحات الموجودة متاحة في التطويرات.`,
    feats: [['تصميم احترافي', 'مسارات منظمة ومراعاة لقواعد التصنيع.'],
      ['جاهز للتصنيع', 'ملفات يقبلها أي مصنع PCB.'],
      ['قابل للتعديل', 'مشروع KiCad كامل مفتوح المصدر.'],
      ['هندسة عكسية', 'نسخ لوحات موجودة من صورها.']],
    gets: [['مشروع KiCad كامل', 'المخطط واللوحة.'],
      ['ملفات Gerber و Drill', 'جاهزة للتصنيع.'],
      ['قائمة المكونات BOM', 'بأسماء وقيم المكونات.'],
      ['ملف PDF للمخطط', 'للطباعة والمراجعة.']],
    ups: [['كل 20 مكونًا إضافيًا في الدائرة', 10, '01'],
      ['لوحة من 4 طبقات', 25, '02'],
      ['نسخ لوحة موجودة من صورها (هندسة عكسية)', 20, '02'],
      ['صور ثلاثية الأبعاد 3D للوحة', 5, '01']],
    instr: `لبدء العمل أرسل لي من فضلك:
1) المخطط أو وصف الدائرة (صورة مرسومة باليد تكفي).
2) أبعاد اللوحة المطلوبة وأي قيود في الشكل.
3) قائمة المكونات المتوفرة لديك.
4) لو تريد نسخ لوحة: صور واضحة للوجهين بإضاءة جيدة.`,
    imgs: 'pcb'
  },
  mcu: {
    title: 'برمجة متحكمات ESP32 و STM32 و Arduino وأي متحكم دقيق',
    cat: ['engineering', 'embedded-systems'], price: 15, days: 3,
    tags: ['ESP32', 'STM32', 'Arduino', 'أنظمة مدمجة', 'IoT'],
    desc: `سأكتب لك كود Firmware لمشروعك على أي متحكم دقيق: ESP32 أو STM32 أو Arduino (AVR) أو PIC أو RP2040 أو ESP8266 أو nRF52، بالطريقة المناسبة لمشروعك: Arduino أو HAL أو FreeRTOS.

أمثلة لما أنفذه:
- قراءة الحساسات (حرارة، رطوبة، مسافة، حركة، تيار) وعرضها على شاشة.
- التحكم في الريليهات والموتورات والسيرفو.
- الاتصال عبر WiFi أو Bluetooth أو MQTT والتحكم من الموبايل أو تليجرام.
- إصلاح كود موجود لا يعمل أو تحسينه.

السعر الأساسي يشمل كودًا لمهمة بسيطة واضحة (حتى 3 حساسات أو مخرجات) مع مخطط التوصيل وطريقة الرفع. الاتصال بالإنترنت والتحكم عن بعد والمشاريع الأكبر متاحة في التطويرات.

مش متأكد إن متحكمك مدعوم؟ راسلني قبل الطلب وأرد عليك.`,
    feats: [['أي متحكم', 'ESP32 و STM32 و AVR و PIC و RP2040 وغيرها.'],
      ['كود منظم ومشروح', 'سهل الفهم والتعديل.'],
      ['مختبر قبل التسليم', 'على الهاردوير أو المحاكي.'],
      ['دعم بعد التسليم', 'مساعدة في الرفع والتشغيل.']],
    gets: [['كود Firmware كامل', 'جاهز للرفع على اللوحة.'],
      ['مخطط التوصيل', 'توضيح توصيل الحساسات والمكونات.'],
      ['طريقة الرفع', 'خطوات رفع الكود على المتحكم.'],
      ['إثبات التشغيل', 'فيديو أو سجل تشغيل للاختبار.']],
    ups: [['اتصال WiFi أو MQTT وتحكم من الموبايل', 15, '02'],
      ['تنبيهات وتحكم عبر تليجرام', 10, '01'],
      ['كل 3 حساسات أو مخرجات إضافية', 10, '01'],
      ['استخدام FreeRTOS بمهام متعددة', 15, '02']],
    instr: `لبدء العمل أرسل لي من فضلك:
1) اسم المتحكم أو اللوحة بالضبط (مثلًا ESP32 DevKit أو STM32F103).
2) الحساسات والمكونات المتصلة.
3) وصف دقيق لما يجب أن يفعله الجهاز.
4) صورة للتوصيل أو المخطط إن وجد.`,
    imgs: 'mcu'
  },
  matlab: {
    title: 'كتابة أكواد ومحاكاة MATLAB للمشاريع الهندسية مع الشرح',
    cat: ['engineering', 'engineering-services'], price: 10, days: 2,
    tags: ['MATLAB', 'Simulink', 'معالجة إشارات', 'نظم تحكم', 'طرق عددية'],
    desc: `سأكتب لك كود MATLAB لمشروعك الهندسي أو البحثي بشكل منظم ومشروح، مع رسوم بيانية واضحة.

مجالات أعمل فيها:
- نظم التحكم: دوال التحويل، الاستجابة، الاستقرار، تصميم PID.
- معالجة الإشارات: الفلاتر، تحويل فورييه FFT، تحليل الطيف.
- الطرق العددية: حل المعادلات، التكامل والتفاضل العددي، الاستيفاء.
- معالجة الصور والبيانات، والمحاكاة على Simulink.
- واجهات رسومية App Designer.

السعر الأساسي يشمل مهمة واحدة متوسطة (حتى 100 سطر كود تقريبًا) مع الرسوم البيانية وشرح لفكرة الحل. التقارير وواجهات GUI ومحاكاة Simulink متاحة في التطويرات.

ملاحظة: أقدم الشرح ليساعدك على الفهم، ولا أحل الامتحانات أو الاختبارات.`,
    feats: [['كود منظم ومشروح', 'تعليق يوضح فكرة كل جزء.'],
      ['رسوم بيانية احترافية', 'عناوين ومحاور ووحدات واضحة.'],
      ['شرح فكرة الحل', 'لتفهم الحل وتعدله بنفسك.'],
      ['تسليم في الموعد', 'التزام كامل بالمدة المتفق عليها.']],
    gets: [['ملفات الكود (.m)', 'كاملة وجاهزة للتشغيل.'],
      ['الرسوم والنتائج', 'بصيغة صور عالية الجودة.'],
      ['شرح خطوات الحل', 'مكتوب بشكل مختصر.'],
      ['تعديل مجاني', 'تعديل بسيط بعد التسليم.']],
    ups: [['تقرير PDF بالنتائج والشرح', 10, '01'],
      ['واجهة رسومية GUI باستخدام App Designer', 20, '02'],
      ['نموذج محاكاة Simulink', 15, '02'],
      ['مهمة إضافية من نفس المشروع', 10, '01']],
    instr: `لبدء العمل أرسل لي من فضلك:
1) وصف المشروع أو المسألة كاملًا (ملف أو صورة).
2) إصدار MATLAB لديك.
3) أي شروط في طريقة الحل أو الدوال المسموح بها.
4) موعد التسليم المطلوب.`,
    imgs: 'matlab'
  }
};

window.sv = (el, v) => {
  const proto = el.tagName == 'TEXTAREA' ? HTMLTextAreaElement.prototype : HTMLInputElement.prototype;
  el.style.display = ''; el.focus();
  Object.getOwnPropertyDescriptor(proto, 'value').set.call(el, v);
  el.dispatchEvent(new Event('input', { bubbles: true }));
  el.dispatchEvent(new Event('change', { bubbles: true }));
  el.dispatchEvent(new FocusEvent('blur', { bubbles: true }));
  el.dispatchEvent(new FocusEvent('focusout', { bubbles: true }));
};

window.fileList = async names => {
  const dt = new DataTransfer();
  for (const n of names) {
    const b = await fetch(RAW + n + '.jpg').then(r => r.blob());
    dt.items.add(new File([b], n + '.jpg', { type: 'image/jpeg' }));
  }
  return dt;
};

// Step 1 on /service/create
window.khStep1 = async key => {
  const d = KH[key];
  const s = id => document.getElementById(id).selectize;
  const ti = document.querySelector('input[name=title]');
  sv(ti, d.title);
  s('main_category').setValue(d.cat[0]); await sleep(1800);
  s('sub-categories-dropdown').setValue(d.cat[1]);
  s('service_base_price').setValue(String(d.price * 100));
  document.querySelector('select[name=in_days]').selectize.setValue(String(d.days).padStart(2, '0'));
  const tg = s('select-tags');
  d.tags.forEach(x => { tg.addOption({ [tg.settings.valueField]: x, [tg.settings.labelField]: x }); tg.addItem(x); });
  return [ti.value, s('main_category').getValue(), s('sub-categories-dropdown').getValue(),
    s('service_base_price').getValue(), document.querySelector('select[name=in_days]').value,
    document.getElementById('select-tags').value];
};

const blocks = () => [...document.querySelectorAll('.profile-block')];
const blockBy = title => blocks().find(b => (b.querySelector('.block-title-input') || {}).value == title);

async function fillList(b, items) {
  for (let i = 0; i < items.length; i++) {
    let units = b.querySelectorAll('.edit-mode .block-list-unit-container');
    if (units.length <= i) { b.querySelector('button.block-list-button').click(); await sleep(350); units = b.querySelectorAll('.edit-mode .block-list-unit-container'); }
    const u = units[i];
    u.querySelector('.block-list-title')?.click(); await sleep(100);
    sv(u.querySelector('.block-list-input'), items[i][0]); await sleep(150);
    u.querySelector('.block-text-render.clickable')?.click(); await sleep(100);
    sv(u.querySelector('textarea'), items[i][1]); await sleep(150);
  }
  return b.querySelectorAll('.edit-mode .block-list-unit-container').length;
}

// Editor page: everything on the "صفحة الخدمة" tab
window.khPage = async key => {
  const d = KH[key], out = {};
  // cover
  const dz = document.querySelector('.dropzone.thumb');
  if (!/hsoubcdn/.test(dz.getAttribute('style') || '')) {
    const dt = await fileList([d.imgs + '_cover']);
    for (const t of ['dragenter', 'dragover', 'drop']) dz.dispatchEvent(new DragEvent(t, { bubbles: true, cancelable: true, dataTransfer: dt }));
    await sleep(7000);
  }
  out.cover = /hsoubcdn/.test(document.querySelector('.dropzone.thumb').getAttribute('style') || '');
  // description
  const b0 = blockBy('وصف الخدمة');
  b0.querySelector('.block-text-render.clickable')?.click(); await sleep(150);
  sv(b0.querySelector('textarea'), d.desc); await sleep(200);
  out.desc = b0.querySelector('textarea').value.length;
  out.feats = await fillList(blockBy('مميزات الخدمة'), d.feats);
  out.gets = await fillList(blockBy('ما الذي ستستلمه'), d.gets);
  // gallery
  const g = blockBy('معرض الأعمال');
  const have = g.querySelectorAll('.block-images-unit .remove-image').length;
  if (have < 4) {
    const inp = g.querySelector('input[type=file]');
    inp.files = (await fileList([1, 2, 3, 4].map(i => d.imgs + '_g' + i))).files;
    inp.dispatchEvent(new Event('change', { bubbles: true }));
    for (let i = 0; i < 30 && g.querySelectorAll('.block-images-unit .remove-image').length < 4; i++) await sleep(1000);
  }
  out.gallery = g.querySelectorAll('.block-images-unit .remove-image').length;
  // upgrades
  const btn = document.getElementById('upgrade-service-btn');
  for (let i = 0; i < d.ups.length; i++) {
    let rows = document.querySelectorAll('#upgrade-service-inputs_wrapper .upgrade-service-inputs');
    const hidden = document.getElementById('upgrade_service').classList.contains('hidden');
    if (hidden || rows.length <= i) { btn.click(); await sleep(400); rows = document.querySelectorAll('#upgrade-service-inputs_wrapper .upgrade-service-inputs'); }
    const r = rows[i];
    const ce = r.querySelector('.editable-block');
    ce.focus(); ce.textContent = d.ups[i][0];
    ce.dispatchEvent(new InputEvent('input', { bubbles: true })); ce.dispatchEvent(new Event('keyup', { bubbles: true })); ce.dispatchEvent(new Event('blur', { bubbles: true }));
    r.querySelector('input.service-upgrade-title').value = d.ups[i][0];
    r.querySelector('select.service-upgrade-price').selectize.setValue(String(d.ups[i][1]));
    r.querySelector('select.service-upgrade-days').selectize.setValue(d.ups[i][2]);
  }
  out.ups = [...document.querySelectorAll('#upgrade-service-inputs_wrapper .upgrade-service-inputs')].map(r =>
    r.querySelector('input.service-upgrade-title').value.slice(0, 15) + '|' + r.querySelector('select.service-upgrade-price').value + '|' + r.querySelector('select.service-upgrade-days').value);
  return out;
};

// Settings tab: instructions + declarations
window.khSettings = async key => {
  const d = KH[key];
  const ta = document.querySelector('textarea[name=instructions]');
  sv(ta, d.instr);
  for (const n of ['unique', 'ownership', 'acknowledgment']) { const c = document.querySelector(`[name=${n}]`); if (!c.checked) c.click(); }
  return [ta.value.length, ...['unique', 'ownership', 'acknowledgment'].map(n => document.querySelector(`[name=${n}]`).checked)];
};
'kh loaded';
