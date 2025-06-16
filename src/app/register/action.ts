"use server";

import { hashPassword } from "@/lib/hash";
import sql from "@/lib/db";
import { redirect } from "next/navigation";

export async function registerUser(formData: FormData) {
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");

    if (!name || !email || !password || !confirmPassword) {
        throw new Error("Alle Felder sind erforderlich.");
    }

    const hashedPassword = await hashPassword(password as string);
    if (password !== confirmPassword) {
        throw new Error("Passwörter stimmen nicht überein.");
    }

    await sql`INSERT INTO users (name, email, password) VALUES (${name}, ${email},${hashedPassword}) `;

    redirect("/login");
}