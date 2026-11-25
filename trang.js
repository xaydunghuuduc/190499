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
      main.innerHTML = '<div class="trang"><h1>Liên hệ</h1><p class="tomtat">Bạn có dự án cần thi công? Hãy liên hệ để được tư vấn và báo giá.</p>' +
        '<div class="lh"><div class="lh-tt">' + dong.map(function (p) { return '<div><b>' + p[0] + '</b><span>' + E(p[1]) + '</span></div>'; }).join('') + '</div><div class="lh-bd">' + ban + '</div></div></div>' + cta(loai) + chan();
      return;
    }

    /* ----- DANH SÁCH ----- */
    if (!id) {
      document.title = TIEU_DE[loai] + TEN;
      var items = list, chips = '';
      if (loai === 'du-an') {
        chips = '<div class="loc"><a href="#du-an" class="' + (!loc ? 'on' : '') + '">Tất cả</a>' +
          (window.LINH_VUC || []).map(function (l) { return '<a href="#du-an-loc-' + E(l.id) + '" class="' + (loc === l.id ? 'on' : '') + '">' + E(l.ten) + '</a>'; }).join('') + '</div>';
        if (loc) items = list.filter(function (x) { return x.loai === loc; });
      }
      main.innerHTML = '<div class="trang"><h1>' + TIEU_DE[loai] + '</h1>' + chips +
        (items.length ? luoi(items, THE[loai]) : '<p>Chưa có nội dung.</p>') + '</div>' + cta(loai) + chan();
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
      var meta = [item.ngay, item.chuyenMuc].filter(Boolean).join(' · ');
      if (meta) s += '<div class="meta">' + E(meta) + '</div>';
    }
    if (item.anhDaiDien) s += H.anh(item.anhDaiDien, 'hero', 'clamp(220px,34vw,460px)', tieuDe);
    if (loai === 'du-an') s += bang([['Lĩnh vực', H.tenLoai(item.loai)], ['Địa điểm', item.diaDiem], ['Chủ đầu tư', item.chuDauTu], ['Năm hoàn thành', item.nam], ['Quy mô', item.quyMo], ['Giá trị', item.giaTri]]);
    if (loai === 'tuyen-dung') s += bang([['Số lượng', item.soLuong], ['Địa điểm làm việc', item.diaDiem], ['Mức lương', item.mucLuong], ['Hạn nộp hồ sơ', item.hanNop]]);
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

  window.addEventListener('hashchange', render);
  render();
})();
