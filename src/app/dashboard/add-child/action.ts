"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import sql from "@/lib/db";

export async function addChild(formData: FormData) {
  const cookieStore = await cookies();
  const userId = cookieStore.get("user_id")?.value;
  if (!userId) {
    throw new Error("Nicht eingeloggt.");
  }

  const name = formData.get("name");
  const birthday = formData.get("birthday");
  const gender = formData.get("gender");
  const avatar = formData.get("avatar_url");

  if (!name || !birthday || !gender) {
    throw new Error("Bitte alle Pflichtfelder ausfüllen.");
  }

  await sql`
    INSERT INTO children (name, birthday, gender, avatar_url, user_id)
    VALUES (${name}, ${birthday}, ${gender}, ${avatar}, ${userId})
  `;

  redirect("/dashboard");
}
