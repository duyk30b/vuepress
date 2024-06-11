# Transaction

<h3>A.Các chế  độ lock </h3>
<blockquote>UPDATE user SET username = 'Bob' WHERE id = '1';	</blockquote>
- Exclusive lock (lock độc quyền): Row user có id = 1 sẽ bị exclusive lock ==> Các transaction khác phải chờ câu lệnh trên thực hiện xong
- Share lock (lock chia sẻ): Bảng user sẽ bị share lock nên các transaction khác sẽ không thể cập nhật cấu trúc của nó (vì để thay đổi cấu trúc bảng thì cần phải tiến hành exclusive lock bảng). Tuy nhiên các transaction khác vẫn có thể thay đổi các dòng khác của bảng employees (khi đó bảng employees sẽ bị nhiều share lock).

<h3>B.Các loại lock </h3>
1. DDL lock (lock cấu trúc): có chức năng bảo vệ cấu trúc của các đối tượng trong schema, ví dụ như bảng, view,
2. DML lock (lock dữ liệu):
- Thường thì SELECT không phải đợi UPDATE
- UPDATE phải đợi nhau nếu cùng ghi trên 1 dòng

<h2>A. Các loại Anomaly</h2>
<h3>1. Dirty Reads</h3>
Transaction 2 đọc dữ liệu chưa đươc commit ở transaction 1
<table>
<tbody>
<tr>
<td>1</td>
<td>2</td>
<td>DATA</td>
</tr>
<tr>
<td>START TRANSACTION;</td>
<td>&nbsp;</td>
<td>id = 1, username = 'Alice'</td>
</tr>
<tr>
<td>UPDATE user SET username = 'Bob' WHERE id = '1';</td>
<td>START TRANSACTION;</td>
<td>id = 1, username = 'Bob'</td>
</tr>
<tr>
<td>&nbsp;</td>
<td>SELECT username FROM user where id = '1';</td>
<td>id = 1, username = 'Bob'</td>
</tr>
<tr>
<td>&nbsp;</td>
<td>COMMIT;</td>
<td>&nbsp;</td>
</tr>
<tr>
<td>ROLLBACK;</td>
<td>&nbsp;</td>
<td>id = 1, title = 'Alice'</td>
</tr>
</tbody>
</table>

<h3>2. Nonrepeatable Reads</h3>
- Transaction 2 đọc dữ liệu 2 lần ra 2 kết quả khác nhau
<table>
<tbody>
<tr>
<td>1</td>
<td>2</td>
<td>DATA</td>
</tr>
<tr>
<td>&nbsp;</td>
<td>&nbsp;START TRANSACTION;</td>
<td>id = 1, username = 'Alice'</td>
</tr>
<tr>
<td>&nbsp;START TRANSACTION;</td>
<td>SELECT username FROM user where id = '1';</td>
<td>id = 1, username = 'Alice'</td>
</tr>
<tr>
<td>&nbsp;UPDATE user SET username = 'Bob' WHERE id = '1';</td>
<td>&nbsp;</td>
<td>id = 1, username = 'Bob'</td>
</tr>
<tr>
<td>&nbsp;COMMIT;</td>
<td>SELECT username FROM user where id = '1';</td>
<td>id = 1, title = 'Bob'</td>
</tr>
<tr>
<td>&nbsp;</td>
<td>COMMIT;</td>
<td>&nbsp;</td>
</tr>
</tbody>
</table>

<h3>3. Phantom Record: Bản ghi ma </h3>
- Bản ghi 'Bob' đã được thêm và làm cho kết quả đọc 2 lần sai lệch
<table>
<tbody>
<tr>
<td>1</td>
<td>2</td>
<td>DATA</td>
</tr>
<tr>
<td>START TRANSACTION;</td>
<td>&nbsp;START TRANSACTION;</td>
<td>&nbsp;</td>
</tr>
<tr>
<td>&nbsp;</td>
<td>SELECT username FROM user where group_id = '1';</td>
<td>'Alice'</td>
</tr>
<tr>
<td>&nbsp;INSERT INTO user (id, group_id, username) VALUES (4,1,'Bob')</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
</tr>
<tr>
<td>&nbsp;</td>
<td>SELECT username FROM user where group_id = '1';</td>
<td>'Alice','Bob'</td>
</tr>
<tr>
<td>&nbsp;COMMIT;</td>
<td>COMMIT;</td>
<td>&nbsp;</td>
</tr>
</tbody>
</table>

<h2>B. Isolation level</h2>
<table>
<tbody>
<tr>
<td>&nbsp;</td>
<td>Read Uncommitted</td>
<td>Read Committed</td>
<td>Repeatable Read</td>
<td>Serializable</td>
</tr>
<tr>
<td>&nbsp;UPDATE đợi transaction kh&aacute;c COMMIT UPDATE</td>
<td>&nbsp;Y</td>
<td>&nbsp;Y</td>
<td>&nbsp;Y</td>
<td>&nbsp;Y</td>
</tr>
<tr>
<td>&nbsp;SELECT đợi transaction kh&aacute;c COMMIT UPDATE</td>
<td>&nbsp;N</td>
<td>&nbsp;Y</td>
<td>&nbsp;Y</td>
<td>&nbsp;Y</td>
</tr>
<tr>
<td>&nbsp;LOCK khi SELECT (kh&ocirc;ng cho transaction kh&aacute;c update)</td>
<td>&nbsp;N</td>
<td>&nbsp;N</td>
<td>&nbsp;Y&nbsp;</td>
<td>&nbsp;Y</td>
</tr>
<tr>
<td>&nbsp;LOCK khi SELECT (kh&ocirc;ng cho transaction kh&aacute;c delete, insert)</td>
<td>&nbsp;N</td>
<td>&nbsp;N</td>
<td>&nbsp;N</td>
<td>&nbsp;Y</td>
</tr>
<tr>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
</tr>
<tr>
<td>&nbsp;Dirt Read</td>
<td>&nbsp;Y</td>
<td>&nbsp;N</td>
<td>&nbsp;N</td>
<td>&nbsp;N</td>
</tr>
<tr>
<td>&nbsp;Nonerepeatable Read</td>
<td>&nbsp;Y</td>
<td>&nbsp;Y</td>
<td>&nbsp;N</td>
<td>&nbsp;N</td>
</tr>
<tr>
<td>&nbsp;Fantom Read</td>
<td>&nbsp;Y</td>
<td>&nbsp;Y</td>
<td>&nbsp;Y</td>
<td>&nbsp;N</td>
</tr>
</tbody>
</table>
