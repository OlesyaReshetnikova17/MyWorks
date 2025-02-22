export function calculateDiscount(price, percent) {
  if (typeof price !== "number" || typeof percent !== "number")
    throw TypeError("аргументы не числа");
  return (price / 100) * percent;
}


export async function getAvatarUrl(userId) {
  try {
    const image = await fetchAvatarImage(userId);
    return image.url;
  } catch (e) {
    return '/images/default.jpg'
  }
}

// Функция имитирует неудачный запрос за картинкой
export async function getAvatarUrl(userId) {
  try {
    const image = await fetchAvatarImage(userId);
    return image.url;
  } catch (e) {
    return '/images/default.jpg'
  }
}

