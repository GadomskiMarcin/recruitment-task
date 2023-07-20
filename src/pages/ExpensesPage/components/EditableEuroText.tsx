import React, { useEffect, useRef, useState } from "react";
import { Box, Input, Text } from "@chakra-ui/react";
import { expensesStore } from "../../../stores/ExpensesStore.tsx";
export const EditableEuroText = () => {
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const euroRate = expensesStore.euroRate;

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleBlur = () => {
    setIsEditing(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      setIsEditing(false);
      const target = event.target as HTMLTextAreaElement;
      if (!isNaN(+target.value) && +target.value > 0) {
        expensesStore.changeEuroRate(+target.value);
      }
    }
  };

  return (
    <Box onClick={handleEditClick}>
      {isEditing ? (
        <Input
          type="text"
          defaultValue={euroRate}
          ref={inputRef}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
        />
      ) : (
        <Text>1 EUR = {euroRate}PLN</Text>
      )}
    </Box>
  );
};
