import { Expense } from "../../../types.ts";
import { Button, Th, Tr } from "@chakra-ui/react";

type ExpenseCellProps = {
  expense: Expense;
  euroRate: number;
  onClick: (arg0: number) => void;
};

export function ExpenseCell({ expense, euroRate, onClick }: ExpenseCellProps) {
  return (
    <Tr>
      <Th>{expense.title}</Th>
      <Th>{expense.amount}</Th>
      <Th>{(expense.amount / euroRate).toFixed(2)}</Th>
      <Th>
        <Button onClick={() => onClick(expense.id)}>
          {expense.options.toString()}
        </Button>
      </Th>
    </Tr>
  );
}
