export const generateSlug = (name: string) => {
  return name.toLowerCase().replace(/ /g, '-');
};

export const generateUniqueId = () => {
  const timestamp = Date.now().toString(36);
  const randomPart = Math.random().toString(36).substring(2, 6);
  return (timestamp + randomPart).substring(0, 10);
};

export const calculateTotalAmount = (orderItems: any) => {
  return orderItems.reduce((total: number, item: any) => {
    return total + item.quantity * item.unitPrice;
  }, 0);
};
