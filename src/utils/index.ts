export const generateSlug = (name: string) => {
  return name.toLowerCase().replace(/ /g, '-');
};
