import { format } from "date-fns";

const inputDateStyle = "yyyy-MM-dd";

const formatDateForInput = (date) => {
  if ((date !== null) & (date !== undefined)) {
    return format(date, inputDateStyle);
  }
  //   return format(new Date(), inputDateStyle);
};

export { inputDateStyle, formatDateForInput };
