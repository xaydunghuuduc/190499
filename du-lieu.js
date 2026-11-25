/* =====================================================================
   DU-LIEU.JS — NƠI DUY NHẤT BẠN CẦN SỬA ĐỂ THÊM / ĐỔI NỘI DUNG
   Quy tắc:
   - Chữ nằm trong dấu nháy kép "..."
   - Mỗi mục ngăn cách bằng dấu phẩy ,
   - Muốn xuống đoạn mới trong bài viết: thêm một dòng "..." mới
   - Bài MỚI nhất đặt trên cùng của danh sách
   - "id" là tên riêng của bài, viết thường, không dấu, nối bằng gạch ngang,
     không trùng nhau (ví dụ "khoi-cong-nha-may-a")

   CÁCH GẮN ẢNH: chép ảnh vào thư mục images rồi ghi "images/ten-anh.jpg".
   Chưa có ảnh thì web hiện ô xám ghi đúng tên file cần chép vào.

   TRONG PHẦN noiDung, mỗi dòng là một khối:
     "Đoạn văn bình thường"
     "## Tiêu đề nhỏ"
     "- Gạch đầu dòng"
     "anh: images/hinh.jpg | Chú thích ảnh"
   ===================================================================== */

/* ---------- 1. THÔNG TIN CÔNG TY ---------- */
var CAU_HINH = {
  sdt: "0357190499",
  email: "info.hdc@gmail.com",
  diaChi: "Mộ Đức, Quảng Ngãi",
  maSoThue: "19041999",
  /* Dán link thật vào đây; để "" thì nút chưa có link */
  facebook: "",
  tiktok: "",
  youtube: "",
  zalo: "https://zalo.me/0357190499",
  gioLamViec: "Thứ Hai - Thứ Bảy, 7:30 - 17:00",
  /* Google Maps: Chia sẻ > Nhúng bản đồ > copy phần src="..." dán vào đây */
  banDo: "",
  /* Số liệu hiện ở trang chủ và trang Giới thiệu: ["con số", "nhãn"] */
  soLieu: [["19", "Năm kinh nghiệm"], ["04", "Dự án đã thực hiện"], ["19", "Kỹ sư và công nhân"], ["99", "Thiết bị thi công"]]
};

/* ---------- 1b. TRANG GIỚI THIỆU ---------- */
var GIOI_THIEU = {
  anhDaiDien: "images/gioi-thieu.jpg",
  tomTat: "Xây dựng Hữu Đức hoạt động trong lĩnh vực xây dựng với ba mảng chính: dân dụng, cầu đường và mua bán vật liệu xây dựng. Với đội ngũ kỹ sư, công nhân giàu kinh nghiệm cùng hệ thống thiết bị thi công đồng bộ, chúng tôi cam kết chất lượng, tiến độ và an toàn lao động trên từng công trình.",
  noiDung: [
    "## Lịch sử hình thành",
    "Viết vài câu về năm thành lập và quá trình phát triển. (Nội dung mẫu.)",
    "## Năng lực",
    "- Đội ngũ kỹ sư, chỉ huy trưởng, cán bộ kỹ thuật",
    "- Thiết bị, máy móc thi công",
    "- Hệ thống quản lý chất lượng, an toàn lao động",
    "## Cam kết",
    "Chất lượng, tiến độ, an toàn và minh bạch với chủ đầu tư.",
    "anh: images/gioi-thieu-2.jpg | Chú thích ảnh (có thể xóa dòng này)"
  ]
};

/* ---------- 2. LĨNH VỰC HOẠT ĐỘNG ----------
   bieuTuong chọn một trong: "dan-dung", "cau-duong", "vat-lieu"
   (mẫu để thêm lĩnh vực mới: copy cả khối { ... }, đổi nội dung)      */
