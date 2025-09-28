import { User } from "@/types";

export function formatName(fullName: User["fullName"] | undefined): string {
  if (!fullName) return "Anonymous User";
  const parts = fullName.trim().split(/\s+/);
  if (parts.length === 1) return parts[0];
  return `${parts[0]} ${parts[parts.length - 1].charAt(0)}.`;
}
