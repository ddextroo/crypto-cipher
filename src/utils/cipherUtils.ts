export const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export function sanitizeInput(input: string): string {
  return input.toUpperCase().replace(/[^A-Z]/g, "");
}

export function mod(n: number, m: number): number {
  return ((n % m) + m) % m;
}