var LINH_VUC = [
  {
    id: "dan-dung",
    ten: "Thi công dân dụng",
    bieuTuong: "dan-dung",
    tomTat: "Thi công nhà ở, văn phòng, trường học và các công trình công cộng, đảm bảo chất lượng và tiến độ.",
    noiDung: [
      "Xây dựng Hữu Đức thi công các công trình dân dụng từ phần móng đến hoàn thiện, theo đúng hồ sơ thiết kế và tiêu chuẩn hiện hành.",
      "## Hạng mục thực hiện",
      "- Nhà ở, nhà phố, biệt thự",
      "- Văn phòng, trường học, bệnh xá",
      "- Nhà xưởng, kho bãi",
      "## Cam kết",
      "Chất lượng, tiến độ và an toàn lao động trên từng công trình. (Nội dung mẫu, bạn thay bằng nội dung thật.)",
      "anh: images/linh-vuc-dan-dung.jpg | Chú thích ảnh (có thể xóa dòng này)"
    ]
  },
  {
    id: "cau-duong",
    ten: "Thi công cầu đường",
    bieuTuong: "cau-duong",
    tomTat: "Thi công đường giao thông, cầu, cống và các hạng mục phụ trợ theo đúng hồ sơ thiết kế và tiêu chuẩn.",
    noiDung: [
      "Thi công đường giao thông, cầu, cống và các hạng mục phụ trợ. (Nội dung mẫu, bạn thay bằng nội dung thật.)",
      "## Hạng mục thực hiện",
      "- Nền, mặt đường",
      "- Cầu, cống thoát nước",
      "- An toàn giao thông"
    ]
  },
  {
    id: "vat-lieu",
    ten: "Mua bán vật liệu",
    bieuTuong: "vat-lieu",
    tomTat: "Mua bán xi măng, thép, cát, đá, gạch và các loại vật liệu xây dựng cho công trình và khách hàng.",
    noiDung: [
      "Cung cấp vật liệu xây dựng đúng chủng loại, đủ số lượng, giao hàng đúng hẹn cho công trình và khách hàng. (Nội dung mẫu, bạn thay bằng nội dung thật.)",
      "## Mặt hàng kinh doanh",
      "- Xi măng, thép xây dựng",
      "- Cát, đá, gạch",
      "- Vật liệu hoàn thiện, thiết bị điện nước"
    ]
  }
];

/* ---------- 3. DỰ ÁN ----------
   loai: ghi đúng id của một lĩnh vực ở trên ("dan-dung", "cau-duong", "vat-lieu")
   Điền thiếu mục nào thì mục đó tự ẩn trên trang chi tiết.               */
var DU_AN = [
  {
    id: "cong-trinh-1",
    ten: "[Tên công trình 1]",
    loai: "dan-dung",
    diaDiem: "[Địa điểm]",
    nam: "[Năm hoàn thành]",
    chuDauTu: "[Chủ đầu tư]",
    quyMo: "[Quy mô, ví dụ: 5 tầng, 1.200 m²]",
    giaTri: "",
    anhDaiDien: "images/du-an-1.jpg",
    thuVienAnh: ["images/du-an-1-a.jpg", "images/du-an-1-b.jpg", "images/du-an-1-c.jpg"],
    tomTat: "Một hai câu giới thiệu ngắn về công trình.",
    noiDung: [
      "Mô tả công trình: vị trí, quy mô, các hạng mục Hữu Đức thực hiện.",
      "## Hạng mục thi công",
      "- Hạng mục 1",
      "- Hạng mục 2",
      "## Kết quả",
      "Công trình hoàn thành đúng tiến độ, đạt yêu cầu chất lượng."
    ]
  },
  {
    id: "cong-trinh-2",
    ten: "[Tên công trình 2]",
    loai: "cau-duong",
    diaDiem: "[Địa điểm]",
    nam: "[Năm hoàn thành]",
    chuDauTu: "",
    quyMo: "",
    giaTri: "",
    anhDaiDien: "images/du-an-2.jpg",
    thuVienAnh: [],
    tomTat: "Một hai câu giới thiệu ngắn về công trình.",
    noiDung: ["Mô tả công trình."]
  },
  {
    id: "cong-trinh-3",
    ten: "[Tên công trình 3]",
    loai: "vat-lieu",
    diaDiem: "[Địa điểm]",
    nam: "[Năm hoàn thành]",
    chuDauTu: "",
    quyMo: "",
    giaTri: "",
    anhDaiDien: "images/du-an-3.jpg",
    thuVienAnh: [],
    tomTat: "Một hai câu giới thiệu ngắn về công trình.",
    noiDung: ["Mô tả công trình."]
  }
];

