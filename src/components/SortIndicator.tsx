import { Box } from "@chakra-ui/react";

export function SortIndicator({ isDescending }: { isDescending: boolean }) {
  const arrowStyles = {
    width: 0,
    height: 0,
    borderLeft: "5px solid transparent",
    borderRight: "5px solid transparent",
    borderTop: isDescending ? "5px solid black" : "none",
    borderBottom: !isDescending ? "5px solid black" : "none",
  };

  return <Box as="div" style={arrowStyles} />;
}
