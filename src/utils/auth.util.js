export const getCookie = (key) => {
  const regex = new RegExp(`(^| )${key}=([^;]+)`);
  const match = document.cookie.match(regex);

  if (match) {
    return match[2];
  } else return null;
};
