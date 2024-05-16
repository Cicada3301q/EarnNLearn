export const getCookie = (key: string) => {
  const regex = new RegExp(`(^| )${key}=([^;]+)`);
  const match = document.cookie.match(regex);

  if (match) {
    return match[2];
  } else return null;
};

export const setCookie = (key: string, value: string) => {
  document.cookie = `${key}=${value}`;
};

export const removeCookie = (key: string) => {
  document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};
