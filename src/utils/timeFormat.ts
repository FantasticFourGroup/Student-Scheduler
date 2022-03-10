export function getTimeFormat(date: Date) {
  const hour = (date.getHours() < 10 ? "0" : "") + date.getHours().toString();
  const min =
    (date.getMinutes() < 10 ? "0" : "") + date.getMinutes().toString();
  return `${hour}:${min}`;
}

const DEFAULT_DATES: { [key: string]: number } = {
  0: 24,
  1: 25,
  2: 26,
  3: 27,
  4: 28,
  5: 29,
  6: 30,
};

export function toDate(num: string, time: string) {
  const [hour, min] = time.split(":").map(Number);
  return new Date(2018, 5, DEFAULT_DATES[num], hour, min, 0);
}
