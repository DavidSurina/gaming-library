import { CurrentQueryType } from "../contexts/LibraryContext";
import { GameParams } from "../types/rawgTypes";

export function getSelectData(
  data: Record<string, string | Partial<GameParams>>
): CurrentQueryType[] {
  return Object.entries(data).map(([key, value]) => {
    return {
      queryKey: key,
      params: value as string,
    };
  });
}
