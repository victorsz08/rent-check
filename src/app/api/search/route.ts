import { NextResponse } from "next/server";
import { cnpjExistsInFile } from "./search";
import path from "path";

interface SearchRentInput {
  cnpj: string;
}
export async function POST(req: Request): Promise<any> {
  const body: SearchRentInput = await req.json();
  console.log(body);
  try {
    const filePath = path.join(process.cwd(), "public", "arquivo-pme.txt");
    const rent = await cnpjExistsInFile(filePath, body.cnpj);

    return NextResponse.json({ rent: rent });
  } catch (error) {
    return NextResponse.json(error);
  }
}
