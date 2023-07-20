import { Table, TableContainer, Tbody, Thead, Tr } from "@chakra-ui/react";
import { ReactNode } from "react";
import { ExpensesHeaders } from "../types.ts";
import { HeaderCell } from "./HeaderCell.tsx";
import { SortOrder, SortType } from "../../../types.ts";
import { expensesStore } from "../../../stores/ExpensesStore.tsx";
import { observer } from "mobx-react";

type DataTableTemplateProps = {
  children: ReactNode;
  headers: ExpensesHeaders;
};

export const DataTableTemplate = observer(
  ({ children, headers }: DataTableTemplateProps) => {
    const sortType = expensesStore.sortType;
    const sortOrder = expensesStore.sortOrder;
    const onClick = (sortType: SortType) => {
      expensesStore.changeSortType(sortType);
    };
    const isAscending = (headerSortType: SortType) =>
      headerSortType == sortType && sortOrder == SortOrder.ASCENDING;
    const headersEntries = Object.entries(headers) as [SortType, string][];

    return (
      <TableContainer>
        <Table variant="striped" colorScheme="teal" size="sm">
          <Thead>
            <Tr>
              {headersEntries.map(([sortType, title]) => (
                <HeaderCell
                  key={sortType}
                  title={title}
                  onClick={() => onClick(sortType)}
                  isDescending={!isAscending(sortType)}
                />
              ))}
            </Tr>
          </Thead>
          <Tbody>{children}</Tbody>
        </Table>
      </TableContainer>
    );
  },
);
