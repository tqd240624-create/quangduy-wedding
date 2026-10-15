# TRƯƠNG QUANG DUY — FUTURE PORTFOLIO V3

Website giới thiệu cá nhân phong cách cinematic / futuristic, hoàn toàn HTML + CSS + JavaScript thuần. Sử dụng ảnh chân dung chính chủ đã cung cấp. Ảnh chỉ được nén và cắt từ bản gốc, không tạo gương mặt mới.

## Chạy thử

1. Giải nén ZIP.
2. Mở đúng thư mục chứa `index.html`.
3. Nhấp đúp `index.html` để mở trong Chrome/Edge.
4. Nếu muốn chạy local server: `python -m http.server 8000` rồi mở http://localhost:8000.

## Tính năng

- Intro **WELCOME TO TRƯƠNG QUANG DUY** lần đầu mở trong phiên trình duyệt, tự tắt hoặc bấm bỏ qua; ưu tiên giảm chuyển động.
- Hero chân dung, hiệu ứng ánh sáng, bố cục máy tính/điện thoại.
- Chế độ sáng/tối và lưu tùy chọn trong localStorage.
- Modal xem ảnh lớn, menu mobile, hiệu ứng cuộn và thanh tiến độ đọc.
- Giới thiệu sở thích làm web cá nhân, kinh nghiệm quản lý tiệc cưới, gọi hotline `0797964842`, sao chép số điện thoại.
- Font Be Vietnam Pro hỗ trợ tiếng Việt, fallback font hệ thống.
- Website tĩnh, không yêu cầu SQL Server hoặc hosting trả phí.

## Đưa lên Internet

### Cloudflare Pages miễn phí
1. Tạo repository GitHub MỚI, ví dụ `truongquangduy-portfolio`, upload **toàn bộ file và thư mục `assets`** sao cho `index.html` nằm ngay thư mục gốc.
2. Trong Cloudflare Dashboard: Workers & Pages → Pages → Import existing repository → chọn repository mới.
3. Branch: `main`; Framework: `None`; Build output directory: `.`; Build command: để trống hoặc `exit 0` nếu bắt buộc.
4. Sau deploy, website chạy tại `https://<ten-du-an>.pages.dev`.

### Tên miền `.id.vn`
Nếu đã có tên miền `.id.vn`, trên Cloudflare Pages vào **Custom domains → Set up a domain**. Với tên miền gốc, có thể cần thêm domain vào Cloudflare và cập nhật nameserver ở nhà đăng ký; chỉ sao chép cặp nameserver do Cloudflare cấp. Không tự nhập DNS hoặc tên miền giả định. Kiểm tra HTTPS sau khi DNS hiệu lực. Tên miền `.id.vn` miễn phí hai năm đầu chỉ khi đủ điều kiện chương trình VNNIC; sau đó cần phí duy trì.

## Sửa thông tin
- `index.html`: câu giới thiệu, tên, nội dung, dấu ấn cá nhân, hotline và liên kết.
- `style.css`: màu sắc, bố cục, hiệu ứng.
- `script.js`: intro, nút bấm, menu, theme.
- `assets/truong-quang-duy.webp`: ảnh gốc đã tối ưu, có thể thay bằng ảnh mới cùng tên.

**Lưu ý:** Ảnh và số điện thoại đặt trên website công khai sẽ hiển thị cho mọi người. Không đưa số giấy tờ hoặc thông tin riêng tư lên GitHub.
