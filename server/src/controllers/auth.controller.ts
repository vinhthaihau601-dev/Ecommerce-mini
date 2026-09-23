import { Response, Request } from "express";
import { User } from "../models";
import { loginSchema } from "../schema/userSchema";
import { comparePassWord } from "../utils/pw";
import { signToken } from "../utils/jwt";

export async function login(req: Request, res: Response) {
    const parsed = loginSchema.safeParse(req.body)
    if (!parsed.success) {
        res.status(400).json({ error: "Email and password cannot be empty" })
        return
    }

    const { email, password } = parsed.data
    const user = await User.findOne({ email })
    if (!user) {
        res.status(401).json({ error: "Invalid email or password" })
        return
    }

    const isMatch = await comparePassWord(password, user.password)
    if (!isMatch) {
        res.status(401).json({ error: "Invalid email or password" })
        return
    }

    const token = signToken({ userId: user.id, role: user.role })
    const { password: _password, ...userWithoutPassword } = user.toObject()
    res.status(200).json({ success: true, token, user: userWithoutPassword })
}
