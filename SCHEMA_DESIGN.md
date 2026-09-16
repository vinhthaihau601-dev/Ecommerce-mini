# E-commerce Mini — Schema Design Summary

## Entity chính đã chốt

- **Category** — gom nhóm sản phẩm (áo, quần, giày...)
- **Product** — thông tin chung của 1 sản phẩm (tên, mô tả, ảnh, category) — KHÔNG chứa giá/size/stock
- **Variant** — biến thể cụ thể của Product (màu, size, giá, stock riêng) — mỗi Product có nhiều Variant
- **User**
- **Cart** — giỏ hàng đang mua sắm, có thể sửa liên tục, thuộc về 1 user
- **Order** — bằng chứng 1 lần mua hàng đã xảy ra, bất biến sau khi tạo

## Quyết định thiết kế quan trọng (và lý do)

### 1. Product tách khỏi Variant
Nếu nhét size/color/stock/price thẳng vào Product thì mỗi biến thể phải lặp lại toàn bộ `name`, `description`, `images` — trùng lặp dữ liệu, khó maintain (đổi mô tả sản phẩm phải sửa N chỗ). Product = thông tin chung, Variant = biến thể (size, color, price, stock) tham chiếu tới Product.

### 2. Category là entity riêng, không phải string field trong Product
Lý do: cần trang admin liệt kê category + đếm sản phẩm, cần category cha-con, cần thêm ảnh/mô tả cho category sau này — string field không đáp ứng được.

### 3. Cart và Order là 2 entity hoàn toàn tách biệt, KHÔNG tham chiếu qua lại
- Cart: sống lâu dài theo user, luôn bị ghi đè/sửa, không có ý nghĩa lịch sử — giống "xe đẩy hàng trong siêu thị".
- Order: snapshot bất biến tại thời điểm đặt hàng. Nếu Order chỉ lưu `cartId` (tham chiếu), khi Cart bị sửa sau đó, dữ liệu đơn hàng cũ sẽ bị sai lệch hoặc mất (nếu Product/Variant bị xóa). → Order phải copy toàn bộ dữ liệu cần thiết (snapshot), không phụ thuộc join ngược.

### 4. Cart.items và Order.items — dùng Mongoose subdocument schema (nhúng mảng, không tách collection riêng)
Lý do chọn nhúng thay vì tách collection riêng cho CartItem/OrderItem:
- Dữ liệu luôn được đọc/ghi cùng nhau (xem giỏ hàng = xem tất cả item cùng lúc)
- Số lượng item nhỏ (dưới 20-30 dòng/giỏ)
- Mongoose vẫn hỗ trợ update từng phần tử trong mảng qua `$`, `$push`, `$pull` — không mất lợi ích "sửa từng item độc lập"
- Tách riêng thành collection sẽ tốn thêm 1 query mỗi lần đọc mà không đổi lại lợi ích tương xứng

### 5. Khác biệt giữa CartItem và OrderItem
- CartItem: chỉ cần `variantId` + `quantity` — vì Cart phản ánh trạng thái sống, luôn join sang Variant để lấy giá/tên mới nhất.
- OrderItem: phải snapshot đầy đủ (`variantId`, `productName`, `size`, `color`, `price`, `quantity`) — vì giá/tên Variant có thể đổi hoặc bị xóa sau này, đơn hàng cũ không được phép đổi theo.

## Schema nháp (Mongoose)

```js
const categorySchema = new Schema({
  name: { type: String, required: true },
});

const productSchema = new Schema({
  name: { type: String, required: true },
  description: String,
  images: [String],
  categoryId: { type: Schema.Types.ObjectId, ref: 'Category' },
});

const variantSchema = new Schema({
  productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  color: String,
  size: String,
  price: { type: Number, required: true },
  stock: { type: Number, required: true, default: 0 },
});

const cartItemSchema = new Schema({
  variantId: { type: Schema.Types.ObjectId, ref: 'Variant', required: true },
  quantity: { type: Number, required: true, min: 1 },
});

const cartSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  items: [cartItemSchema],
});

const orderItemSchema = new Schema({
  variantId: { type: Schema.Types.ObjectId, ref: 'Variant' },
  productName: String,   // snapshot
  size: String,          // snapshot
  color: String,         // snapshot
  price: Number,          // snapshot — giá tại thời điểm mua
  quantity: { type: Number, required: true },
});

const orderSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  items: [orderItemSchema],
  totalAmount: { type: Number, required: true },
  status: {
    type: String,
    enum: ['pending', 'paid', 'shipped', 'delivered', 'cancelled'],
    default: 'pending',
  },
  shippingAddress: String,
  createdAt: { type: Date, default: Date.now },
});
```

## Còn cần bàn tiếp (chưa làm)

- Thiết kế REST API endpoints cho từng entity
- Luồng "checkout" (Cart → Order): cần transaction để trừ stock + tạo Order cùng lúc, xử lý race condition khi 2 người cùng mua sản phẩm cuối
- Auth (JWT) cho User, RBAC cho admin routes
- Index cho các trường hay query (Variant.productId, Order.userId, Order.status)
