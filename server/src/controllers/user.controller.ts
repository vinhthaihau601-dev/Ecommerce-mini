import { Response, Request } from "express";
import { User } from "../models";
import { userSchema, updateUserSchema } from "../schema/userSchema";

// FIX: loại field password khỏi mọi response — trước đây trả cả password ra client
const PUBLIC_FIELDS = "-password";

export async function getUsers(_req: Request, res: Response) {
    const users = await User.find().select(PUBLIC_FIELDS)
    res.json(users);
}

export async function getUser(req: Request, res: Response) {
    const user = await User.findById(req.params.id).select(PUBLIC_FIELDS)
    if (!user) return res.status(404).json({ error: "User not found" })
    res.json(user)
}

export async function createUser(req: Request, res: Response) {
    const parsed = userSchema.safeParse(req.body)
    if (!parsed.success) {
        res.status(400).json({ error: "Name, email and password cannot be empty" })
        return
    }
    // TODO: hash password bằng bcrypt trước khi lưu khi làm phần auth (hiện đang lưu plaintext)
    // FIX: dùng parsed.data (đã qua zod) thay vì req.body thô — tránh mass assignment (client
    // nhét thêm field lạ vào body sẽ không lọt vào document)
    const user = await User.create(parsed.data)
    const { password: _password, ...userWithoutPassword } = user.toObject()
    res.status(200).json({ success: true, mess: "User create success", user: userWithoutPassword })
}

export async function updateUser(req: Request, res: Response) {
    // FIX: dùng updateUserSchema (mọi field optional) thay vì userSchema — trước đây PATCH
    // (update từng phần) lại bắt buộc gửi đủ name/email/password/role mỗi lần
    const parsed = updateUserSchema.safeParse(req.body)
    if (!parsed.success) {
        res.status(400).json({ error: "Invalid update data" })
        return
    }

    const user = await User.findByIdAndUpdate(
        req.params.id,
        parsed.data,
        { new: true }
    ).select(PUBLIC_FIELDS)

    if (!user) return res.status(404).json({ error: "User not found" })
    res.status(200).json({ success: true, mess: "User update success", user })
}

export async function deleteUser(req: Request, res: Response) {
    const user = await User.findByIdAndDelete(req.params.id)
    if (!user) return res.status(404).json({ error: "User not found" })
    res.status(200).json({ success: true, mess: "User delete success" })
}
