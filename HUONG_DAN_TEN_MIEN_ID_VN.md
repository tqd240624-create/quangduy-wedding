# Cách đăng website Trương Quang Duy lên .id.vn

## Điều kiện cần biết
- Website trong gói này là HTML/CSS/JavaScript, không cần cài SQL Server, không cần hosting trả phí.
- Để mở bằng địa chỉ `truongquangduy.id.vn` (hoặc tên khác bạn đăng ký), bạn **phải sở hữu tên miền này**. Tên ví dụ chưa được xác nhận còn trống.
- VNNIC có chương trình miễn lệ phí đăng ký và phí duy trì 2 năm đầu cho cá nhân Việt Nam từ đủ 18 đến 23 tuổi; điều khoản và phí dịch vụ của nhà đăng ký cần được kiểm tra khi đăng ký. Sau thời gian miễn phí có thể cần trả tiền để giữ tên miền.
- Cloudflare Pages cấp địa chỉ tạm `*.pages.dev` miễn phí trong khi bạn cấu hình `.id.vn`.

## A. Đăng ký tên miền .id.vn
1. Truy cập https://hiendienonline.vnnic.vn/ và chọn chương trình đăng ký tên miền `.id.vn` dành cho thanh niên; đi theo nhà đăng ký tham gia chương trình.
2. Thử kiểm tra `truongquangduy.id.vn` hoặc `quangduy.id.vn`; chọn tên còn trống và thực hiện xác thực chủ sở hữu theo hướng dẫn nhà đăng ký.
3. Chỉ xác nhận đơn khi biết rõ giá và các dịch vụ đi kèm. Nếu muốn tránh chi phí trong tương lai, tắt chức năng tự động gia hạn nếu có.
4. Đợi thông báo đăng ký thành công rồi lưu tên miền đã được cấp.

## B. Đăng website lên Cloudflare Pages
**Cách nhanh – upload trực tiếp:**
1. Vào https://dash.cloudflare.com/ > Workers & Pages > Create application > Pages (hoặc Continue to Pages).
2. Chọn `Drag and drop your files` / `Upload assets`.
3. Tạo dự án tên ví dụ `truongquangduy-portfolio` (tên có thể phải đổi nếu trùng).
4. Upload **file ZIP này** (Cloudflare Pages Direct Upload hỗ trợ ZIP) hoặc kéo thư mục chứa `index.html`. Lưu ý `index.html` phải ở thư mục gốc của gói.
5. Nhấn Deploy site. Mở địa chỉ `ten-du-an.pages.dev` do Cloudflare cung cấp và kiểm tra giao diện.

**Cách tự động cập nhật bằng GitHub (khuyên dùng nếu thường xuyên sửa web):**
1. Tạo một repository MỚI ví dụ `truongquangduy-portfolio` trên GitHub, để **không ghi đè** website `quangduy` (Tệ nạn lòng người).
2. Giải nén ZIP và upload tất cả file/thư mục vào gốc repository, rồi Commit.
3. Cloudflare Workers & Pages > Pages > Import an existing Git repository > chọn repo MỚI.
4. Chọn branch `main`, framework `None`, build command `exit 0` (hoặc để trống nếu cho phép), build output directory `.` và deploy.
5. Những lần cập nhật sau chỉ cần commit lên GitHub.

## C. Liên kết .id.vn vào Cloudflare Pages
**Trường hợp dùng tên miền gốc** `truongquangduy.id.vn`:
1. Trong Cloudflare, chọn `Add a domain` / `Onboard a domain`, điền **tên miền .id.vn bạn thực sự đã đăng ký** và chọn gói Free.
2. Cloudflare sẽ cấp 2 nameserver riêng. Tại trang quản lý tên miền của nhà đăng ký `.id.vn`, thay nameserver bằng đúng 2 tên Cloudflare cung cấp. **Không tự đoán nameserver**; kiểm tra DNSSEC với nhà đăng ký nếu quá trình kích hoạt báo lỗi.
3. Đợi trạng thái tên miền trên Cloudflare thành `Active`.
4. Vào Workers & Pages > dự án portfolio > `Custom domains` > `Set up a domain` > nhập tên miền `.id.vn` > Continue. Cloudflare thường tự tạo DNS record cho miền gốc đã quản lý trong cùng tài khoản.
5. Đợi trạng thái custom domain thành Active và HTTPS có chứng chỉ hợp lệ. Mở `https://ten-cua-ban.id.vn` để kiểm tra.

**Trường hợp nhà đăng ký không cho đổi nameserver:**
- Bạn có thể thử dùng địa chỉ phụ như `www.truongquangduy.id.vn` nếu nhà đăng ký cho tạo bản ghi CNAME.
- Trước hết cần thêm **đúng địa chỉ phụ đó** vào `Pages > Custom domains`; sau đó tại DNS của nhà đăng ký đặt CNAME: `www` -> `ten-du-an.pages.dev`. Không chỉ tự thêm CNAME khi chưa thêm trong Pages.
- Việc dùng tên miền gốc (không có `www`) trên Cloudflare Pages thường đòi hỏi quản lý nameserver của miền đó trong Cloudflare.

## D. Sửa thông tin cá nhân
- `index.html` sửa giới thiệu, kỹ năng, dự án, liên hệ.
- `style.css` đổi màu và bố cục.
- `script.js` xử lý menu, sáng/tối, sao chép hotline.
- Website hiện công khai tên **Trương Quang Duy**, số liên hệ **0797 964 842** và tài khoản GitHub. Nếu không muốn công khai thông tin nào, sửa trước khi deploy.

Tài liệu tham khảo:
- VNNIC: https://hiendienonline.vnnic.vn/
- Cloudflare Pages custom domains: https://developers.cloudflare.com/pages/configuration/custom-domains/
- Cloudflare Pages direct upload: https://developers.cloudflare.com/pages/get-started/direct-upload/
