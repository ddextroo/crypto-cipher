import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { CipherProps } from "@/types/cipherTypes";

export function PlayfairCipher({ title }: CipherProps) {
  const [input, setInput] = useState("");
  const [key, setKey] = useState("KEYWORD");
  const [output, setOutput] = useState("");

  const generateMatrix = (key: string) => {
    // Process key: uppercase, replace J with I, remove non-letters
    const processedKey = key
      .toUpperCase()
      .replace(/J/g, "I")
      .replace(/[^A-Z]/g, "");

    // Remove duplicate letters while preserving order
    const keyChars: string[] = [];
    const seen = new Set<string>();
    for (const char of processedKey) {
      if (!seen.has(char)) {
        keyChars.push(char);
        seen.add(char);
      }
    }

    // Get remaining alphabet letters (without J)
    const remainingAlphabet = "ABCDEFGHIKLMNOPQRSTUVWXYZ"
      .split("")
      .filter((c) => !seen.has(c));

    // Combine to create 5x5 matrix
    const matrixChars = [...keyChars, ...remainingAlphabet];
    const matrix: string[][] = [];
    for (let i = 0; i < 5; i++) {
      matrix.push(matrixChars.slice(i * 5, (i + 1) * 5));
    }
    return matrix;
  };

  const findPosition = (matrix: string[][], char: string) => {
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5; j++) {
        if (matrix[i][j] === char) {
          return [i, j];
        }
      }
    }
    return [-1, -1];
  };

  const handleEncrypt = () => {
    // Process input: uppercase, replace J with I, remove non-letters
    const sanitized = input
      .toUpperCase()
      .replace(/J/g, "I")
      .replace(/[^A-Z]/g, "");

    // Prepare plaintext with X padding for duplicates and odd length
    let prepared = "";
    for (let i = 0; i < sanitized.length; i++) {
      prepared += sanitized[i];
      if (i + 1 < sanitized.length) {
        if (sanitized[i] === sanitized[i + 1]) {
          prepared += "X";
        }
      }
    }
    if (prepared.length % 2 !== 0) prepared += "X";

    const matrix = generateMatrix(key);
    let result = "";

    for (let i = 0; i < prepared.length; i += 2) {
      const a = prepared[i];
      const b = prepared[i + 1];
      const [aRow, aCol] = findPosition(matrix, a);
      const [bRow, bCol] = findPosition(matrix, b);

      if (aRow === bRow) {
        result += matrix[aRow][(aCol + 1) % 5] + matrix[bRow][(bCol + 1) % 5];
      } else if (aCol === bCol) {
        result += matrix[(aRow + 1) % 5][aCol] + matrix[(bRow + 1) % 5][bCol];
      } else {
        result += matrix[aRow][bCol] + matrix[bRow][aCol];
      }
    }

    setOutput(result);
  };

  // Decrypt function (reverse the operations)
  const handleDecrypt = () => {
    const sanitized = input.toUpperCase().replace(/J/g, "I");
    const matrix = generateMatrix(key);
    let result = "";

    for (let i = 0; i < sanitized.length; i += 2) {
      const a = sanitized[i];
      const b = sanitized[i + 1];
      const [aRow, aCol] = findPosition(matrix, a);
      const [bRow, bCol] = findPosition(matrix, b);

      if (aRow === bRow) {
        result += matrix[aRow][(aCol + 4) % 5] + matrix[bRow][(bCol + 4) % 5];
      } else if (aCol === bCol) {
        result += matrix[(aRow + 4) % 5][aCol] + matrix[(bRow + 4) % 5][bCol];
      } else {
        result += matrix[aRow][bCol] + matrix[bRow][aCol];
      }
    }

    // Remove padding X's (optional)
    // setOutput(result.replace(/X$/, "").replace(/(.)X\1/g, "$1$1"));
    setOutput(result);
  };
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-100">{title}</h2>
      <div className="space-y-2">
        <Label htmlFor="playfair-input" className="text-gray-300">
          Input
        </Label>
        <Input
          id="playfair-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter text to encrypt/decrypt"
          className="bg-gray-700 text-gray-100 border-gray-600 focus:border-blue-500"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="playfair-key" className="text-gray-300">
          Key
        </Label>
        <Input
          id="playfair-key"
          value={key}
          onChange={(e) => setKey(e.target.value.toUpperCase())}
          className="bg-gray-700 text-gray-100 border-gray-600 focus:border-blue-500"
        />
      </div>
      <div className="space-x-2">
        <Button
          onClick={handleEncrypt}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          Encrypt
        </Button>
        <Button
          onClick={handleDecrypt}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          Decrypt
        </Button>
      </div>
      <div className="space-y-2">
        <Label htmlFor="playfair-output" className="text-gray-300">
          Output
        </Label>
        <Input
          id="playfair-output"
          value={output}
          readOnly
          className="bg-gray-700 text-gray-100 border-gray-600"
        />
      </div>
    </div>
  );
}
