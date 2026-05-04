const WHATSAPP_NUMBER = "+918169887643";

export const waLink = (message: string) => {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
};
