<h3>A.Các chế  độ lock </h3>
<blockquote>UPDATE user SET username = 'Bob' WHERE id = '1';	</blockquote>
- Exclusive lock (lock độc quyền): Row user có id = 1 sẽ bị exclusive lock ==> Các transaction khác phải chờ câu lệnh trên thực hiện xong
- Share lock (lock chia sẻ): Bảng user sẽ bị share lock nên các transaction khác sẽ không thể cập nhật cấu trúc của nó (vì để thay đổi cấu trúc bảng thì cần phải tiến hành exclusive lock bảng). Tuy nhiên các transaction khác vẫn có thể thay đổi các dòng khác của bảng employees (khi đó bảng employees sẽ bị nhiều share lock).

<h3>B.Các loại lock </h3>
1. DDL lock (lock cấu trúc): có chức năng bảo vệ cấu trúc của các đối tượng trong schema, ví dụ như bảng, view,
2. DML lock (lock dữ liệu):
- Thường thì SELECT không phải đợi UPDATE
- UPDATE phải đợi nhau nếu cùng ghi trên 1 dòng
