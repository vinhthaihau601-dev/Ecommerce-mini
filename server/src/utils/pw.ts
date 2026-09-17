import bcrypt from "bcryptjs";

export async function hashPassWord(pw: string): Promise<string> {
    const pwHashed = await bcrypt.hash(pw, 10);
    return pwHashed
}

export async function comparePassWord(pw: string, hashedPw: string): Promise<boolean> {
    return await bcrypt.compare(pw, hashedPw);
}

