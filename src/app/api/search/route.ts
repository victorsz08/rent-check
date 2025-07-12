import fs from "fs";
import readline from "readline";
import { type NextRequest, NextResponse } from "next/server";

/**
 * Função para verificar se um CNPJ existe no arquivo.
 * @param filePath Caminho do arquivo .txt
 * @param cnpj CNPJ que você quer buscar
 * @returns true se encontrar, false caso contrário
 */

export async function cnpjExistsInFile(
 filePath: string,
 cnpj: string
): Promise<boolean> {
 const fileStream = fs.createReadStream(filePath);

 const rl = readline.createInterface({
 input: fileStream,
 crlfDelay: Infinity,
 });

 for await (const line of rl) {
 const [, currentCnpj] = line.split(";");
 if (currentCnpj === cnpj) {
 return true;
 }
 }

 return false;
};


interface SearchRentInput {
    cnpj: string;
};
export default async function POST(req: NextRequest): Promise<any> {
    const body: SearchRentInput = await req.json();

    try {
        const rent = await cnpjExistsInFile("/arquivo-pme.txt", body.cnpj);

        return NextResponse.json({ rent: rent })
    } catch (error) {
        return NextResponse.json(error)
    }
}
