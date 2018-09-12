const getDate = (date: Date) => {
  return date.getDate();
}

const getMonth = (date: Date) => {
  return date.getMonth() + 1;
}

const getYear = (date: Date) => {
  return date.getFullYear();
}

const isSameMonth = (date1: Date, date2: Date) => {
  return getMonth(date1) === getMonth(date2);
}

const isSameDate = (date1: Date, date2: Date) => {
  return getDate(date1) === getDate(date2);
}

const isSameYear = (date1: Date, date2: Date) => {
  return getYear(date1) === getYear(date2);
}

const isSameDay = (date1: Date | number, date2: Date | number, checkMonth: boolean = false, checkYear: boolean = false) => {
  console.log('here');
  if (typeof date1 === 'number') {
    date1 = new Date(date1);
  }

  if (typeof date2 === 'number') {
    date2 = new Date(date2);
  }

  switch (true) {
    case (checkMonth && checkYear):
      return (
        isSameDate(date1, date2) &&
        isSameMonth(date1, date2) &&
        isSameYear(date1, date2)
      );
    case (checkMonth && !checkYear):
      return (
        isSameDate(date1, date2) &&
        isSameMonth(date1, date2)
      );
    case (!checkMonth && checkYear):
      throw new Error('Inconsisten checkMonth and checkYear');
    default:
      return (
        isSameDate(date1, date2)
      );
  }
};

export default {
  isSameDay
};