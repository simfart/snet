export const getRandomColor = (): string => {
  const colors = ['#FFD1DC', '#FF9BAA', '#E4717A', '#FFC1CC', '#D8BFD8'];

  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
};
