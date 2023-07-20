import { ExpensePayload } from "../../types.ts";
import { UseToastOptions } from "@chakra-ui/react";
import { ExpensesHeaders } from "./types.ts";

export const MIN_TITLE_LENGTH = 5;
export const TRANSACTION_VALIDATIONS_ERROR_MESSAGES = {
  TITLE: {
    TOO_SHORT: `Title should be at least ${MIN_TITLE_LENGTH} characters`,
    EMPTY: "Title is required",
  },
  AMOUNT: {
    TYPE: "Invalid amount",
    NEGATIVE: "Amount should be positive",
    DECIMALS: "Amount should have at most two digits after the decimal point",
    EMPTY: "Amount is required",
  },
};

export const TOAST_SUCCESS_DEFAULT_SETTINGS = ({
  title,
  amount,
}: ExpensePayload): UseToastOptions => ({
  title: "New expense was created.",
  description: `Expense ${title} for ${amount}PLN has been added`,
  status: "success",
  duration: 2000,
  isClosable: true,
});

export const EXPENSES_TABLE_HEADERS: ExpensesHeaders = {
  title: "Title",
  amount: "Amount(PLN)",
  euroEquiv: "Amount(EUR)",
  options: "Options",
};
