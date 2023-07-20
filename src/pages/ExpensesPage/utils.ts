export const testDecimalPoints = (value: number | undefined) => {
  if (value !== undefined) {
    return /^\d+(\.\d{1,2})?$/.test(value.toString());
  }
  return true;
};
