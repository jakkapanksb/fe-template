import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import updateLocale from "dayjs/plugin/updateLocale";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import buddhistEra from "dayjs/plugin/buddhistEra";
import localizedFormat from "dayjs/plugin/localizedFormat";
import customParseFormat from "dayjs/plugin/customParseFormat";
import advancedFormat from "dayjs/plugin/advancedFormat";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isToday from "dayjs/plugin/isToday";
import isBetween from "dayjs/plugin/isBetween";
import isTomorrow from "dayjs/plugin/isTomorrow";
import isYesterday from "dayjs/plugin/isYesterday";
import isLeapYear from "dayjs/plugin/isLeapYear";
import { FC } from "react";
import "dayjs/locale/th";

// Load dayjs plugins
dayjs.extend(updateLocale);
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(buddhistEra);
dayjs.extend(localizedFormat);
dayjs.extend(customParseFormat);
dayjs.extend(advancedFormat);
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);
dayjs.extend(isToday);
dayjs.extend(isTomorrow);
dayjs.extend(isYesterday);
dayjs.extend(isBetween);
dayjs.extend(isLeapYear);

interface DateAdapterType extends Omit<AdapterDayjs, "getWeekdays"> {
  getWeekdays: () => { charAt: () => string }[];
}

export const dateTimePickerFormats = (type: "BE" | "BC") => ({
  shortDate: "MMM D",
  dayOfMonth: "D",
  year: type === "BC" ? "YYYY" : "BBBB",
  month: "MMM",
  monthAndYear: type === "BC" ? "MMMM YYYY" : "MMMM BBBB",
  fullTime: "LT",
  fullDate: "ll",
});

export const getDatetimePickerFormats = (
  locale: string
): Record<string, string> => {
  if (locale === "th") {
    return dateTimePickerFormats("BE");
  }

  return dateTimePickerFormats("BC");
};

const DateAdapter = ({ locale }: { locale: string }): DateAdapterType => {
  dayjs.locale(locale);
  dayjs.tz.setDefault("Asia/Bangkok");
  console.log("LOCALE:" + locale);
  const adapter = new AdapterDayjs({
    locale,
    instance: dayjs,
    formats: getDatetimePickerFormats(locale),
  });

  return {
    ...adapter,
    getWeekdays: (): { charAt: () => string }[] => {
      const start = adapter.dayjs().startOf("week");
      return [0, 1, 2, 3, 4, 5, 6].map((diff) => ({
        charAt: () => adapter.formatByString(start.add(diff, "day"), "dd"),
      }));
    },
  };
};

export const CustomLocalizationProvider: FC = (props) => {
  // TODO: Add a selector to get the current language
  // TODO: Update "locale" prop in <LocalizationProvider/>
  return (
    <LocalizationProvider dateAdapter={DateAdapter as any} locale={"th"}>
      {props.children}
    </LocalizationProvider>
  );
};
