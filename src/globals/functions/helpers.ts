import { CurrentQueryType } from "../contexts/LibraryContext";

export function currentQueryConvert(
  obj: Record<string, string>
): CurrentQueryType[] {
  return Object.entries(obj).map((entry) => {
    return { queryKey: entry[0], params: entry[1] };
  });
}
