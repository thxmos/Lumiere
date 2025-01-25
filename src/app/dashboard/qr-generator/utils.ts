/*
Maybe theres a better way to do this, but I didn't include this in actions 
since its not async and importing it from a server action is not possible
*/

export const generateQRCode = (link: string) => {
  const encodedLink = encodeURIComponent(link);
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${encodedLink}&size=200x200`;
  return qrCodeUrl;
};
