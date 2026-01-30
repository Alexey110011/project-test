import { create, type StateCreator } from "zustand";
import { persist } from 'zustand/middleware'
import type { ProductType } from "../types/types";
import type { BasketItem } from "../types/types";
interface UserStore {
  items: BasketItem[];
  addItemToBasket: (product: ProductType) => void;
  increment: (id: string | number) => void;
  decrement: (id: string | number) => void;
  removeItem: (id: string | number) => void;
  show: () => void;
  saveOrder: () => void;
  reset: () => void;
}
const userStore:StateCreator<UserStore>= (set: any, get: any) => ({
  items: [],
  addItemToBasket: (product: ProductType) =>
    set((state: any) => {
      const existing = state.items.find(
        (i: BasketItem) => i.product.id === product.id
      );

      if (existing) {
        return {
          items: state.items.map((i: BasketItem) =>
            i.product.id === product.id
              ? { ...i, quantity: i.quantity + 1 }
              : i
          ),
        };
      }
      return {
        items: [...state.items, { product, quantity: 1 }],
      };
    }),

  increment: (id: string | number) =>
    set((state: any) => ({
      items: state.items.map((i: BasketItem) =>
        i.product.id === id ? { ...i, quantity: i.quantity + 1 } : i
      ),
    })),

  decrement: (id: string | number) =>
    set((state: any) => ({
      items: state.items.map((i: BasketItem) =>
        i.product.id === id
          ? { ...i, quantity: i.quantity - 1 }
          : i
      )
        .filter((i: BasketItem) => i.quantity > 0),
    })),

  removeItem: (id: string | number) =>
    set((state: any) => ({
      items: state.items.filter(
        (i: BasketItem) => i.product.id !== id
      ),
    })),

  show: () => console.log(get().items),
  /*const { items } = get()
console.log(items)*/
  saveOrder: () => {
    const items = get().items
    localStorage.setItem('last-order', JSON.stringify(items))
    set({ items: [] })
  },
  
  reset: () => {
    set({
      items: [],
    });
    console.log('Reset')
  },
});

const useUserStore = create<UserStore>()(
  persist(userStore,
    { name: 'user-store' }
  )
);

export default useUserStore;