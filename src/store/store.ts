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
    (set, _get) => ({
      coffeeList: CoffeeData,
      beanList: BeansData,
      cartPrice: 0,
      favoritesList: [],
      cartList: [],
      orderHistoryList: [],

      addTocart: (cartItem: any) =>
        set(
          produce(state => {
            let found = false;
            for (let i = 0; i < state.cartList.length; i++) {
              if (state.cartList[i].id === cartItem.id) {
                found = true;
                let size = false;
                for (let j = 0; j < state.cartList[i].prices.length; j++) {
                  if (
                    state.cartList[i].prices[j].size === cartItem.prices[0].size
                  ) {
                    size = true;
                    state.cartList[i].prices[j].quantity++;
                    break;
                  }
                }
                if (size === false) {
                  state.cartList[i].prices.push(cartItem.prices[0]);
                }
                state.cartList[i].prices.sort((a: any, b: any) => {
                  if (a.size > b.size) {
                    return -1;
                  }
                  if (a.size < b.size) {
                    return 1;
                  }
                  return 0;
                });
                break;
              }
            }
            if (found === false) {
              state.cartList.push(cartItem);
            }
          }),
        ),

      calculateCartPrice: () =>
        set(
          produce(state => {
            let totalprice = 0;
            for (let i = 0; i < state.cartList.length; i++) {
              let tempprice = 0; // Initialize tempprice outside the inner loop
              for (let j = 0; j < state.cartList[i].prices.length; j++) {
                const price = parseFloat(state.cartList[i].prices[j].price);
                const quantity = state.cartList[i].prices[j].quantity;

                if (!isNaN(price)) {
                  tempprice = tempprice + price * quantity;
                }
              }

              state.cartList[i].ItemPrice = isNaN(tempprice)
                ? '0.00'
                : tempprice.toFixed(2).toString();
              totalprice = totalprice + tempprice;
            }
            state.cartPrice = totalprice.toFixed(2).toString();
          }),
        ),

      addToFavoriteList: (type: string, id: string) =>
        set(
          produce(state => {
            if (type === 'Coffee') {
              for (let i = 0; i < state.coffeeList.length; i++) {
                if (state.coffeeList[i].id === id) {
                  if (state.coffeeList[i].favourite === false) {
                    state.coffeeList[i].favourite = true;
                    state.favoritesList.unshift(state.coffeeList[i]);
                  } else {
                    state.coffeeList[i].favourite = false;
                  }
                  break;
                }
              }
            } else if (type === 'Bean') {
              for (let i = 0; i < state.beanList.length; i++) {
                if (state.beanList[i].id === id) {
                  if (state.beanList[i].favourite === false) {
                    state.beanList[i].favourite = true;
                    state.favoritesList.unshift(state.beanList[i]);
                  } else {
                    state.beanList[i].favourite = false;
                  }
                  break;
                }
              }
            }
          }),
        ),

      deleteFromFavoriteList: (type: string, id: string) =>
        set(
          produce(state => {
            if (type === 'Coffee') {
              for (let i = 0; i < state.coffeeList.length; i++) {
                if (state.coffeeList[i].id === id) {
                  if (state.coffeeList[i].favourite === true) {
                    state.coffeeList[i].favourite = false;
                  } else {
                    state.coffeeList[i].favourite = true;
                  }
                  break;
                }
              }
            } else if (type === 'Beans') {
              for (let i = 0; i < state.beanList.length; i++) {
                if (state.beanList[i].id === id) {
                  if (state.beanList[i].favourite === true) {
                    state.beanList[i].favourite = false;
                  } else {
                    state.beanList[i].favourite = true;
                  }
                  break;
                }
              }
            }
            let spliceIndex = -1;
            for (let i = 0; i < state.favoritesList.length; i++) {
              if (state.favoritesList[i].id === id) {
                spliceIndex = i;
                break;
              }
            }
            state.favoritesList.splice(spliceIndex, 1);
          }),
        ),

      incrementCartItemQuantity: (id: string, size: string) =>
        set(
          produce(state => {
            for (let i = 0; i < state.cartList.length; i++) {
              if (state.cartList[i].id === id) {
                for (let j = 0; j < state.cartList[i].prices.length; j++) {
                  if (state.cartList[i].prices[j].size === size) {
                    state.cartList[i].prices[j].quantity++;
                    break;
                  }
                }
              }
            }
          }),
        ),

      decrementCartItemQuantity: (id: string, size: string) =>
        set(
          produce(state => {
            for (let i = 0; i < state.cartList.length; i++) {
              if (state.cartList[i].id === id) {
                for (let j = 0; j < state.cartList[i].prices.length; j++) {
                  if (state.cartList[i].prices[j].size === size) {
                    if (state.cartList[i].prices.length > 1) {
                      if (state.cartList[i].prices[j].quantity > 1) {
                        state.cartList[i].prices[j].quantity--;
                      } else {
                        state.cartList[i].prices.splice(j, 1);
                      }
                    } else {
                      if (state.cartList[i].prices[j].quantity > 1) {
                        state.cartList[i].prices[j].quantity--;
                      } else {
                        state.cartList.splice(i, 1);
                      }
                    }
                    break;
                  }
                }
              }
            }
          }),
        ),

      addToOrderHistoryListFromCart: () =>
        set(
          produce(state => {
            let temp = state.cartList.reduce(
              (accumulator: number, currentValue: any) =>
                accumulator + parseFloat(currentValue.ItemPrice),
              0,
            );
            if (state.orderHistoryList.length > 0) {
              state.orderHistoryList.unshift({
                OrderDate:
                  new Date().toDateString() +
                  ' ' +
                  new Date().toLocaleTimeString(),
                CartList: state.cartList,
                CartListPrice: temp.toFixed(2).toString(),
              });
            } else {
              state.orderHistoryList.push({
                OrderDate:
                  new Date().toDateString() +
                  ' ' +
                  new Date().toLocaleTimeString(),
                CartList: state.cartList,
                CartListPrice: temp.toFixed(2).toString(),
              });
            }
            state.cartList = [];
          }),
        ),
    }),
    {
      name: 'coffee-shop',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
