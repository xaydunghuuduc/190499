/* ===== BỘ ĐIỀU HƯỚNG CÁC TRANG — bạn KHÔNG cần sửa file này =====
   Mỗi mục menu là một trang riêng, địa chỉ dạng:
   #gioi-thieu   #linh-vuc   #du-an   #tin-tuc   #tuyen-dung   #lien-he
   #tin-tuc--ten-bai   (chi tiết một bài)   #du-an-loc-cau-duong (lọc dự án) */
(function () {
  var C = window.CAU_HINH || {}, H = window.CHUNG, E = H.esc;
  var DATA = { 'tin-tuc': window.TIN_TUC || [], 'du-an': window.DU_AN || [], 'linh-vuc': window.LINH_VUC || [], 'tuyen-dung': window.TUYEN_DUNG || [], 'gioi-thieu': [], 'lien-he': [] };
  var TIEU_DE = { 'tin-tuc': 'Tin tức', 'du-an': 'Dự án', 'linh-vuc': 'Lĩnh vực hoạt động', 'tuyen-dung': 'Tuyển dụng', 'gioi-thieu': 'Giới thiệu', 'lien-he': 'Liên hệ' };
  var KHOA_TEN = { 'tin-tuc': 'tieuDe', 'du-an': 'ten', 'linh-vuc': 'ten', 'tuyen-dung': 'viTri' };
  var THE = { 'tin-tuc': window.theTin, 'du-an': window.theDuAn, 'linh-vuc': window.theLinhVuc, 'tuyen-dung': window.theTuyenDung };
  var KHAC = { 'tin-tuc': 'Tin khác', 'du-an': 'Dự án khác', 'linh-vuc': 'Lĩnh vực khác', 'tuyen-dung': 'Vị trí khác' };
  var TEN = ' | Xây dựng Hữu Đức';

  var main = document.getElementById('noi-dung');
  window.dungThanhBen();

  function luoi(items, the) { return '<div class="luoi">' + items.map(the).join('') + '</div>'; }
  function chan() { return '<footer>© 2026 XÂY DỰNG HỮU ĐỨC. Giữ toàn quyền.</footer>'; }
  function cta(loai) {
    var sdt = E(C.sdt || ''), em = E(C.email || '');
    if (loai === 'tuyen-dung')
      return '<section class="cta"><div><h2>Ứng tuyển ngay</h2><p>Gửi hồ sơ về ' + em + ' hoặc gọi ' + sdt + '.</p></div>' +
        '<div class="cta-n"><a class="btn" href="mailto:' + em + '">' + em + '</a><a class="btn" href="tel:' + sdt + '">Gọi ' + sdt + '</a></div></section>';
    return '<section class="cta"><div><h2>Bạn cần tư vấn và báo giá?</h2><p>Liên hệ trực tiếp để được hỗ trợ.</p></div>' +
      '<div class="cta-n"><a class="btn" href="tel:' + sdt + '">Gọi ' + sdt + '</a><a class="btn" href="mailto:' + em + '">' + em + '</a></div></section>';
  }
  function bang(cap) {
    cap = cap.filter(function (p) { return p[1]; });
    return cap.length ? '<div class="thongtin">' + cap.map(function (p) { return '<div><b>' + p[0] + '</b><span>' + E(p[1]) + '</span></div>'; }).join('') + '</div>' : '';
  }

  /* ----- Kiểu cho thanh lọc, ô tên công ty và màn chào ----- */
  (function () {
    var st = document.createElement('style');
    st.textContent =
      '.thanh-loc{display:flex;flex-wrap:wrap;gap:12px;margin:8px 0 24px}' +
      '.thanh-loc select,.thanh-loc input{font:inherit;font-size:15px;padding:11px 14px;border:1px solid #a9b0b7;border-radius:4px;background:#fff;color:#2b3238;min-width:180px}' +
      '.thanh-loc input{flex:1 1 240px}' +
      '.thanh-loc select:focus,.thanh-loc input:focus{outline:2px solid #AD532F;outline-offset:0}' +
      '.hs{background:#fff;border:1px solid #dcc9b7;border-radius:6px;padding:32px;box-shadow:0 1px 4px rgba(0,0,0,.06);margin:8px 0 24px}' +
      '.hs-top{display:flex;flex-wrap:wrap;align-items:center;gap:20px}' +
      '.hs-logo{width:80px;height:80px;border:1px solid #dcc9b7;border-radius:4px;display:flex;align-items:center;justify-content:center;background:#fff;flex:0 0 auto}' +
      '.hs-logo img{height:64px;width:auto;display:block}' +
      '.hs-ten{display:flex;flex-direction:column;gap:6px;flex:1 1 260px}' +
      '.hs-name{font-size:clamp(20px,3vw,30px);font-weight:800;color:#1b1f23;text-transform:uppercase;line-height:1.2}' +
      '.hs-mst{padding:10px 16px;background:#F3E9DE;color:#3a424a;font-size:14px;font-weight:700;border-radius:4px}' +
      '@keyframes hd-vao{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:none}}' +
      '@keyframes hd-logo{0%{opacity:0;transform:scale(.8)}60%{opacity:1;transform:scale(1.04)}100%{opacity:1;transform:scale(1)}}' +
      '@keyframes hd-vach{from{transform:scaleX(0)}to{transform:scaleX(1)}}' +
      '#noi-dung.chuyen>*{animation:hd-vao .55s cubic-bezier(.2,.7,.2,1) both}' +
      '#noi-dung.chuyen>*:nth-child(2){animation-delay:.07s}#noi-dung.chuyen>*:nth-child(3){animation-delay:.14s}' +
      '#noi-dung.chuyen>*:nth-child(4){animation-delay:.21s}#noi-dung.chuyen>*:nth-child(n+5){animation-delay:.28s}' +
      '#man-chao{position:fixed;top:0;right:0;bottom:0;left:0;z-index:9999;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:22px;background:#FBF7F1;transition:opacity .45s ease,visibility .45s}' +
      '#man-chao.an{opacity:0;visibility:hidden}' +
      '#man-chao img{height:96px;width:auto;animation:hd-logo .7s ease both}' +
      '#man-chao i{display:block;width:120px;height:4px;background:#AD532F;transform-origin:left;animation:hd-vach .8s ease both .1s}' +
      '@media (prefers-reduced-motion:reduce){#noi-dung.chuyen>*,#man-chao img,#man-chao i{animation:none}}';
    document.head.appendChild(st);
  })();

  function hoSoCty() {
    return '<div class="hs"><div class="hs-top"><div class="hs-logo"><img src="images/logo.png" alt="Logo Hữu Đức"></div>' +
      '<div class="hs-ten"><div class="hs-name">Xây dựng Hữu Đức</div></div>' +
      (C.maSoThue ? '<div class="hs-mst">MST: ' + E(C.maSoThue) + '</div>' : '') + '</div></div>';
  }

  /* ----- Thanh lọc: ô chọn + tìm kiếm nhanh ----- */
  function boDau(s) { return String(s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd'); }
  function duyNhat(list, k) {
    var o = [], s = {};
    list.forEach(function (x) { var v = x[k]; if (v && !s[v]) { s[v] = 1; o.push([v, v]); } });
    return o;
  }
  function boLoc(loai, list) {
    if (loai === 'tin-tuc') return [{ k: 'loai', nhan: 'Tất cả thẻ tin', ds: (window.TIN_LOAI || []).map(function (l) { return [l.id, l.ten]; }) }];
    if (loai === 'du-an') return [{ k: 'loai', nhan: 'Tất cả lĩnh vực', ds: (window.LINH_VUC || []).map(function (l) { return [l.id, l.ten]; }) }];
    if (loai === 'tuyen-dung') return [
      { k: 'phongBan', nhan: 'Tất cả phòng ban', ds: duyNhat(list, 'phongBan') },
      { k: 'viTri', nhan: 'Tất cả vị trí', ds: duyNhat(list, 'viTri') },
      { k: 'hinhThuc', nhan: 'Tất cả hình thức', ds: duyNhat(list, 'hinhThuc') }
    ];
    return [];
  }
  var TIM = { 'tin-tuc': ['tieuDe', 'tomTat'], 'du-an': ['ten', 'diaDiem', 'tomTat'], 'tuyen-dung': ['viTri', 'phongBan', 'hinhThuc', 'diaDiem'] };
  function thanhLoc(loai, list, loc) {
    return '<div class="thanh-loc">' + boLoc(loai, list).map(function (f) {
      return '<select data-k="' + f.k + '" aria-label="' + E(f.nhan) + '"><option value="">' + E(f.nhan) + '</option>' +
        f.ds.map(function (d) { return '<option value="' + E(d[0]) + '"' + (f.k === 'loai' && d[0] === loc ? ' selected' : '') + '>' + E(d[1]) + '</option>'; }).join('') + '</select>';
    }).join('') + '<input type="search" placeholder="Tìm kiếm nhanh..." aria-label="Tìm kiếm nhanh"></div><div id="ds-loc"></div>';
  }
  function ganLoc(loai, list) {
    var box = main.querySelector('.thanh-loc'), ds = document.getElementById('ds-loc');
    function ap() {
      var sel = box.querySelectorAll('select'), q = boDau(box.querySelector('input').value).trim();
      var kq = list.filter(function (x) {
        for (var i = 0; i < sel.length; i++) { var v = sel[i].value; if (v && x[sel[i].getAttribute('data-k')] !== v) return false; }
        if (q && boDau((TIM[loai] || []).map(function (k) { return x[k] || ''; }).join(' ')).indexOf(q) < 0) return false;
        return true;
      });
      ds.innerHTML = kq.length ? luoi(kq, THE[loai]) : '<p>Không có kết quả phù hợp.</p>';
    }
    box.addEventListener('change', ap);
    box.addEventListener('input', ap);
    ap();
  }

  /* ----- TRANG CHỦ ----- */
  function trangChu() {
    document.title = 'Xây dựng Hữu Đức';
    main.innerHTML = document.getElementById('tpl-home').innerHTML;
    document.getElementById('gt-tomtat').textContent = (window.GIOI_THIEU || {}).tomTat || '';
    document.getElementById('ds-so-lieu').innerHTML = (C.soLieu || []).map(function (s, i, a) {
      return '<div style="padding:28px 24px;text-align:center' + (i < a.length - 1 ? ';border-right:1px solid #dcc9b7' : '') + '"><div style="font-weight:700;font-size:44px;color:#85391d">' + E(s[0]) + '</div><div style="font-size:15px;color:#3a424a">' + E(s[1]) + '</div></div>';
    }).join('');
    document.getElementById('ds-linh-vuc').innerHTML = DATA['linh-vuc'].map(window.theLinhVuc).join('');
    document.getElementById('ds-du-an').innerHTML = DATA['du-an'].slice(0, 3).map(window.theDuAn).join('');
    document.getElementById('ds-tin-tuc').innerHTML = DATA['tin-tuc'].slice(0, 3).map(window.theTin).join('');
    window.dienThongTin();
  }

  function render() {
    var h = (location.hash || '').replace(/^#/, '');
    var loai = 'trang-chu', id = null, loc = null;
    if (h && h !== 'trang-chu') {
      if (h.indexOf('du-an-loc-') === 0) { loai = 'du-an'; loc = h.slice(10); }
      else if (h.indexOf('tin-tuc-loc-') === 0) { loai = 'tin-tuc'; loc = h.slice(12); }
      else { var p = h.split('--'); loai = p[0]; id = p[1] || null; }
    }
    window.scrollTo(0, 0);
    window.datMuc(loai);
    if (loai === 'trang-chu') return trangChu();
    if (!DATA[loai]) {
      document.title = 'Không tìm thấy' + TEN;
      main.innerHTML = '<div class="trang"><h1>Không tìm thấy trang</h1><a class="more" href="#trang-chu">← Về trang chủ</a></div>' + chan();
      return;
    }
    var list = DATA[loai];

    /* ----- GIỚI THIỆU ----- */
    if (loai === 'gioi-thieu') {
      var G = window.GIOI_THIEU || {};
      document.title = 'Giới thiệu' + TEN;
      var g = '<div class="trang"><h1>Giới thiệu</h1>';
      if (G.anhDaiDien) g += H.anh(G.anhDaiDien, 'hero', 'clamp(220px,34vw,460px)', 'Giới thiệu');
      if (G.tomTat) g += '<p class="tomtat">' + E(G.tomTat) + '</p>';
      var sl = C.soLieu || [];
      if (sl.length) g += '<div class="solieu">' + sl.map(function (s) { return '<div><strong>' + E(s[0]) + '</strong><span>' + E(s[1]) + '</span></div>'; }).join('') + '</div>';
      g += '<div class="noidung">' + window.noiDungHTML(G.noiDung) + '</div></div>' + cta(loai) + chan();
      main.innerHTML = g;
      return;
    }

    /* ----- LIÊN HỆ ----- */
    if (loai === 'lien-he') {
      document.title = 'Liên hệ' + TEN;
      var dong = [['Địa chỉ', C.diaChi], ['Điện thoại', C.sdt], ['Email', C.email], ['Mã số thuế', C.maSoThue], ['Giờ làm việc', C.gioLamViec]].filter(function (p) { return p[1]; });
      var ban = C.banDo ? '<iframe src="' + E(C.banDo) + '" style="border:0;width:100%;height:100%;min-height:320px" loading="lazy" allowfullscreen></iframe>'
        : '<div class="anh-trong-lh">[BẢN ĐỒ] Dán link nhúng Google Maps vào mục banDo trong du-lieu.js</div>';
      main.innerHTML = '<div class="trang"><h1>Liên hệ</h1>' + hoSoCty() +
        '<div class="lh"><div class="lh-tt">' + dong.map(function (p) { return '<div><b>' + p[0] + '</b><span>' + E(p[1]) + '</span></div>'; }).join('') + '</div><div class="lh-bd">' + ban + '</div></div></div>' + cta(loai) + chan();
      return;
    }

    /* ----- DANH SÁCH ----- */
    if (!id) {
      document.title = TIEU_DE[loai] + TEN;
      if (loai === 'linh-vuc') {
        main.innerHTML = '<div class="trang"><h1>' + TIEU_DE[loai] + '</h1>' + luoi(list, THE[loai]) + '</div>' + cta(loai) + chan();
        return;
      }
      main.innerHTML = '<div class="trang"><h1>' + TIEU_DE[loai] + '</h1>' + thanhLoc(loai, list, loc) + '</div>' + cta(loai) + chan();
      ganLoc(loai, list);
      return;
    }

    /* ----- CHI TIẾT ----- */
    var item = null;
    for (var i = 0; i < list.length; i++) if (list[i].id === id) item = list[i];
    if (!item) {
      document.title = 'Không tìm thấy' + TEN;
      main.innerHTML = '<div class="trang"><h1>Không tìm thấy nội dung</h1><p>Đường dẫn có thể đã bị đổi hoặc bài viết đã bị xóa.</p>' +
        '<a class="more" href="#' + loai + '">← Về danh sách ' + TIEU_DE[loai] + '</a></div>' + chan();
      return;
    }
    var tieuDe = item[KHOA_TEN[loai]];
    document.title = tieuDe + TEN;
    var s = '<div class="trang"><a class="more back" href="#' + loai + '">← Quay lại ' + TIEU_DE[loai] + '</a><h1>' + E(tieuDe) + '</h1>';
    if (loai === 'tin-tuc') {
      var meta = [item.ngay, H.tenTin(item.loai)].filter(Boolean).join(' · ');
      if (meta) s += '<div class="meta">' + E(meta) + '</div>';
    }
    if (item.anhDaiDien) s += H.anh(item.anhDaiDien, 'hero', 'clamp(220px,34vw,460px)', tieuDe);
    if (loai === 'du-an') s += bang([['Lĩnh vực', H.tenLoai(item.loai)], ['Địa điểm', item.diaDiem], ['Chủ đầu tư', item.chuDauTu], ['Năm hoàn thành', item.nam], ['Quy mô', item.quyMo], ['Giá trị', item.giaTri]]);
    if (loai === 'tuyen-dung') s += bang([['Phòng ban', item.phongBan], ['Hình thức', item.hinhThuc], ['Số lượng', item.soLuong], ['Địa điểm làm việc', item.diaDiem], ['Mức lương', item.mucLuong], ['Hạn nộp hồ sơ', item.hanNop]]);
    if (item.tomTat && loai !== 'tin-tuc') s += '<p class="tomtat">' + E(item.tomTat) + '</p>';
    s += '<div class="noidung">' + window.noiDungHTML(item.noiDung) + '</div>';
    if (loai === 'du-an' && item.thuVienAnh && item.thuVienAnh.length) {
      s += '<h2 class="phu">Hình ảnh công trình</h2><div class="thuvien">' +
        item.thuVienAnh.map(function (u) { return '<a href="' + E(u) + '" class="tv" data-src="' + E(u) + '">' + H.anh(u, 'tv-anh', '170px', tieuDe) + '</a>'; }).join('') + '</div>';
    }
    if (loai === 'linh-vuc') {
      var duan = (window.DU_AN || []).filter(function (x) { return x.loai === item.id; }).slice(0, 3);
      if (duan.length) s += '<h2 class="phu">Dự án thuộc lĩnh vực này</h2>' + luoi(duan, window.theDuAn);
    }
    var khac = list.filter(function (x) { return x.id !== item.id; }).slice(0, 3);
    if (khac.length) s += '<h2 class="phu">' + KHAC[loai] + '</h2>' + luoi(khac, THE[loai]);
    main.innerHTML = s + '</div>' + cta(loai) + chan();
  }

  /* Bấm ảnh thư viện để phóng to (gắn một lần) */
  main.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a.tv');
    if (!a) return;
    e.preventDefault();
    var o = document.createElement('div');
    o.className = 'lightbox';
    o.innerHTML = '<img src="' + E(a.getAttribute('data-src')) + '" alt="">';
    o.onclick = function () { o.remove(); };
    document.addEventListener('keydown', function k(ev) { if (ev.key === 'Escape') { o.remove(); document.removeEventListener('keydown', k); } });
    document.body.appendChild(o);
  });

  /* ----- Màn chào khi tải / tải lại trang (chuyển trang không có hiệu ứng) ----- */
  var mc = document.createElement('div');
  mc.id = 'man-chao';
  mc.innerHTML = '<img src="images/logo.png" alt=""><i></i>';
  document.body.appendChild(mc);
  setTimeout(function () { mc.classList.add('an'); setTimeout(function () { mc.remove(); }, 600); }, 900);

  window.addEventListener('hashchange', render);
  render();
  main.classList.add('chuyen');
  setTimeout(function () { main.classList.remove('chuyen'); }, 1000);
})();
