const fa = {
  header_text: "یادآور",
  settings_locale: "زبان برنامه",
  settings_theme: "پوسته برنامه",
  blue: "پوسته 1",
  green: "پوسته 2",
  red: "پوسته 3",
  confirm: "ذخیره",
  DIRECTION: "rtl",
  deleteTitle: "حذف",
  deleteMessage: "آیا مطمئن هستید؟",
  deleteYes: "بله",
  deleteNo: "خیر",
  inputPlaceHolder: "عنوان"
};
const en = {
  header_text: "To Do",
  settings_locale: "Language",
  settings_theme: "Theme",
  blue: "Theme 1",
  green: "Theme 2",
  red: "Theme 3",
  confirm: "Save",
  DIRECTION: "ltr",
  deleteTitle: "Delete",
  deleteMessage: "Are you Shore?",
  deleteYes: "Yes",
  deleteNo: "No",
  inputPlaceHolder: "Title"
};

const strings = locale => {
  switch (locale) {
    case "fa":
      return fa;

    case "en":
      return en;

    default:
      return fa;
  }
};

export { strings };
