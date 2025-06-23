
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import sql from "@/lib/db";
import DashboardContent from "../../components/DashboardContent";

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const userId = cookieStore.get("userid")?.value;

  if (!userId) redirect("/login");

  const [user] = await sql`SELECT name FROM users WHERE id = ${userId}`;

  const children = await sql`
    SELECT id, name, birthday, gender, avatar_url
    FROM children
    WHERE userid = ${userId}
    ORDER BY birthday ASC
  `;

  const memories = await sql`
    SELECT id, title, image_url, description, date, created_at, childid
    FROM memories
    WHERE userid = ${userId}
    ORDER BY created_at DESC
  `;

  return (
    <DashboardContent user={user} children={children} memories={memories} />
  );
}
