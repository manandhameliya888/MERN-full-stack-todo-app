export const formatDateDDMMYYYY = (value) => {
  const dateValue = new Date(value);
  const day = String(dateValue.getDate()).padStart(2, "0");
  const month = String(dateValue.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const year = dateValue.getFullYear();
  return `${day}/${month}/${year}`;
};

export const formateDateYYYYMMDD = (value) => {
  const day = value?.split("/")?.[0];
  const month = value?.split("/")?.[1];
  const year = value?.split("/")?.[2];
  return `${year}-${month}-${day}`;
};
