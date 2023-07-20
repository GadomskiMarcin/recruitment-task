import { Expense, ItemOptions } from "./types.ts";

export const BASE_EUR_RATE = 4.382;
export const LIST_OF_EXPENSES_INITIAL_STATE: Expense[] = [
  {
    title: "New book about Rust",
    amount: 100,
    options: [ItemOptions.DELETE],
    id: new Date().valueOf(),
    euroEquiv: 100 / BASE_EUR_RATE,
  },
  {
    title: "Snack for a football match",
    amount: 20,
    options: [ItemOptions.DELETE],
    id: new Date().valueOf() - 1,
    euroEquiv: 20 / BASE_EUR_RATE,
  },
  {
    title: "Bus ticket",
    amount: 2.55,
    options: [ItemOptions.DELETE],
    id: new Date().valueOf() - 2,
    euroEquiv: 2.55 / BASE_EUR_RATE,
  },
];
