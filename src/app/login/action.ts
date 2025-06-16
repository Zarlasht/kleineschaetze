"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import sql from "@/lib/db";
import bcrypt from "bcryptjs";

export async function loginUser(formData: FormData) {
  const email = formData.get("email") as string ;
  const password = formData.get("password") as string;

  

  const [user] = await sql`SELECT * FROM users WHERE email = ${email}`;
  if (!user) {
    throw new Error("Benutzername oder Passwort ist falsch.");
  }

  const passwordsMatch = await bcrypt.compare(password, user.password);
  if (!passwordsMatch) {
    throw new Error("Benutzername oder Passwort ist falsch.");
  }

  (await cookies()).set("user_id", user.id.toString(), {
    httpOnly: true,
    secure: true,
    path: "/",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7 // 1 Woche
  });

  redirect("/dashboard");
}
