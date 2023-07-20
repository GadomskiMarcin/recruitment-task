import { Stack, Grid, Heading } from "@chakra-ui/react";
import { AddExpenseForm } from "./components/AddExpenseForm.tsx";
import { EditableEuroText } from "./components/EditableEuroText.tsx";
import { ExpensesTable } from "./components/ExpensesTable.tsx";

export function ExpensesPage() {
  return (
    <Stack direction="column" spacing={"24px"}>
      <Grid templateColumns="repeat(2, 1fr)" gap={6} alignItems="center">
        <Heading>List of Expenses</Heading>
        <EditableEuroText />
      </Grid>
      <AddExpenseForm />
      <ExpensesTable />
    </Stack>
  );
}
