# Thiệp 20/10 · Dây đèn yêu thương

Thiệp cuộn dọc: bấm "Chạm để bật đèn", rồi cuộn xuống để từng dây đèn sáng lên, từng tấm ảnh hiện ra, cuối cùng là lời chúc chạy chữ.

## Cách mở
- **Máy tính:** bấm đúp `index.html`.
- **Điện thoại / iPad:** đưa cả thư mục lên web miễn phí rồi gửi link (nhanh nhất: kéo thả thư mục vào https://app.netlify.com/drop ). Mở file trong zip trực tiếp trên điện thoại thường không chạy đủ.

## Chỉnh nội dung: CHỈ SỬA TRONG index.html
Mở `index.html` bằng Notepad/VS Code, tìm các chú thích `SỬA:`. File `js/script.js` không ghi đè chữ nào.
- **Chữ:** sửa thẳng trong HTML. Lời chúc chạy chữ nằm trong khối `message-source` (mỗi `<p>` một đoạn, `<br>` xuống dòng, `data-speed` là tốc độ gõ).
- **Ảnh:** chép ảnh vào `assets/images/`, đổi `src` của từng thẻ `<img>` (ví dụ `src="assets/images/anh-cua-toi.jpg"`). Gõ sai tên thì thiệp dùng ảnh minh hoạ. Ảnh dọc tỉ lệ 4:5, JPG/PNG (ảnh HEIC của iPhone cần đổi sang JPG), dưới 500KB.
- **Thêm/bớt khoảnh khắc:** chép hoặc xoá cả một khối `<section class="moment">...</section>`. Ảnh tự đổi bên trái/bên phải xen kẽ.
- **Nhạc:** đổi `src` của thẻ `<audio>` (file để trong `assets/music/`), âm lượng ở `data-volume`.
- **Chữ trên nút nhạc:** `data-label-on` và `data-label-off`.
