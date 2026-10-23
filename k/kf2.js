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
  const blob = async n => new File([await fetch(IMG + n + '.jpg').then(r => r.blob())], n + '.jpg', { type: 'image/jpeg' });
  const mainP = FilePond.find(q('input[name=main_image]').closest('.filepond--root'));
  const otherP = FilePond.find(q('input[name="other_images[]"]').closest('.filepond--root'));
  if (!mainP.getFiles().length) await mainP.addFile(await blob(d.imgs + '_cover')).catch(e => e);
  if (!otherP.getFiles().length) for (const i of [1, 2, 3, 4]) { await otherP.addFile(await blob(d.imgs + '_g' + i)).catch(e => e); await sl(300); }
  await sl(1500);
  const b = [...document.querySelectorAll('button[type=submit],input[type=submit]')].find(b => b.closest('form') && b.closest('form').querySelector('input[name=title]'));
  b.scrollIntoView({ block: 'center' }); await sl(400);
  const r = b.getBoundingClientRect();
  return { desc: desc.length, main: mainP.getFiles().map(f => f.filename + ':' + f.status), other: otherP.getFiles().map(f => f.filename + ':' + f.status), sub: q('select[name=subcategory_id]').value, dur: q('select[name=duration]').value, xy: [Math.round(r.x + r.width / 2), Math.round(r.y + r.height / 2)] };
};
'kf2 loaded';
