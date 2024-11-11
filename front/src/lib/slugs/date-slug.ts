export const isValidDateSlug = (slug: string) => {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  return regex.test(slug);
};
