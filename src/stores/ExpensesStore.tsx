import { BASE_EUR_RATE, LIST_OF_EXPENSES_INITIAL_STATE } from "../consts.ts";
import {
  Expense,
  ExpensePayload,
  ItemOptions,
  SortOrder,
  SortType,
} from "../types.ts";
import { action, computed, makeObservable, observable } from "mobx";

export class ExpenseStore {
  expenses: Expense[];
  euroRate: number;
  sortType: keyof Expense;
  sortOrder: SortOrder;
  constructor() {
    makeObservable(this, {
      expenses: observable,
      euroRate: observable,
      sortType: observable,
      sortOrder: observable,
      addExpense: action,
      changeSortOrder: action,
      deleteExpense: action,
      changeEuroRate: action,
      changeSortType: action,
      totalAmount: computed,
    });
    this.expenses = LIST_OF_EXPENSES_INITIAL_STATE;
    this.euroRate = BASE_EUR_RATE;
    this.sortType = "id";
    this.sortOrder = SortOrder.ASCENDING;
  }

  addExpense = ({ title, amount }: ExpensePayload) => {
    const newExpense = {
      title,
      amount,
      options: [ItemOptions.DELETE],
      id: new Date().valueOf(),
      euroEquiv: amount / this.euroRate,
    };
    this.expenses.push(newExpense);
    this.sortExpenses();
  };

  deleteExpense = (id: number) => {
    this.expenses = this.expenses.filter((expense) => expense.id !== id);
  };
  changeSortType = (sortType: SortType) => {
    if (sortType == this.sortType) {
      this.changeSortOrder();
    } else {
      this.sortType = sortType;
      this.sortOrder = SortOrder.ASCENDING;
    }
    this.sortExpenses();
  };

  changeSortOrder = () => {
    this.sortOrder =
      this.sortOrder == SortOrder.ASCENDING
        ? SortOrder.DESCENDING
        : SortOrder.ASCENDING;
  };

  changeEuroRate = (newEuroRate: number) => {
    this.euroRate = newEuroRate;
    this.expenses = this.expenses.map((expense) => ({
      ...expense,
      euroEquiv: expense.amount / this.euroRate,
    }));
    this.sortExpenses();
  };

  private sortExpenses = () => {
    const sign = this.sortOrder == SortOrder.DESCENDING ? 1 : -1;
    let cmpFn: (arg0: Expense, arg1: Expense) => number;
    switch (this.sortType) {
      case "amount":
        cmpFn = (a, b) => (a["amount"] - b["amount"]) * sign;
        break;
      case "euroEquiv":
        cmpFn = (a, b) => (a["euroEquiv"] - b["euroEquiv"]) * sign;
        break;
      case "options":
        cmpFn = (a, b) => (a["options"].length - b["options"].length) * sign;
        break;
      case "title":
        cmpFn = (a, b) => a["title"].localeCompare(b["title"]) * sign;
        break;
      case "id":
      default:
        cmpFn = (a, b) => (a["id"] - b["id"]) * sign;
    }
    this.expenses.sort(cmpFn);
  };

  get totalAmount() {
    const totalAmount = this.expenses.reduce(
      (total, expense) => total + expense.amount,
      0,
    );
    return {
      totalAmount: totalAmount.toFixed(2),
      euroAmount: (totalAmount / this.euroRate).toFixed(2),
    };
  }
}

export const expensesStore = new ExpenseStore();
