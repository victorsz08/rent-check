import fs from "fs";
import readline from "readline";

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
  if (!fs.existsSync(filePath)) {
    console.error(`Erro: Arquivo não encontrado em: ${filePath}`);
    return false;
  }

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
}
