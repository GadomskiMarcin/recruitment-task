import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { ExpensePayload } from "../../../types.ts";
import { testDecimalPoints } from "../utils.ts";
import {
  MIN_TITLE_LENGTH,
  TOAST_SUCCESS_DEFAULT_SETTINGS,
  TRANSACTION_VALIDATIONS_ERROR_MESSAGES as ERROR_MESSAGES,
} from "../consts.ts";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  GridItem,
  Input,
  useToast,
} from "@chakra-ui/react";
import { expensesStore } from "../../../stores/ExpensesStore.tsx";

export function AddExpenseForm() {
  const toast = useToast();
  const schema: Yup.ObjectSchema<ExpensePayload> = Yup.object().shape({
    title: Yup.string()
      .min(MIN_TITLE_LENGTH, ERROR_MESSAGES.TITLE.TOO_SHORT)
      .required(ERROR_MESSAGES.TITLE.EMPTY),
    amount: Yup.number()
      .typeError(ERROR_MESSAGES.AMOUNT.TYPE)
      .positive(ERROR_MESSAGES.AMOUNT.NEGATIVE)
      .test("decimal-places", ERROR_MESSAGES.AMOUNT.DECIMALS, testDecimalPoints)
      .required(ERROR_MESSAGES.AMOUNT.EMPTY),
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ExpensePayload>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: ExpensePayload) => {
    expensesStore.addExpense(data);
    toast(TOAST_SUCCESS_DEFAULT_SETTINGS(data));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid templateColumns="repeat(2, 1fr)" gap={6}>
        <GridItem>
          <FormControl isInvalid={errors?.title !== undefined}>
            <FormLabel>Title of transaction</FormLabel>
            <Controller
              name="title"
              control={control}
              defaultValue=""
              render={({ field }) => <Input {...field} />}
            />
            {errors.title && (
              <FormErrorMessage>{errors.title.message}</FormErrorMessage>
            )}
          </FormControl>
          <FormControl isInvalid={errors?.amount !== undefined}>
            <FormLabel>Amount (in PLN)</FormLabel>
            <Controller
              name="amount"
              control={control}
              defaultValue={0}
              render={({ field }) => (
                <Input type="number" step="0.01" {...field} />
              )}
            />
            {errors.amount && (
              <FormErrorMessage>{errors.amount.message}</FormErrorMessage>
            )}
          </FormControl>
        </GridItem>
        <Button
          top={"calc(100% - 40px)"}
          maxW={"30%"}
          colorScheme="teal"
          type="submit"
        >
          Submit
        </Button>
      </Grid>
    </form>
  );
}