/* ---------- 4. TIN TỨC (bài MỚI nhất để trên cùng) ----------
   MẪU ĐỂ COPY, dán lên ĐẦU danh sách rồi sửa:
   {
     id: "ten-bai-khong-dau",
     tieuDe: "Tiêu đề bài viết",
     ngay: "24/11/2026",
     chuyenMuc: "Hoạt động công ty",
     tomTat: "Một hai câu tóm tắt hiện ở thẻ ngoài trang chủ.",
     anhDaiDien: "images/ten-anh.jpg",
     noiDung: [
       "Đoạn mở đầu.",
       "## Tiêu đề nhỏ",
       "Đoạn tiếp theo.",
       "anh: images/anh-trong-bai.jpg | Chú thích",
       "- Ý 1",
       "- Ý 2"
     ]
   },
   (nhớ dấu phẩy ở cuối khối, trừ khối cuối cùng)                          */
var TIN_TUC = [
  {
    id: "khoi-cong-cong-trinh",
    tieuDe: "Khởi công công trình [Tên công trình]",
    ngay: "[Ngày đăng]",
    chuyenMuc: "Hoạt động công ty",
    tomTat: "Một hai câu tóm tắt nội dung bài viết.",
    anhDaiDien: "images/tin-1.jpg",
    noiDung: [
      "Đoạn mở đầu: sự kiện gì, diễn ra khi nào, ở đâu.",
      "## Nội dung chính",
      "Mô tả diễn biến, các thông tin quan trọng.",
      "anh: images/tin-1-a.jpg | Chú thích ảnh",
      "## Kế hoạch tiếp theo",
      "- Ý 1",
      "- Ý 2"
    ]
  },
  {
    id: "tap-huan-an-toan-lao-dong",
    tieuDe: "Tập huấn an toàn lao động cho cán bộ và công nhân",
    ngay: "[Ngày đăng]",
    chuyenMuc: "An toàn lao động",
    tomTat: "Một hai câu tóm tắt nội dung bài viết.",
    anhDaiDien: "images/tin-2.jpg",
    noiDung: ["Nội dung bài viết."]
  },
  {
    id: "nghiem-thu-ban-giao-cong-trinh",
    tieuDe: "Nghiệm thu và bàn giao công trình [Tên công trình]",
    ngay: "[Ngày đăng]",
    chuyenMuc: "Hoạt động công ty",
    tomTat: "Một hai câu tóm tắt nội dung bài viết.",
    anhDaiDien: "images/tin-3.jpg",
    noiDung: ["Nội dung bài viết."]
  }
];

/* ---------- 5. TUYỂN DỤNG (mỗi vị trí là một khối) ---------- */
var TUYEN_DUNG = [
  {
    id: "ky-su-xay-dung",
    viTri: "Kỹ sư xây dựng",
    soLuong: "02",
    diaDiem: "[Địa điểm làm việc]",
    mucLuong: "Thỏa thuận",
    hanNop: "[Hạn nộp hồ sơ]",
    noiDung: [
      "## Mô tả công việc",
      "- Giám sát, triển khai thi công tại công trình",
      "- Lập hồ sơ nghiệm thu, thanh toán",
      "## Yêu cầu",
      "- Tốt nghiệp chuyên ngành xây dựng",
      "- Có kinh nghiệm từ 2 năm (ưu tiên)",
      "## Quyền lợi",
      "- Thu nhập cạnh tranh, đóng bảo hiểm theo luật",
      "## Cách ứng tuyển",
      "Gửi CV về email công ty hoặc gọi số điện thoại ở cuối trang."
    ]
  },
  {
    id: "chi-huy-truong",
    viTri: "Chỉ huy trưởng công trình",
    soLuong: "01",
    diaDiem: "[Địa điểm làm việc]",
    mucLuong: "Thỏa thuận",
    hanNop: "",
    noiDung: ["Mô tả công việc và yêu cầu."]
  }
];
