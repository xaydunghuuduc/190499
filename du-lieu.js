/* =====================================================================
   DU-LIEU.JS — TẢI NỘI DUNG TỪ THƯ MỤC noi-dung/
   Bạn KHÔNG cần sửa file này. Nội dung được soạn tại trang /admin
   (hoặc sửa trực tiếp các file .json trong thư mục noi-dung/).
   ===================================================================== */

/* Ba thẻ tin (đổi tên thẻ thì sửa chữ trong ten, KHÔNG đổi id) */
window.TIN_LOAI = [
  { id: "tin-du-an", ten: "Tin dự án" },
  { id: "tin-tuyen-dung", ten: "Tin tuyển dụng" },
  { id: "tin-hoat-dong", ten: "Tin hoạt động" }
];

(function () {
  var FILES = ['cau-hinh', 'gioi-thieu', 'linh-vuc', 'du-an', 'tin-tuc', 'tuyen-dung'];

  function lay(ten) {
    return fetch('noi-dung/' + ten + '.json', { cache: 'no-cache' }).then(function (r) {
      if (!r.ok) throw new Error(ten + ': ' + r.status);
      return r.json();
    });
  }

  /* "2026-11-25" -> "25/11/2026"; chuỗi khác giữ nguyên */
  function ngayDep(s) {
    var m = /^(\d{4})-(\d{2})-(\d{2})/.exec(String(s || ''));
    return m ? m[3] + '/' + m[2] + '/' + m[1] : (s || '');
  }

  function nap(d) {
    var ch = d['cau-hinh'] || {};
    ch.soLieu = (ch.soLieu || []).map(function (x) { return [x.so, x.nhan]; });
    window.CAU_HINH = ch;
    window.GIOI_THIEU = d['gioi-thieu'] || {};
    window.LINH_VUC = (d['linh-vuc'] || {}).muc || [];
    window.DU_AN = (d['du-an'] || {}).muc || [];
    window.TUYEN_DUNG = (d['tuyen-dung'] || {}).muc || [];

    var tin = ((d['tin-tuc'] || {}).muc || []).map(function (t, i) {
      t._thuTu = i;
      return t;
    });
    /* Bài mới nhất lên đầu; cùng ngày thì giữ thứ tự trong file */
    tin.sort(function (a, b) {
      var x = String(a.ngay || ''), y = String(b.ngay || '');
      return x < y ? 1 : x > y ? -1 : a._thuTu - b._thuTu;
    });
    tin.forEach(function (t) { t.ngay = ngayDep(t.ngay); });
    window.TIN_TUC = tin;

    /* Mục thiếu mã đường dẫn (bài mới tạo trong trang quản trị) -> tự tạo từ tiêu đề */
    [['TIN_TUC', 'tieuDe'], ['DU_AN', 'ten'], ['TUYEN_DUNG', 'viTri'], ['LINH_VUC', 'ten']].forEach(function (p) {
      var ds = window[p[0]], da = {};
      ds.forEach(function (x) { if (x.id) da[x.id] = 1; });
      ds.forEach(function (x) {
        if (x.id) return;
        var goc = String(x[p[1]] || 'muc').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
          .replace(/đ/g, 'd').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || 'muc';
        var id = goc, n = 2;
        while (da[id]) id = goc + '-' + n++;
        da[id] = 1; x.id = id;
      });
    });
  }

  function chayWeb() {
    ['chung.js', 'trang.js'].reduce(function (truoc, f) {
      return truoc.then(function () {
        return new Promise(function (ok, loi) {
          var s = document.createElement('script');
          s.src = f; s.onload = ok; s.onerror = function () { loi(new Error(f)); };
          document.body.appendChild(s);
        });
      });
    }, Promise.resolve());
  }

  Promise.all(FILES.map(lay)).then(function (kq) {
    var d = {};
    FILES.forEach(function (f, i) { d[f] = kq[i]; });
    nap(d);
    return chayWeb();
  }).catch(function (e) {
    var m = document.getElementById('noi-dung');
    if (m) m.innerHTML = '<div style="padding:48px 64px;font-size:17px;line-height:1.6;color:#2b3238"><h1>Không tải được nội dung</h1><p>Hãy mở web qua địa chỉ trên mạng (không mở trực tiếp file index.html bằng cách bấm đúp).</p><p style="color:#6b5a4d;font-size:14px">' + String(e.message || e) + '</p></div>';
  });
})();
