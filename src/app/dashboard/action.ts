"use server"

import {cookies } from "next/headers";
import sql from "@/lib/db";


export async function getChildrenForUser(){
    const cookieStore = await cookies();
    const userId= cookieStore.get("userid")?.value;

    if(!userId){
        return [];
    }
    const children = await sql`SELECT * FROM children WHERE userid= ${userId} ORDER BY birthday ASC `;
    
}

