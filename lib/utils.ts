import { Bang, bangs } from "@/bangs";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getBang(query: string): { bang: Bang | null; searchTerm: string } {
  let searchTerm = query;
  let foundBang: Bang | null = null;

  for (const bangObj of bangs) {
    const bangPattern = bangObj.bang;
    let bangIndex = -1;
    let isExactMatch = false;
    let isStartMatch = false;
    let isEndMatch = false;
    let isMiddleMatch = false;

    if (query === bangPattern) {
      bangIndex = 0;
      isExactMatch = true;
    } else if (query.startsWith(bangPattern + " ")) {
      bangIndex = 0;
      isStartMatch = true;
    } else if (query.endsWith(" " + bangPattern)) {
      bangIndex = query.lastIndexOf(" " + bangPattern) + 1;
      isEndMatch = true;
    } else {
      const middleIndex = query.indexOf(" " + bangPattern + " ");
      if (middleIndex !== -1) {
        bangIndex = middleIndex + 1;
        isMiddleMatch = true;
      }
    }

    if (bangIndex !== -1) {
      foundBang = bangObj;

      if (isExactMatch) {
        searchTerm = "";
      } else if (isStartMatch) {
        searchTerm = query.substring(bangPattern.length + 1);
      } else if (isEndMatch) {
        searchTerm = query.substring(0, bangIndex - 1);
      } else if (isMiddleMatch) {
        const before = query.substring(0, bangIndex - 1);
        const after = query.substring(bangIndex + bangPattern.length + 1);
        searchTerm = (before + " " + after).trim();
      }

      break;
    }
  }

  return { bang: foundBang, searchTerm };
}

export function getBangUrl(query: string): string | null {
  const { bang, searchTerm } = getBang(query);

  if (!bang) {
    return null;
  }

  return bang.url.replace("{{query}}", encodeURIComponent(searchTerm.trim()));
}
