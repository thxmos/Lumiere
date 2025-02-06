/*
Maybe theres a better way to do this, but I didn't include this in actions 
since its not async and importing it from a server action is not possible
*/

export const generateQRCode = (link: string, size: number = 200) => {
  const encodedLink = encodeURIComponent(link);
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${encodedLink}&size=${size}x${size}`;
  return qrCodeUrl;
};

export const generateQRCode2 = (qrId: string, size: number = 200) => {
  const APP_URL = process.env.NEXT_PUBLIC_URL;

  const encodedLink = encodeURIComponent(`${APP_URL}/qr/${qrId}`);
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${encodedLink}&size=${size}x${size}`;
  return qrCodeUrl;
};
