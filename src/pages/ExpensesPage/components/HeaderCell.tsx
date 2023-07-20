import { Stack, Text, Th } from "@chakra-ui/react";
import { SortIndicator } from "../../../components/SortIndicator.tsx";

type HeaderCell = {
  title: string;
  onClick: () => void;
  isDescending: boolean;
};
export function HeaderCell({ title, onClick, isDescending }: HeaderCell) {
  return (
    <Th onClick={onClick} cursor="pointer">
      <Stack direction="row" alignItems="center">
        <Text>{title}</Text>
        <SortIndicator isDescending={isDescending} />
      </Stack>
    </Th>
  );
}
