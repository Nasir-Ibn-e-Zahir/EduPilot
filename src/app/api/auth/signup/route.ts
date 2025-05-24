import { NextResponse } from "next/server";
// Prisma 
import { db } from "@/lib/db";
// Hash Functionality
import { hashPassword } from "@/lib/hash";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log(body)
    const { name, email, password } = body;
    // Return if one of the mentioned field is missing
    if (!name || !email || !password) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }
    // Checks if the User exists 
    const existingUser = await db.user.findFirst({
      where: {
        OR: [{ email }, { name }],
      },
    });
    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 409 });
    }
    // Convert the password to the Hash form
    const hashedPassword = await hashPassword(password);
    
    
    // Create user in the database
    const user = await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return NextResponse.json({ message: "User created", user }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" + error }, { status: 500 });
  }
}
