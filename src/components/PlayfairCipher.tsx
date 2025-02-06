"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { CipherProps } from "@/types/cipherTypes";
import { sanitizeInput } from "@/utils/cipherUtils";

export function PlayfairCipher({ title }: CipherProps) {
  const [input, setInput] = useState("");
  const [key, setKey] = useState("PLAYFAIREXAMPLE");
  const [output, setOutput] = useState("");

  const generateMatrix = (key: string) => {
    const alphabet = "ABCDEFGHIKLMNOPQRSTUVWXYZ";
    const uniqueChars = Array.from(new Set(key + alphabet));
    const matrix: string[][] = [];
    for (let i = 0; i < 5; i++) {
      matrix.push(uniqueChars.slice(i * 5, (i + 1) * 5));
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
    const sanitized = sanitizeInput(input).replace(/J/g, "I");
    const matrix = generateMatrix(sanitizeInput(key));
    let result = "";

    for (let i = 0; i < sanitized.length; i += 2) {
      const a = sanitized[i];
      let b = sanitized[i + 1] || "X";

      if (a === b) {
        b = "X";
        i--;
      }

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

  const handleDecrypt = () => {
    const sanitized = sanitizeInput(input);
    const matrix = generateMatrix(sanitizeInput(key));
    let result = "";

    for (let i = 0; i < sanitized.length; i += 2) {
      const a = sanitized[i];
      const b = sanitized[i + 1];

      const [aRow, aCol] = findPosition(matrix, a);
      const [bRow, bCol] = findPosition(matrix, b);

      if (aRow === bRow) {
        result +=
          matrix[aRow][(aCol - 1 + 5) % 5] + matrix[bRow][(bCol - 1 + 5) % 5];
      } else if (aCol === bCol) {
        result +=
          matrix[(aRow - 1 + 5) % 5][aCol] + matrix[(bRow - 1 + 5) % 5][bCol];
      } else {
        result += matrix[aRow][bCol] + matrix[bRow][aCol];
      }
    }

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
