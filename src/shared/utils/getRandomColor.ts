export const getRandomColor = (): string => {
  const colors = ['#CA3178', '#fd3977', '#f71cb5', '#ff62be'];

  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
};
