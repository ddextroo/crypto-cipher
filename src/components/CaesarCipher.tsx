"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { CipherProps } from "@/types/cipherTypes";
import { sanitizeInput, alphabet, mod } from "@/utils/cipherUtils";

export function CaesarCipher({ title }: CipherProps) {
  const [input, setInput] = useState("");
  const [shift, setShift] = useState(3);
  const [output, setOutput] = useState("");

  const handleEncrypt = () => {
    const result = input
      .split("")
      .map((char) => {
        if (/^[A-Z]$/.test(char)) {
          const index = alphabet.indexOf(char);
          return alphabet[mod(index + shift, 26)];
        } else if (/^[a-z]$/.test(char)) {
          const index = alphabet.indexOf(char.toUpperCase());
          return alphabet[mod(index + shift, 26)].toLowerCase();
        } else {
          return char;
        }
      })
      .join("");
    setOutput(result);
  };

  const handleDecrypt = () => {
    const result = input
      .split("")
      .map((char) => {
        if (/^[A-Z]$/.test(char)) {
          const index = alphabet.indexOf(char);
          return alphabet[mod(index - shift, 26)];
        } else if (/^[a-z]$/.test(char)) {
          const index = alphabet.indexOf(char.toUpperCase());
          return alphabet[mod(index - shift, 26)].toLowerCase();
        } else {
          return char;
        }
      })
      .join("");
    setOutput(result);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-100">{title}</h2>
      <div className="space-y-2">
        <Label htmlFor="caesar-input" className="text-gray-300">
          Input
        </Label>
        <Input
          id="caesar-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter text to encrypt/decrypt"
          className="bg-gray-700 text-gray-100 border-gray-600 focus:border-blue-500"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="caesar-shift" className="text-gray-300">
          Shift
        </Label>
        <Input
          id="caesar-shift"
          type="number"
          value={shift}
          onChange={(e) => setShift(Number(e.target.value))}
          min={0}
          max={25}
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
        <Label htmlFor="caesar-output" className="text-gray-300">
          Output
        </Label>
        <Input
          id="caesar-output"
          value={output}
          readOnly
          className="bg-gray-700 text-gray-100 border-gray-600"
        />
      </div>
    </div>
  );
}
