"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import sql from "@/lib/db";
import { comparePassword } from "@/lib/hash";

export async function loginUser(prevState: any, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const [user] = await sql`SELECT * FROM users WHERE email = ${email}`;
  if (!user) {
    return { error: "Benutzername oder Passwort ist falsch." };
  }

  const passwordsMatch = await comparePassword(password, user.password);
  if (!passwordsMatch) {
    return { error: "Benutzername oder Passwort ist falsch." };
  }

  const cookieStore = await cookies();
  cookieStore.set("userid", user.id.toString(), {
    httpOnly: true,
    secure: true,
    path: "/",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
  });

  redirect("/dashboard");
}
