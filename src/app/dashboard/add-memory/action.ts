"use server";
import {cookies} from "next/headers";
import {redirect } from "next/navigation";
import sql from "@/lib/db";
import {writeFile } from "fs/promises";
import path from "path";

export async function addMemory(formData: FormData){

    const cookieStore = await cookies();
    const userId = cookieStore.get("userid")?.value;

    if(!userId)
        redirect("/login");

    const childId = formData.get("child_id") as string;
    const title = formData.get("title") as string;
    const date = formData.get("date") as string;
    const description = formData.get("description") as string;
    const imageFile = formData.get("image_url") as File;

    let imageUrl = null;
    if( imageFile && imageFile.size> 0 ){
        const buffer = Buffer.from(await imageFile.arrayBuffer());
        const ext = imageFile.name.split(".").pop();
        const filename = `${title}.${ext}`;
        const filePath = path.join(process.cwd(), "public/memoryImages", filename);

        await writeFile(filePath, buffer);
        imageUrl = `/memoryImages/${filename}`;
    }
    await sql`
        INSERT INTO memories (childid, title, date, description, image_url, userid)
        VALUES (${childId}, ${title}, ${date}, ${description}, ${imageUrl}, ${userId})
    `;
    redirect("/dashboard");

}