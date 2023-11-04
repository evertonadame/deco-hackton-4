export const maskOnlyNumber = (value: string) => {
  return value.replace(/\D/g, "");
};

export const maskTextValue = (value: string) => {
  const lettersOnly = value.replace(/[^a-zA-Z\s]/g, "");
  return lettersOnly;
};
