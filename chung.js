/* ===== CODE DÙNG CHUNG CHO CẢ WEB — bạn KHÔNG cần sửa file này ===== */
(function () {
  var C = window.CAU_HINH || {};
  var LV = window.LINH_VUC || [], DA = window.DU_AN || [], TT = window.TIN_TUC || [];

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }

  var ICONS = {
    'dan-dung': '<path d="M3 21V9l9-6 9 6v12M9 21v-7h6v7"></path>',
    'cau-duong': '<path d="M10 3L8 12M14 3L16 12M12 4v2M12 8v2M3 12h18M3 21h18M5 21c0-5 3-9 7-9s7 4 7 9"></path>',
    'vat-lieu': '<path d="M3 5h18v5H3zM3 10h18v5H3zM3 15h18v5H3zM9 5v5M15 10v5M9 15v5"></path>',
    'tin': '<rect x="4" y="4" width="16" height="16" rx="1"></rect><path d="M8 9h8M8 13h8M8 17h5"></path>'
  };
  function icon(k) {
    return '<svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#85391d" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (ICONS[k] || ICONS.tin) + '</svg>';
  }

  function link(loai, id) { return '#' + loai + (id ? '--' + id : ''); }
  function tenLoai(id) {
    for (var i = 0; i < LV.length; i++) if (LV[i].id === id) return LV[i].ten;
    return id || '';
  }

  /* Ảnh lỗi / chưa có file -> hiện ô xám ghi tên file cần chép vào */
  window.anhLoi = function (img) {
    var d = document.createElement('div');
    d.className = img.className;
    var ten = (img.getAttribute('src') || '').split('/').pop();
    d.textContent = 'ẢNH: ' + ten;
    d.style.cssText = 'display:flex;align-items:center;justify-content:center;text-align:center;box-sizing:border-box;padding:8px;background:#9aa3ab;color:#fff;font-size:14px;letter-spacing:.06em;width:100%;height:' + (img.getAttribute('data-h') || '190px');
    img.parentNode.replaceChild(d, img);
  };
  function chuanAnh(src) { return String(src || '').replace(/^\/+/, ''); }
  function anh(src, cls, h, alt) {
    src = chuanAnh(src);
    return '<img class="' + cls + '" data-h="' + h + '" src="' + esc(src) + '" alt="' + esc(alt || '') + '" loading="lazy" onerror="anhLoi(this)" style="display:block;width:100%;height:' + h + ';object-fit:cover">';
  }

  /* ===== Các thẻ (card) ===== */
  window.theLinhVuc = function (x) {
    return '<a class="card lv" href="' + link('linh-vuc', x.id) + '" style="padding:28px 24px;background:rgba(255,255,255,0.72);border:1px solid #a9b0b7;border-top:4px solid #AD532F;display:flex;flex-direction:column;gap:10px">' +
      icon(x.bieuTuong) + '<h3 style="margin:0;font-size:20px;font-weight:600">' + esc(x.ten) + '</h3>' +
      '<p style="margin:0;font-size:15px;line-height:1.5;color:#3a424a">' + esc(x.tomTat) + '</p></a>';
  };
  window.theDuAn = function (x) {
    var hinh = x.anhDaiDien ? anh(x.anhDaiDien, 'zoom', '190px', x.ten)
      : '<div class="zoom" style="height:190px;display:flex;align-items:center;justify-content:center;background:#9aa3ab;color:#fff;font-size:14px;letter-spacing:.08em">CHƯA CÓ ẢNH</div>';
    var phu = [tenLoai(x.loai), x.diaDiem, x.nam].filter(Boolean).join(' · ');
    return '<a class="card pj" href="' + link('du-an', x.id) + '" style="display:flex;flex-direction:column;background:#f4f6f7;border:1px solid #a9b0b7">' + hinh +
      '<div style="padding:18px 20px;display:flex;flex-direction:column;gap:6px"><h3 style="margin:0;font-size:19px;font-weight:600">' + esc(x.ten) + '</h3><span style="font-size:14px;color:#3a424a">' + esc(phu) + '</span></div></a>';
  };
  function tenTin(id) {
    var L = window.TIN_LOAI || [];
    for (var i = 0; i < L.length; i++) if (L[i].id === id) return L[i].ten;
    return '';
  }
  window.theTin = function (x) {
    var hinh = x.anhDaiDien ? anh(x.anhDaiDien, 'zoom', '190px', x.tieuDe)
      : '<div class="zoom" style="height:190px;display:flex;align-items:center;justify-content:center;background:#9aa3ab;color:#fff;font-size:14px;letter-spacing:.08em">CHƯA CÓ ẢNH</div>';
    var the = tenTin(x.loai);
    return '<a class="card pj" href="' + link('tin-tuc', x.id) + '" style="display:flex;flex-direction:column;background:#f4f6f7;border:1px solid #a9b0b7">' + hinh +
      '<div style="padding:18px 20px;display:flex;flex-direction:column;gap:8px">' +
      (the ? '<span style="align-self:flex-start;padding:3px 10px;background:#AD532F;color:#fff;font-size:13px;font-weight:600;border-radius:3px">' + esc(the) + '</span>' : '') +
      '<h3 style="margin:0;font-size:19px;font-weight:600">' + esc(x.tieuDe) + '</h3>' +
      (x.ngay ? '<span style="font-size:14px;color:#3a424a">' + esc(x.ngay) + '</span>' : '') +
      (x.tomTat ? '<p style="margin:0;font-size:15px;line-height:1.5;color:#3a424a">' + esc(x.tomTat) + '</p>' : '') +
      '</div></a>';
  };

  window.theTuyenDung = function (x) {
    var phu = [x.phongBan, x.hinhThuc, x.soLuong ? 'Số lượng: ' + x.soLuong : '', x.diaDiem, x.mucLuong].filter(Boolean).join(' · ');
    return '<a class="card lv" href="' + link('tuyen-dung', x.id) + '" style="padding:28px 24px;background:rgba(255,255,255,0.72);border:1px solid #a9b0b7;border-top:4px solid #AD532F;display:flex;flex-direction:column;gap:10px">' +
      icon('tin') + '<h3 style="margin:0;font-size:20px;font-weight:600">' + esc(x.viTri) + '</h3>' +
      '<p style="margin:0;font-size:15px;line-height:1.5;color:#3a424a">' + esc(phu) + '</p></a>';
  };

  /* ===== Nội dung bài viết =====
     Nhận chuỗi văn bản soạn ở trang /admin (định dạng Markdown):
       # / ## tiêu đề, ### tiêu đề nhỏ, - gạch đầu dòng, 1. đánh số,
       **đậm**, *nghiêng*, [chữ](link), ![chú thích](images/anh.jpg), > trích dẫn
     Vẫn đọc được kiểu cũ (mảng các dòng chữ). */
  function inline(t) {
    t = esc(t);
    t = t.replace(/!\[([^\]]*)\]\(([^)\s]+)\)/g, function (m, a, u) { return anh(u.replace(/&amp;/g, '&'), 'hinh-bv', 'auto', a.replace(/&amp;/g, '&')); });
    t = t.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, function (m, a, u) {
      u = u.replace(/&amp;/g, '&');
      if (!/^(https?:|mailto:|tel:|#|\/|[\w.\-\/]+$)/i.test(u)) return a;
      var ngoai = /^https?:/i.test(u);
      return '<a href="' + esc(u) + '"' + (ngoai ? ' target="_blank" rel="noopener"' : '') + '>' + a + '</a>';
    });
    t = t.replace(/\*\*([^*]+)\*\*|__([^_]+)__/g, function (m, a, b) { return '<strong>' + (a || b) + '</strong>'; });
    t = t.replace(/(^|[^*\w])\*([^*\s][^*]*)\*/g, '$1<em>$2</em>').replace(/(^|[^_\w])_([^_\s][^_]*)_/g, '$1<em>$2</em>');
    t = t.replace(/`([^`]+)`/g, '<code>$1</code>');
    return t;
  }
  function markdownHTML(src) {
    var L = String(src || '').replace(/\r/g, '').split('\n'), out = [], i = 0, m;
    function trong(l) { return !/\S/.test(l); }
    while (i < L.length) {
      var l = L[i];
      if (trong(l)) { i++; continue; }
      if ((m = /^(#{1,6})\s+(.*)$/.exec(l))) { out.push(m[1].length <= 2 ? '<h2>' + inline(m[2]) + '</h2>' : '<h3>' + inline(m[2]) + '</h3>'); i++; continue; }
      if ((m = /^\s*!\[([^\]]*)\]\(([^)\s]+)\)\s*$/.exec(l))) {
        var cap = m[1].trim();
        out.push('<figure>' + anh(m[2], 'hinh-bv', 'auto', cap) + (cap ? '<figcaption>' + esc(cap) + '</figcaption>' : '') + '</figure>');
        i++; continue;
      }
      if (/^\s*[-*+]\s+/.test(l) || /^\s*\d+[.)]\s+/.test(l)) {
        var so = /^\s*\d+[.)]\s+/.test(l), it = [];
        while (i < L.length && (so ? /^\s*\d+[.)]\s+/ : /^\s*[-*+]\s+/).test(L[i])) {
          it.push('<li>' + inline(L[i].replace(/^\s*(?:[-*+]|\d+[.)])\s+/, '')) + '</li>'); i++;
        }
        out.push((so ? '<ol>' : '<ul>') + it.join('') + (so ? '</ol>' : '</ul>')); continue;
      }
      if (/^>\s?/.test(l)) {
        var q = [];
        while (i < L.length && /^>\s?/.test(L[i])) { q.push(L[i].replace(/^>\s?/, '')); i++; }
        out.push('<blockquote>' + inline(q.join(' ')) + '</blockquote>'); continue;
      }
      var p = [];
      while (i < L.length && !trong(L[i]) && !/^(#{1,6}\s|\s*[-*+]\s|\s*\d+[.)]\s|>\s?|\s*!\[[^\]]*\]\([^)\s]+\)\s*$)/.test(L[i])) {
        p.push(inline(L[i].replace(/(\s{2,}|\\)$/, '<br>').replace(/\s+$/, ''))); i++;
      }
      if (!p.length) { out.push('<p>' + inline(l) + '</p>'); i++; } else out.push('<p>' + p.join(' ') + '</p>');
    }
    return out.join('');
  }
  window.noiDungHTML = function (nd) {
    if (!Array.isArray(nd)) return markdownHTML(nd);
    var out = [], list = [];
    function flush() { if (list.length) { out.push('<ul>' + list.join('') + '</ul>'); list = []; } }
    nd.forEach(function (d) {
      d = String(d);
      if (d.indexOf('- ') === 0) { list.push('<li>' + esc(d.slice(2)) + '</li>'); return; }
      flush();
      if (d.indexOf('## ') === 0) out.push('<h2>' + esc(d.slice(3)) + '</h2>');
      else if (d.indexOf('anh:') === 0) {
        var p = d.slice(4).split('|'), src = p[0].trim(), cap = (p[1] || '').trim();
        out.push('<figure>' + anh(src, 'hinh-bv', 'auto', cap) + (cap ? '<figcaption>' + esc(cap) + '</figcaption>' : '') + '</figure>');
      } else out.push('<p>' + esc(d) + '</p>');
    });
    flush();
    return out.join('');
  };

  /* ===== Thanh bên trái ===== */
  var ASIDE = "<aside style=\"position:sticky;top:0;align-self:flex-start;height:100vh;z-index:20;flex:0 0 clamp(56px,10.5vh,92px);box-sizing:border-box;display:flex;flex-direction:column;align-items:center;justify-content:flex-start;gap:clamp(4px,2vh,18px);padding:clamp(6px,3vh,28px) 0;background:#B05830\">\n<a class=\"lg\" href=\"#trang-chu\" aria-label=\"Hữu Đức\" style=\"display:block\"><img src=\"images/logo.png\" alt=\"Logo Hữu Đức\" style=\"width:clamp(26px,6.4vh,68px);height:auto;aspect-ratio:300/460;display:block\"></a>\n<nav aria-label=\"Menu chính\" style=\"width:100%;display:flex;flex-direction:column;align-items:center;gap:clamp(1px,0.5vh,4px)\">\n<a class=\"nav on\" href=\"#trang-chu\" aria-label=\"Trang chủ\" style=\"width:clamp(26px,6.4vh,68px);height:clamp(30px,5.8vh,64px);border-radius:5px;box-sizing:border-box;display:flex;align-items:center;justify-content:center\"><svg width=\"38\" height=\"38\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"#fff\" stroke-width=\"1.7\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z\"></path></svg><span class=\"tip\">Trang chủ</span></a>\n<a class=\"nav\" href=\"#gioi-thieu\" aria-label=\"Giới thiệu\" style=\"width:clamp(26px,6.4vh,68px);height:clamp(30px,5.8vh,64px);border-radius:5px;box-sizing:border-box;display:flex;align-items:center;justify-content:center\"><svg width=\"38\" height=\"38\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"#fff\" stroke-width=\"1.7\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M5 21V3h10v18M15 9h4v12M3 21h18M9 8h2M9 12h2\"></path></svg><span class=\"tip\">Giới thiệu</span></a>\n<a class=\"nav\" href=\"#linh-vuc\" aria-label=\"Lĩnh vực hoạt động\" style=\"width:clamp(26px,6.4vh,68px);height:clamp(30px,5.8vh,64px);border-radius:5px;box-sizing:border-box;display:flex;align-items:center;justify-content:center\"><svg width=\"38\" height=\"38\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"#fff\" stroke-width=\"1.7\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><rect x=\"3.5\" y=\"3.5\" width=\"7\" height=\"7\" rx=\"1\"></rect><rect x=\"13.5\" y=\"3.5\" width=\"7\" height=\"7\" rx=\"1\"></rect><rect x=\"3.5\" y=\"13.5\" width=\"7\" height=\"7\" rx=\"1\"></rect><rect x=\"13.5\" y=\"13.5\" width=\"7\" height=\"7\" rx=\"1\"></rect></svg><span class=\"tip\">Lĩnh vực hoạt động</span></a>\n<a class=\"nav\" href=\"#du-an\" aria-label=\"Dự án\" style=\"width:clamp(26px,6.4vh,68px);height:clamp(30px,5.8vh,64px);border-radius:5px;box-sizing:border-box;display:flex;align-items:center;justify-content:center\"><svg width=\"38\" height=\"38\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"#fff\" stroke-width=\"1.7\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M5 21h8M9 21V4M3 7h18M18 7v5M16 12h4v3h-4z\"></path></svg><span class=\"tip\">Dự án</span></a>\n<a class=\"nav\" href=\"#tin-tuc\" aria-label=\"Tin tức\" style=\"width:clamp(26px,6.4vh,68px);height:clamp(30px,5.8vh,64px);border-radius:5px;box-sizing:border-box;display:flex;align-items:center;justify-content:center\"><svg width=\"38\" height=\"38\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"#fff\" stroke-width=\"1.7\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><rect x=\"4\" y=\"4\" width=\"16\" height=\"16\" rx=\"1\"></rect><path d=\"M8 9h8M8 13h8M8 17h5\"></path></svg><span class=\"tip\">Tin tức</span></a>\n<a class=\"nav\" href=\"#tuyen-dung\" aria-label=\"Tuyển dụng\" style=\"width:clamp(26px,6.4vh,68px);height:clamp(30px,5.8vh,64px);border-radius:5px;box-sizing:border-box;display:flex;align-items:center;justify-content:center\"><svg width=\"38\" height=\"38\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"#fff\" stroke-width=\"1.7\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><circle cx=\"9\" cy=\"8\" r=\"3.5\"></circle><path d=\"M2.5 20c0-3.5 3-6 6.5-6s6.5 2.5 6.5 6M17 6v6M14 9h6\"></path></svg><span class=\"tip\">Tuyển dụng</span></a>\n<a class=\"nav\" href=\"#lien-he\" aria-label=\"Liên hệ\" style=\"width:clamp(26px,6.4vh,68px);height:clamp(30px,5.8vh,64px);border-radius:5px;box-sizing:border-box;display:flex;align-items:center;justify-content:center\"><svg width=\"38\" height=\"38\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"#fff\" stroke-width=\"1.7\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a1 1 0 0 1-1 1A15 15 0 0 1 4 5a1 1 0 0 1 1-1z\"></path></svg><span class=\"tip\">Liên hệ</span></a>\n</nav>\n<div style=\"display:flex;flex-direction:column;align-items:center;gap:clamp(3px,1.4vh,12px);margin-top:auto\">\n<a class=\"nav soc\" href=\"#\" aria-label=\"Facebook\" style=\"display:flex;align-items:center;justify-content:center\"><svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" aria-hidden=\"true\"><path fill=\"#fff\" d=\"M14 8h2V5h-2.5C11.5 5 10 6.5 10 8.5V10H8v3h2v6h3v-6h2l.5-3H13V8.7c0-.4.3-.7 1-.7z\"></path></svg><span class=\"tip\">Facebook</span></a><a class=\"nav soc\" href=\"#\" aria-label=\"TikTok\" style=\"display:flex;align-items:center;justify-content:center\"><svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" aria-hidden=\"true\"><path fill=\"#fff\" d=\"M16 4c.3 2 1.6 3.3 3.5 3.5v3A6.3 6.3 0 0 1 16 9.4V15a5 5 0 1 1-5-5c.3 0 .7 0 1 .1v3.1a2 2 0 1 0 1 1.8V4z\"></path></svg><span class=\"tip\">TikTok</span></a><a class=\"nav soc\" href=\"#\" aria-label=\"YouTube\" style=\"display:flex;align-items:center;justify-content:center\"><svg width=\"26\" height=\"26\" viewBox=\"0 0 24 24\" aria-hidden=\"true\"><rect x=\"2\" y=\"5\" width=\"20\" height=\"14\" rx=\"4\" fill=\"#fff\"></rect><path d=\"M10 9l5 3-5 3z\" fill=\"#B8603A\"></path></svg><span class=\"tip\">YouTube</span></a><a class=\"nav soc\" href=\"#\" aria-label=\"Zalo\" style=\"display:flex;align-items:center;justify-content:center\"><span class=\"zl\" style=\"font-weight:700;font-size:13px;color:#fff\">Zalo</span><span class=\"tip\">Zalo</span></a>\n</div>\n</aside>";
  window.dungThanhBen = function () {
    var khung = document.getElementById('khung');
    if (!khung) return;
    khung.insertAdjacentHTML('afterbegin', ASIDE);
    var links = khung.querySelectorAll('aside a');
    var mapXH = { 'Facebook': 'facebook', 'TikTok': 'tiktok', 'YouTube': 'youtube', 'Zalo': 'zalo' };
    for (var i = 0; i < links.length; i++) {
      var a = links[i], ten = a.getAttribute('aria-label');
      if (mapXH[ten] && C[mapXH[ten]]) {
        a.setAttribute('href', C[mapXH[ten]]);
        a.setAttribute('target', '_blank'); a.setAttribute('rel', 'noopener');
      } else if (a.getAttribute('href') === '#') {
        a.addEventListener('click', function (e) { e.preventDefault(); });
      }
    }
  };
  /* Làm sáng mục menu đang mở */
  window.datMuc = function (muc) {
    var ls = document.querySelectorAll('aside nav a.nav');
    for (var i = 0; i < ls.length; i++) ls[i].classList.toggle('on', ls[i].getAttribute('href') === '#' + muc);
  };

  /* ===== Điền thông tin công ty (data-cfg="sdt", "email", "diaChi", "maSoThue") ===== */
  window.dienThongTin = function () {
    var els = document.querySelectorAll('[data-cfg]');
    for (var i = 0; i < els.length; i++) {
      var v = C[els[i].getAttribute('data-cfg')];
      if (v) els[i].textContent = v;
    }
  };

  window.CHUNG = { esc: esc, anh: anh, link: link, tenLoai: tenLoai, tenTin: tenTin, icon: icon };
})();
