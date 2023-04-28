const STRIPE_CLIENT = 'STRIPE_CLIENT';
const STRIPE_CURRENCY = 'usd';
const PAYMENT_METHOD_TYPE = 'card';
const INTERVAL = 'year';
const IMAGE_MIME_TYPES = {
  'image/jpeg': '.jpg',
  'image/gif': '.gif',
  'image/png': '.png',
  'image/webp': '.webp',
  'image/avif': '.avif',
  'image/tiff': '.tiff',
  "image/heif": ".heif",
}
const AVATAR_IMAGE = {
  folderName:'avatars',
  extension: '.webp',
  format: 'webp',
  width: 800,
  height: 800,
}

const passwordValidation = /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?=.*[!@#$&*])(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).*$/

export {
  IMAGE_MIME_TYPES,
  AVATAR_IMAGE,
  STRIPE_CLIENT,
  STRIPE_CURRENCY,
  PAYMENT_METHOD_TYPE,
  INTERVAL,
  passwordValidation
};
