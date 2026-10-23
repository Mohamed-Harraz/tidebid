window.KFMAP = {
  bot: { cat: '30', sub: '37', tags: ['239', '296'] },
  alert: { cat: '30', sub: '37', tags: ['239', '186'] },
  scrape: { cat: '30', sub: '37', tags: ['186', '239'] },
  excel: { cat: '30', sub: '37', tags: ['17', '239'] },
  landing: { cat: '30', sub: '33', tags: ['298', '19', '20', '39', '342'] },
  pcb: { cat: '112', sub: '113', tags: ['412', '164', '216'] },
  mcu: { cat: '30', sub: '37', tags: ['294', '164', '126', '179'] },
  matlab: { cat: '30', sub: '37', tags: ['315', '216'] }
};
window.IMG = 'https://raw.githubusercontent.com/Mohamed-Harraz/tidebid/e7caa46/k/';
window.fillSV = async key => {
  const d = KH[key], m = KFMAP[key], q = s => document.querySelector(s), sl = ms => new Promise(r => setTimeout(r, ms));
  const desc = d.desc + '\n\nمميزات الخدمة:\n' + d.feats.map(f => '- ' + f[0] + ': ' + f[1]).join('\n') +
    '\n\nما ستستلمه:\n' + d.gets.map(f => '- ' + f[0] + ': ' + f[1]).join('\n');
  q('input[name=title]').value = d.title;
  jQuery(q('select[name=category_id]')).val(m.cat).trigger('change'); await sl(2000);
  jQuery(q('select[name=subcategory_id]')).val(m.sub).trigger('change');
  q('textarea[name=description]').value = desc.slice(0, 3000);
  q('textarea[name=instructions]').value = d.instr.slice(0, 1000);
  jQuery(q('select[name="tags[]"]')).val(m.tags).trigger('change');
  q('input[name=price]').value = d.price;
  jQuery(q('select[name=duration]')).val(String(d.days)).trigger('change');
  const names = ['first', 'second', 'third', 'fourth', 'fifth'];
  d.ups.forEach((u, i) => {
    q(`input[name=${names[i]}_addon_title]`).value = u[0];
    q(`input[name=${names[i]}_addon_price]`).value = u[1];
    jQuery(q(`select[name=${names[i]}_addon_duration]`)).val(String(parseInt(u[2], 10))).trigger('change');
  });
  const roots = document.querySelectorAll('.filepond--root');
  const put = async (root, names) => { const inp = root.querySelector('input.filepond--browser'); const dt = new DataTransfer();
    for (const n of names) { const b = await fetch(IMG + n + '.jpg').then(x => x.blob()); dt.items.add(new File([b], n + '.jpg', { type: 'image/jpeg' })); }
    inp.files = dt.files; inp.dispatchEvent(new Event('change', { bubbles: true })); };
  if (!roots[0].querySelectorAll('.filepond--item').length) await put(roots[0], [d.imgs + '_cover']);
  if (!roots[1].querySelectorAll('.filepond--item').length) await put(roots[1], [1, 2, 3, 4].map(i => d.imgs + '_g' + i));
  const tog = [...document.querySelectorAll('a')].filter(a => /أضف إضافات أخري|أضف إضافات أخرى/.test(a.textContent)); if (tog[0]) tog[0].click(); await sl(400);
  for (const w of ['ثانية', 'ثالثة', 'رابعة']) { const a = [...document.querySelectorAll('a.showNextAddon')].find(a => a.textContent.includes('إضافة ' + w)); if (a) { a.click(); await sl(400); } }
  await sl(5000);
  const b = [...document.querySelectorAll('button[type=submit],input[type=submit]')].find(b => b.closest('form') && b.closest('form').querySelector('input[name=title]'));
  b.scrollIntoView({ block: 'center' }); await sl(400);
  const r = b.getBoundingClientRect();
  return { desc: desc.length, imgs: [roots[0].querySelectorAll('.filepond--item').length, roots[1].querySelectorAll('.filepond--item').length], addons: ['first','second','third','fourth'].map(n => q(`input[name=${n}_addon_title]`).offsetParent ? 'v' : 'h').join(''), sub: q('select[name=subcategory_id]').value, dur: q('select[name=duration]').value, xy: [Math.round(r.x + r.width / 2), Math.round(r.y + r.height / 2)] };
};
'kf2 loaded';
