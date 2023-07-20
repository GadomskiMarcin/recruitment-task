import { expensesStore } from "../../../stores/ExpensesStore.tsx";
import { ExpenseCell } from "./ExpenseCell.tsx";
import { Text } from "@chakra-ui/react";
import { observer } from "mobx-react";
import { EXPENSES_TABLE_HEADERS } from "../consts.ts";
import { DataTableTemplate } from "./DataTableTemplate.tsx";

export const ExpensesTable = observer(() => {
  const { expenses, euroRate, deleteExpense } = expensesStore;
  const { totalAmount, euroAmount } = expensesStore.totalAmount;

  return (
    <>
      <DataTableTemplate headers={EXPENSES_TABLE_HEADERS}>
        {expenses.map((expense) => (
          <ExpenseCell
            key={expense.id}
            expense={expense}
            euroRate={euroRate}
            onClick={deleteExpense}
          />
        ))}
      </DataTableTemplate>
      <Text>
        Sum: {totalAmount} PLN ({euroAmount} EUR)
      </Text>
    </>
  );
});
