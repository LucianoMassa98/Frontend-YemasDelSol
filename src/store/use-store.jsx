import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

/**
 * @typedef Store
 * @property {boolean} isLoggedIn
 * @property {any} user
 * @property {(data: any) => void} setUser
 * @property {(status: boolean) => void} setIsLoggedIn
 * @property {() => void} doLogout
 */

/**
 * @type {import("zustand").UseBoundStore<import("zustand").StoreApi<Store>>}
 */

export const useStore = create(
  persist(
    (set) => ({
      isLoggedIn: false,
      user: null,
      setUser: (state) => set(() => ({ user: state })),
      setIsLoggedIn: (status) => set(() => ({ isLoggedIn: status })),
      doLogout: () => set(() => ({ isLoggedIn: false, user: null })),
    }),
    {
      name: "userRol-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
