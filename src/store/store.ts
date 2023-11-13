// - `useStore` is a hook that returns the store object.
// - `create` is a function that creates a store.
// - `persist` is a function that persists the store.
// - `createJSONStorage` is a function that creates a storage object.
// - `AsyncStorage` is a storage object.
// - `set` is a function that sets the store state.
// - `get` is a function that gets the store state.
// - `produce` is a function that creates a draft state.
// - `state` is a draft state.

import {create} from 'zustand';
import {produce} from 'immer';
import {persist, createJSONStorage} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CoffeeData from '../data/CoffeeData';
import BeansData from '../data/BeansData';

export const useStore = create(
  persist(
    (set, get) => ({
      coffeeList: CoffeeData,
      beanList: BeansData,
      cartPrice: 0,
      favoritesList: [],
      cartList: [],
      orderHistoryList: [],
    }),
    {
      name: 'coffee-shop',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
