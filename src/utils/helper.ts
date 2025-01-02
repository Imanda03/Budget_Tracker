export const ICONS = [
  {id: 1, name: '🛒', value: 'shopping-cart'},
  {id: 2, name: '🏠', value: 'home'},
  {id: 3, name: '🚗', value: 'car'},
  {id: 4, name: '🎮', value: 'game'},
  {id: 5, name: '🍔', value: 'food'},
  {id: 6, name: '✈️', value: 'flight'},
  {id: 7, name: '🎵', value: 'music'},
  {id: 8, name: '💰', value: 'money'},
];

export const capitalize = (text: string) =>
  text.toLowerCase().replace(/\b\w/g, char => char.toUpperCase());

export const formatDateTime = (isoDateString: string | number | Date) => {
  const date = new Date(isoDateString);

  // Extracting components
  const options: any = {hour: 'numeric', minute: 'numeric', hour12: true};
  const day = date.getDate();
  const month = date.toLocaleString('en-US', {month: 'short'});
  const timePart = date.toLocaleTimeString('en-US', options);

  return `${day} ${month} ${timePart}`;
};
