export const formatDate = (date: string, locale: string = "pt-Br") => {
  return new Date(date).toLocaleString(locale, {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
};
