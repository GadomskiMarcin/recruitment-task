export enum ItemOptions {
  DELETE = "DELETE",
}

export type Expense = {
  title: string;
  amount: number;
  options: ItemOptions[];
  id: number;
  euroEquiv: number;
};

export type SortType = keyof Omit<Expense, "id">;

export enum SortOrder {
  ASCENDING = "asc",
  DESCENDING = "desc",
}

export type ExpensePayload = Pick<Expense, "title" | "amount">;
