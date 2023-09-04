const waitTime = (time: number): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
};

const generateId = () => {
  return crypto.randomUUID();
};

export { waitTime, generateId };
