'use server';

import { writeFile } from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import sql from '@/lib/db';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function addChild(formData: FormData) {
  const name = formData.get('name') as string;
  const birthday = formData.get('birthday') as string;
  const gender = formData.get('gender') as string;
  const file = formData.get('avatar_url') as File;

  const cookieStore = await cookies();
  const user_id = cookieStore.get('userid')?.value;

  let avatarUrl = null;

  if (file && file.size > 0) {
    const buffer = Buffer.from(await file.arrayBuffer());
    const ext = file.name.split('.').pop();
    const filename = `${uuidv4()}.${ext}`;
    const filePath = path.join(process.cwd(), 'public/childrenPhoto', filename);

    await writeFile(filePath, buffer);
    avatarUrl = `/childrenPhoto/${filename}`;
  }

  await sql`
    INSERT INTO children (name, birthday, gender, avatar_url, userid)
    VALUES (${name}, ${birthday}, ${gender}, ${avatarUrl}, ${user_id})
  `;

  redirect('/dashboard');
}
