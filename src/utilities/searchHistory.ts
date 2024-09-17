const SEARCH_HISTORY_KEY: string = "searchHistory";

export function setSearchHistory(history: any[]): void {
  const data: string = JSON.stringify(history);
  sessionStorage.setItem(SEARCH_HISTORY_KEY, data);
}

export function getSearchHistory(): any[] | null {
  const data: string | null = sessionStorage.getItem(SEARCH_HISTORY_KEY);
  return data ? JSON.parse(data) : null;
}

export function clearSearchHistory(): void {
  sessionStorage.clear();
}
