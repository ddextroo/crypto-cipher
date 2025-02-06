"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { CipherProps } from "@/types/cipherTypes";
import { alphabet, sanitizeInput } from "@/utils/cipherUtils";

export function MonoalphabeticCipher({ title }: CipherProps) {
  const [input, setInput] = useState("");
  const [key, setKey] = useState(
    alphabet
      .split("")
      .sort(() => Math.random() - 0.5)
      .join("")
  );
  const [output, setOutput] = useState("");

  const handleEncrypt = () => {
    const sanitized = sanitizeInput(input);
    const result = sanitized
      .split("")
      .map((char) => {
        const index = alphabet.indexOf(char);
        return key[index];
      })
      .join("");
    setOutput(result);
  };

  const handleDecrypt = () => {
    const sanitized = sanitizeInput(input);
    const result = sanitized
      .split("")
      .map((char) => {
        const index = key.indexOf(char);
        return alphabet[index];
      })
      .join("");
    setOutput(result);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-100">{title}</h2>
      <div className="space-y-2">
        <Label htmlFor="mono-input" className="text-gray-300">
          Input
        </Label>
        <Input
          id="mono-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter text to encrypt/decrypt"
          className="bg-gray-700 text-gray-100 border-gray-600 focus:border-blue-500"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="mono-key" className="text-gray-300">
          Key (Substitution Alphabet)
        </Label>
        <Input
          id="mono-key"
          value={key}
          onChange={(e) => setKey(e.target.value.toUpperCase())}
          maxLength={26}
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
        <Label htmlFor="mono-output" className="text-gray-300">
          Output
        </Label>
        <Input
          id="mono-output"
          value={output}
          readOnly
          className="bg-gray-700 text-gray-100 border-gray-600"
        />
      </div>
    </div>
  );
}
