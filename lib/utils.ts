const createNonRepeatingNumberGenerator = (min = 1, max = 30) => {
  let numbers: number[] = [];
  let index = 0;

  function shuffle() {
    numbers = [];

    for (let i = min; i <= max; i++) {
      numbers.push(i);
    }

    for (let i = numbers.length - 1; i > 0; i--) {
      const randomIndex = Math.floor(Math.random() * (i + 1));
      [numbers[i], numbers[randomIndex]] = [numbers[randomIndex], numbers[i]];
    }

    index = 0;
  }

  shuffle();

  return function getNumber() {
    if (index >= numbers.length) {
      shuffle(); // reset only after all numbers are used
    }

    return numbers[index++];
  };
};

export const getRandomNumber = (min = 1, max = 60) => createNonRepeatingNumberGenerator(min, max)();

export const getImageUrl = (imageIndex = 1, size = "original") =>
  `/images/image_${size ? `${size}_` : ""}${imageIndex || 1}.jpg`;

export const shuffle = <T>(array: T[]): T[] => {
  const result = [...array];

  for (let i = result.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));

    [result[i], result[randomIndex]] = [result[randomIndex], result[i]];
  }

  return result;
};
