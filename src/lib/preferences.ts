export type ThemePreference = "light" | "dark";
export type SidebarMode = "OPEN" | "COLLAPSED" | "HIDDEN";

type PreferenceKey = "admin-theme" | "admin-sidebar-mode";

const subscribers: Record<PreferenceKey, Set<() => void>> = {
  "admin-theme": new Set(),
  "admin-sidebar-mode": new Set(),
};

function subscribeToPreference(
  key: PreferenceKey,
  subscriber: () => void,
): () => void {
  subscribers[key].add(subscriber);

  const handleStorage = (event: StorageEvent) => {
    if (event.key === key || event.key === null) subscriber();
  };

  window.addEventListener("storage", handleStorage);
  return () => {
    subscribers[key].delete(subscriber);
    window.removeEventListener("storage", handleStorage);
  };
}

function savePreference(key: PreferenceKey, value: string) {
  window.localStorage.setItem(key, value);
  subscribers[key].forEach((subscriber) => subscriber());
}

export function getThemePreference(): ThemePreference | null {
  if (typeof window === "undefined") return null;

  const value = window.localStorage.getItem("admin-theme");
  if (value === "light" || value === "dark") return value;
  return null;
}

export function subscribeToThemePreference(subscriber: () => void) {
  return subscribeToPreference("admin-theme", subscriber);
}

export function saveThemePreference(theme: ThemePreference) {
  savePreference("admin-theme", theme);
}

export function getSidebarModePreference(): SidebarMode {
  if (typeof window === "undefined") return "HIDDEN";

  const value = window.localStorage.getItem("admin-sidebar-mode");
  if (value === "OPEN" || value === "COLLAPSED" || value === "HIDDEN") {
    return value;
  }
  return "HIDDEN";
}

export function subscribeToSidebarModePreference(subscriber: () => void) {
  return subscribeToPreference("admin-sidebar-mode", subscriber);
}

export function saveSidebarModePreference(mode: SidebarMode) {
  savePreference("admin-sidebar-mode", mode);
}
