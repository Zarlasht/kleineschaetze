"use server";

import { hashPassword } from "@/lib/hash";
import sql from "@/lib/db";
import { redirect } from "next/navigation";

export async function registerUser(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (!name || !email || !password || !confirmPassword) {
    throw new Error("Alle Felder sind erforderlich.");
  }

  if (password !== confirmPassword) {
    throw new Error("Passwörter stimmen nicht überein.");
  }

  const hashedPassword = await hashPassword(password); // ✅ bcrypt hash

  await sql`
    INSERT INTO users (name, email, password)
    VALUES (${name}, ${email}, ${hashedPassword})
  `;

  redirect("/login");
}
