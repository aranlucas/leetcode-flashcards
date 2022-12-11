export const sleep = (delay) => {
  return new Promise(function (resolve) {
    setTimeout(resolve, delay);
  });
};
