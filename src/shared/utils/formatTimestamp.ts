export const formatTimestamp = (timestampMs: number): string => {
  const date = new Date(timestampMs);

  const day = date.getDate();
  const month = date.toLocaleString('en-US', { month: 'short' });
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const period = hours >= 12 ? 'PM' : 'AM';
  const formattedHours = hours % 12 || 12;

  return `${month} ${day}, ${year} ${formattedHours}:${
    minutes < 10 ? '0' + minutes : minutes
  } ${period}`;
};
