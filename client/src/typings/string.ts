declare global {
  interface String {
    capitalize(): string;
    toDate(format: string): Date;
  }
}

String.prototype.capitalize = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

String.prototype.toDate = function (format: string) {
  const normalized = this.replace(/[^a-zA-Z0-9]/g, '-');
  const normalizedFormat = format.toLowerCase().replace(/[^a-zA-Z0-9]/g, '-');
  const formatItems = normalizedFormat.split('-');
  const dateItems: string[] = normalized.split('-');

  const monthIndex = formatItems.indexOf('mm');
  const dayIndex = formatItems.indexOf('dd');
  const yearIndex = formatItems.indexOf('yyyy');
  const hourIndex = formatItems.indexOf('hh');
  const minutesIndex = formatItems.indexOf('ii');
  const secondsIndex = formatItems.indexOf('ss');

  const today = new Date();

  const year = yearIndex > -1 ? dateItems[yearIndex] : today.getFullYear();
  const month =
    monthIndex > -1 ? +dateItems[monthIndex] - 1 : today.getMonth() - 1;
  const day = dayIndex > -1 ? dateItems[dayIndex] : today.getDate();

  const hour = hourIndex > -1 ? dateItems[hourIndex] : today.getHours();
  const minute =
    minutesIndex > -1 ? dateItems[minutesIndex] : today.getMinutes();
  const second =
    secondsIndex > -1 ? dateItems[secondsIndex] : today.getSeconds();

  return new Date(+year, month, +day, +hour, +minute, +second);
};

export {};
