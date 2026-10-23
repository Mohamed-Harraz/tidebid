window.PF=[
{t:'Tracquill: برنامج يحوّل صور اللوحات الإلكترونية إلى مشروع KiCad بالذكاء الاصطناعي', sub:'157', tags:['126','412','164','296','239'], imgs:['p1_1','p1_2','p1_3','p1_4'], d:`برنامج سطح مكتب احترافي طورته لهندسة اللوحات الإلكترونية عكسيًا.`},
{t:'متجر إلكتروني متكامل لأدوات الصيد بلغتين مع لوحة تحكم', sub:'155', tags:['342','39','377','19','20','31'], imgs:['p2_1','p2_2'], d:`متجر إلكتروني كامل صممته وبرمجته من الصفر لأدوات الصيد في مصر:
- واجهة بالعربية والإنجليزية مع دعم كامل للكتابة من اليمين لليسار.
- تصميم متجاوب للموبايل والكمبيوتر مع حركات وتأثيرات تفاعلية.
- كتالوج منتجات بالأقسام والبحث، وسلة مشتريات، وإتمام الطلب.
- حسابات للعملاء، ولوحة تحكم لإدارة المنتجات والطلبات والصور.
- قاعدة بيانات PostgreSQL، وإشعار فوري بالطلبات الجديدة على تليجرام.

التقنيات: Next.js، React، TypeScript، PostgreSQL.`},
{t:'موقع تعريفي ومبيعات سريع لبرنامج هندسي', sub:'155', tags:['19','20','39','298','31'], imgs:['p3_1','p3_2','p3_3'], d:`موقع تسويقي ومبيعات لبرنامج Tracquill للهندسة العكسية للوحات الإلكترونية:
- تصميم داكن عصري بهوية بصرية واضحة.
- صفحات: الرئيسية، المميزات، الأسعار، التحميل، الأسئلة الشائعة، الدعم، والصفحات القانونية.
- خفيف وسريع جدًا: HTML و CSS و JavaScript بدون أي إطار عمل.
- متجاوب مع الموبايل، مع تأثيرات ظهور عند التمرير وصور WebP.
- إعدادات SEO كاملة (Sitemap و Open Graph).`},
{t:'Tidebid: لعبة ويب متعددة اللاعبين في الوقت الفعلي مع API لوكلاء الذكاء الاصطناعي', sub:'155', tags:['39','254'], imgs:['p4_1','p4_2'], url:'https://tidebid.mo-harraz3.workers.dev', d:`لعبة مزايدة استراتيجية سريعة من 2 إلى 4 لاعبين، يلعبها البشر ووكلاء الذكاء الاصطناعي في نفس المباراة:
- اللعب ضد بوتات فورًا، أو إنشاء مباراة بكود ومشاركته مع الأصدقاء.
- مؤقت لكل جولة، وسجل للمباراة، وإعادة عرض، ووضع مشاهدة.
- واجهة API كاملة بصيغة JSON تتيح لأي برنامج أو وكيل ذكاء اصطناعي اللعب.
- منشورة على Cloudflare Workers، مع اختبارات آلية ومحاكاة 4000 مباراة لضبط التوازن.`},
{t:'بوت تليجرام لمتابعة أسعار الذهب والفضة مع رسوم بيانية وتقارير كل ساعة', sub:'157', tags:['239','186','377'], imgs:['p5_1'], d:`بوت تليجرام يعمل تلقائيًا على السحابة:
- يجمع أسعار الذهب والفضة من الإنترنت كل 5 دقائق ويحفظها في قاعدة بيانات.
- يرسل تقريرًا بالأسعار كل ساعة.
- يرسم رسومًا بيانية للأسعار لفترات مختلفة (يوم، أسبوع، شهر، 3 شهور، سنة) بالضغط على أزرار داخل المحادثة.
- يدعم صلاحيات المستخدمين وتوقيت القاهرة.

التقنيات: Python، Flask، Telegram Bot API، PostgreSQL، Matplotlib.
(الرسم في الصورة ببيانات تجريبية للعرض)`}];
window.postPF=async(i)=>{const it=PF[i]; const f=[...document.querySelectorAll('form')].find(f=>f.querySelector('input[name=title]')&&f.querySelector('input[type=file]')); const fd=new FormData(f); fd.set('title',it.t); fd.set('description',it.d); fd.set('category_id','153'); fd.set('subcategory_id',it.sub); fd.delete('tags[]'); it.tags.forEach(t=>fd.append('tags[]',t)); fd.set('url',it.url||''); fd.delete('files[]'); for(const n of it.imgs){const b=await fetch('https://raw.githubusercontent.com/Mohamed-Harraz/tidebid/e7caa46/'+n+'.jpg').then(r=>r.blob()); fd.append('files[]',new File([b],n+'.jpg',{type:'image/jpeg'}))} const r=await fetch(f.action,{method:'POST',body:fd,headers:{'X-Requested-With':'XMLHttpRequest','Accept':'application/json'}}); const t=await r.text(); let m=''; try{m=JSON.parse(t).msg||JSON.parse(t).message||''}catch(e){m=t.replace(/<[^>]+>/g,' ').replace(/https?:\S+/g,'').replace(/\s+/g,' ').slice(0,150)} return r.status+' '+m};
'kf loaded';
