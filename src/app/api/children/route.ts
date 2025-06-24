import { prisma } from "@/lib/prisma";

export async function GET() {
  const children = await prisma.child.findMany({
    where: { userId: 1 },
  });

  return Response.json(children);
}
