import { z } from "zod";
import { NonEmptyTrimmedString } from "./userSchema";

const cartItemSchema = z.object({
    variantId: NonEmptyTrimmedString,
    quantity: z.number().min(1),
})

// FIX: cart trước đây không có validate nào cho `items` — nguy hiểm hơn tưởng tượng vì
// findOneAndUpdate/findByIdAndUpdate của Mongoose KHÔNG tự chạy schema validators (khác với
// .create()/.save()), nên quantity âm hay items sai kiểu vẫn lọt thẳng vào DB nếu không chặn ở đây
export const updateCartSchema = z.object({
    items: z.array(cartItemSchema),
})
