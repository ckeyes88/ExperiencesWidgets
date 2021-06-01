export type LanguageCodes = "en-US" | "es" | "ger" | "swe" | "fr" | "nl" | "ja";
import { enUS, de, nl, es, sv, fr, ja } from "date-fns/locale";

// use it to get date-fns built-in locale for our LanguageCodes type
export const localeMap: { [key: string]: Locale } = {
  "en-US": enUS,
  es: es,
  ger: de,
  swe: sv,
  fr: fr,
  nl: nl,
  ja: ja,
};

export const languageCodeToLocaleCode: { [key: string]: string } = {
  "en-US": "en",
  es: "es",
  ger: "de",
  swe: "sv",
  fr: "fr",
  nl: "nl",
  ja: "ja",
};

/**
 * Month names; zero-indexed. Useful for grab Date month and converting to app dictionary
 * month property.
 */
export const monthNames = [
  "january",
  "february",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december",
];

type OrderLimitMessage = {
  composite: {
    mainMessage?: string;
    minMessage?: string;
    maxMessage?: string;
  };
  whole?: string;
};

const EMPTY_LIMIT_LABELS = {
  whole: "",
  composite: {},
};

export type AppDictionary = { [key: string]: any } & {
  /** CTA Labels */
  bookButtonLabel: string;
  reserveButtonLabel: string;
  selectDatesLabel: string;
  selectDatesAriaLabel: string;
  quantityLabel: string;
  quantityAriaLabel: string;
  totalLabel: string;
  confirmVariantsLabel: string;
  firstNameLabel: string;
  lastNameLabel: string;
  phoneNumberLabel: string;
  emailLabel: string;
  requiredWarningLabel: string;
  previousWeekAriaLabel: string;
  nextWeekAriaLabel: string;
  getSelectedDateAriaLabel(date: string): string;
  showSlotsRemainingLabel: boolean;
  getSlotsRemainingLabel(units: number): string;
  minQuantityLabel: string;
  maxQuantityLabel: string;
  getOrderLimitMessage(
    minLimit: number,
    maxLimit: number,
    maxQuantity: number,
    userSetLimits: {
      minLimit: number;
      maxLimit: number;
    },
  ): OrderLimitMessage;
  optionalFieldLabel: string;
  noUpcomingTimeSlotsLabel: string;
  bookingModalHeaderLabel: string;
  perAttendeeStepLabel: string;
  getPerAttendeeStepLabel(current: number, total: number): string;
  savedSpotLabel: string;
  sentConfirmationLabel: string;
  finalConfirmationLabel: string;
  emailReminderLabel: string;
  getEmailReminderDaysLabel(days: number): string;
  /** General dictionary */
  calendarHeader: string;
  singularUnitLabel: string;
  pluralUnitLabel: string;
  free: string;
  january: string;
  february: string;
  march: string;
  april: string;
  may: string;
  june: string;
  july: string;
  august: string;
  september: string;
  october: string;
  november: string;
  december: string;
  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
  saturday: string;
  sunday: string;
  selectDateLabel: string;
  previousLabel: string;
  nextLabel: string;
  confirmReservationButtonLabel: string;
  addLabel: string;
  nothingIsAvailableTodayLabel: string;
  goToNextAvailableLabel: string;
  goToNextAvailableMessage: string;
  month: string;
  list: string;
  today: string;
  whoopsLabel: string;
  spotsLeftLabel: string;
  soldOutLabel: string;
};

export type LanguageDictionaryType = {
  [key: string]: AppDictionary;
};

/**
 * The language dictionary defines the text content for various modifiable/language sensitive,
 * elements of our booking app.
 */
export const languageDictionary: LanguageDictionaryType = {
  "en-US": {
    soldOutLabel: "Sold Out",
    spotsLeftLabel: "spots left",
    whoopsLabel: "Whoops!",
    goToNextAvailableMessage: "No events to display",
    calendarHeader: "Events Calendar",
    selectDatesLabel: "Select Dates",
    selectDatesAriaLabel: "Select Dates, this will open the calendar dropdown.",
    quantityLabel: "How Many People",
    totalLabel: "Total",
    quantityAriaLabel:
      "How many people, this will open people quantity selelctor dropdown.",
    confirmVariantsLabel: "Confirm",
    bookButtonLabel: "Book",
    reserveButtonLabel: "Reserve",
    singularUnitLabel: "person",
    pluralUnitLabel: "people",
    free: "free",
    january: "January::Jan",
    february: "February::Feb",
    march: "March::Mar",
    april: "April::Apr",
    may: "May::May",
    june: "June::Jun",
    july: "July::Jul",
    august: "August::Aug",
    september: "September::Sept",
    october: "October::Oct",
    november: "November::Nov",
    december: "December::Dec",
    monday: "Monday::M",
    tuesday: "Tuesday::Tu",
    wednesday: "Wednesday::W",
    thursday: "Thursday::Th",
    friday: "Fri::F",
    saturday: "Saturday::Sa",
    sunday: "Sunday::Su",
    firstNameLabel: "First Name",
    lastNameLabel: "Last Name",
    phoneNumberLabel: "Phone Number",
    emailLabel: "Email",
    requiredWarningLabel: "marked fields are required",
    selectDateLabel: "Select",
    showSlotsRemainingLabel: true,
    getSlotsRemainingLabel(units: number) {
      if (!!this.slotsRemainingLabel && !!this.slotsRemainingLabel.trim()) {
        return `${units} ${this.slotsRemainingLabel}`;
      } else {
        return `${units} Left`;
      }
    },
    previousWeekAriaLabel: "Previous week",
    nextWeekAriaLabel: "Next week",
    getSelectedDateAriaLabel(date: string) {
      return `Selected date is ${date}`;
    },
    noUpcomingTimeSlotsLabel:
      "Sorry, there are no upcoming dates for this experience.",
    minQuantityLabel: "",
    maxQuantityLabel: "",
    getOrderLimitMessage(
      minLimit: number,
      maxLimit: number,
      maxQuantity: number,
      userSetLimits,
    ) {
      if (userSetLimits.minLimit || userSetLimits.maxLimit) {
        // checks for NaN, 0, and undefined
        if (
          (!!this.minQuantityLabel && !!this.minQuantityLabel.trim()) ||
          (!!this.maxQuantityLabel && !!this.maxQuantityLabel.trim())
        ) {
          // limits and custom labels are set (display the min/max limits with custom labels)
          return {
            whole: "",
            composite: {
              mainMessage: "Purchase quantity limits:",
              minMessage: this.minQuantityLabel
                ? this.minQuantityLabel.replace("{minLimit}", minLimit)
                : "",
              maxMessage: this.maxQuantityLabel
                ? this.maxQuantityLabel.replace("{maxLimit}", maxLimit)
                : "",
            },
          };
        } else {
          // limits are set but custom labels aren't (display the min/max limits with default limit labels)
          if (maxQuantity <= 0 || minLimit > maxQuantity) {
            return EMPTY_LIMIT_LABELS;
          } else {
            const minMsg =
              minLimit > 1 ? `Minimum purchase quantity of ${minLimit}` : "";
            let connector = "";
            if (!!minMsg && maxLimit >= maxQuantity) {
              connector = " required.";
            } else if (!!minMsg && maxLimit < maxQuantity) {
              connector = " with a ";
            }
            const maxMsg =
              maxLimit >= maxQuantity
                ? ""
                : `${
                    !!connector ? "m" : "M"
                  }aximum limit of ${maxLimit} per order.`;
            return {
              composite: {},
              whole: minMsg + connector + maxMsg,
            };
          }
        }
      } else {
        // limits aren't set (don't display anything in the min/max limits label no matter what)
        return {
          whole: "",
          composite: {},
        };
      }
    },
    optionalFieldLabel: "optional",
    bookingModalHeaderLabel: "Finalize your reservation",
    perAttendeeStepLabel: "",
    getPerAttendeeStepLabel(current: number, total: number) {
      return !!this.perAttendeeStepLabel && !!this.perAttendeeStepLabel.trim()
        ? this.perAttendeeStepLabel
            .replace("{current}", current)
            .replace("{total}", total)
        : `Ticket ${current} of ${total}`;
    },
    previousLabel: "Previous",
    nextLabel: "Next",
    addLabel: "Add",
    confirmReservationButtonLabel: "Confirm",
    savedSpotLabel: "We've saved you a spot!",
    sentConfirmationLabel: "A confirmation will be sent to",
    finalConfirmationLabel: "Close",
    emailReminderLabel: "",
    getEmailReminderDaysLabel(days: number) {
      const daysText = days > 1 ? `${days} days` : "one day";
      return !!this.emailReminderLabel && !!this.emailReminderLabel.trim()
        ? this.emailReminderLabel.replace("{days}", daysText)
        : `You will receive an email reminder ${daysText} before your scheduled time.`;
    },
    nothingIsAvailableTodayLabel: "Nothing is available today",
    goToNextAvailableLabel: "Go to next available",
    month: "Month",
    list: "List",
    today: "Today",
  },
  es: {
    soldOutLabel: "Sold Out",
    spotsLeftLabel: "spots left",
    whoopsLabel: "Whoops!",
    goToNextAvailableMessage: "No hay eventos para mostrar",
    calendarHeader: "Calendario de eventos",
    selectDatesLabel: "Seleccionar fechas",
    selectDatesAriaLabel: "Selecciona fechas, esto abrirá un calendario.",
    totalLabel: "Total",
    quantityLabel: "Cuántas personas",
    quantityAriaLabel:
      "¿Cuántas personas? Esto abrirá un selector de cantidad.",
    confirmVariantsLabel: "Confirmar",
    bookButtonLabel: "Reservar",
    reserveButtonLabel: "Reservar",
    singularUnitLabel: "persona",
    pluralUnitLabel: "personas",
    free: "gratis",
    january: "Enero::Enero",
    february: "Febrero::Feb",
    march: "Marzo::Marzo",
    april: "Abril::Abr",
    may: "Mayo::Mayo",
    june: "Junio::Jun",
    july: "Julio::Jul",
    august: "Agosto::Ago",
    september: "Septiembre::Sept",
    october: "Octubre::Oct",
    november: "Noviembre::Nov",
    december: "Diciembre::Dic",
    monday: "Lunes::L",
    tuesday: "Martes::Ma",
    wednesday: "Miércoles::Mi",
    thursday: "Jueves::J",
    friday: "Viernes::V",
    saturday: "Sábado::S",
    sunday: "Domingo::D",
    firstNameLabel: "Nombre",
    lastNameLabel: "Apellidos",
    phoneNumberLabel: "Teléfono de Contacto",
    emailLabel: "Correo Electrónico",
    requiredWarningLabel: "los campos marcados son obligatorios",
    selectDateLabel: "Seleccionar",
    showSlotsRemainingLabel: true,
    getSlotsRemainingLabel(units: number) {
      if (!!this.slotsRemainingLabel && !!this.slotsRemainingLabel.trim()) {
        return `${units} ${this.slotsRemainingLabel}`;
      } else {
        return units === 1 ? `${units} Libre` : `${units} Libres`;
      }
    },
    previousWeekAriaLabel: "Semana anterior",
    nextWeekAriaLabel: "Semana siguiente",
    getSelectedDateAriaLabel(date: string) {
      return `La fecha seleccionada es el ${date}`;
    },
    noUpcomingTimeSlotsLabel:
      "Lo sentimos, por el momento no hay fechas disponibles para esta experiencia.",
    minQuantityLabel: "",
    maxQuantityLabel: "",
    getOrderLimitMessage(
      minLimit: number,
      maxLimit: number,
      maxQuantity: number,
      userSetLimits,
    ) {
      if (userSetLimits.minLimit || userSetLimits.maxLimit) {
        // checks for NaN, 0, and undefined
        if (
          (!!this.minQuantityLabel && !!this.minQuantityLabel.trim()) ||
          (!!this.maxQuantityLabel && !!this.maxQuantityLabel.trim())
        ) {
          // limits and custom labels are set (display the min/max limits with custom labels)
          return {
            whole: "",
            composite: {
              mainMessage: "Límites de cantidad de compra:",
              minMessage: this.minQuantityLabel
                ? this.minQuantityLabel.replace("{minLimit}", minLimit)
                : "",
              maxMessage: this.maxQuantityLabel
                ? this.maxQuantityLabel.replace("{maxLimit}", maxLimit)
                : "",
            },
          };
        } else {
          // limits are set but custom labels aren't (display the min/max limits with default limit labels)
          if (maxQuantity <= 0 || minLimit > maxQuantity) {
            return EMPTY_LIMIT_LABELS;
          } else {
            const minMsg =
              minLimit > 1
                ? `Debes reservar para un mínimo de ${minLimit}`
                : "";
            let connector = "";
            if (!!minMsg && maxLimit < maxQuantity) {
              connector = " y para ";
            }
            const maxMsg =
              maxLimit >= maxQuantity
                ? ""
                : `${
                    minMsg
                      ? !!connector
                        ? "un m"
                        : "Un m"
                      : !!connector
                      ? "m"
                      : "M"
                  }áximo de ${maxLimit} por reserva.`;
            return {
              composite: {},
              whole: minMsg + connector + maxMsg,
            };
          }
        }
      } else {
        // limits aren't set (don't display anything in the min/max limits label no matter what)
        return {
          whole: "",
          composite: {},
        };
      }
    },
    optionalFieldLabel: "opcional",
    bookingModalHeaderLabel: "Termina tu reserva",
    perAttendeeStepLabel: "",
    getPerAttendeeStepLabel(current: number, total: number) {
      return !!this.perAttendeeStepLabel && !!this.perAttendeeStepLabel.trim()
        ? this.perAttendeeStepLabel
            .replace("{current}", current)
            .replace("{total}", total)
        : `Ticket ${current} of ${total}`;
    },
    previousLabel: "Anterior",
    nextLabel: "Siguiente",
    addLabel: "Añadir",
    confirmReservationButtonLabel: "Confirmar",
    savedSpotLabel: "¡Te hemos guardado una plaza!",
    sentConfirmationLabel: "Te mandaremos un email de confirmación a",
    finalConfirmationLabel: "Cerca",
    emailReminderLabel: "",
    getEmailReminderDaysLabel(days: number) {
      const daysText = days > 1 ? `${days} días` : "un día";
      return !!this.emailReminderLabel && !!this.emailReminderLabel.trim()
        ? this.emailReminderLabel.replace("{days}", daysText)
        : `You will receive an email reminder ${daysText} before your scheduled time.`;
    },
    nothingIsAvailableTodayLabel: "Hoy no hay nada disponible",
    goToNextAvailableLabel: "Ir al siguiente disponible",
    month: "Mes",
    list: "Lista",
    today: "Hoy dia",
  },
  ja: {
    soldOutLabel: "Sold Out",
    spotsLeftLabel: "spots left",
    whoopsLabel: "Whoops!",
    goToNextAvailableMessage: "表示するイベントはありません",
    calendarHeader: "イベントカレンダー",
    selectDatesLabel: "希望日時を選択",
    selectDatesAriaLabel: "日時を選択（カレンダーのウィンドウが開きます）",
    totalLabel: "合計",
    quantityLabel: "利用人数",
    quantityAriaLabel: "利用人数（人数のドロップダウンが開きます）",
    confirmVariantsLabel: "決定",
    bookButtonLabel: "予約する",
    reserveButtonLabel: "予約",
    singularUnitLabel: "名",
    pluralUnitLabel: "名",
    free: "無料",
    january: "1月",
    february: "2月",
    march: "3月",
    april: "4月",
    may: "5月",
    june: "6月",
    july: "7月",
    august: "8月",
    september: "9月",
    october: "10月",
    november: "11月",
    december: "12月",
    monday: "月曜日::（月）",
    tuesday: "火曜日::（火）",
    wednesday: "水曜日::（水）",
    thursday: "木曜日::（木）",
    friday: "金曜日::（金）",
    saturday: "土曜日::（土）",
    sunday: "日曜日::（日）",
    firstNameLabel: "氏名（名）",
    lastNameLabel: "氏名（性）",
    phoneNumberLabel: "電話番号",
    emailLabel: "メールアドレス",
    requiredWarningLabel: "必須項目です",
    selectDateLabel: "選択",
    showSlotsRemainingLabel: true,
    getSlotsRemainingLabel(units: number) {
      if (!!this.slotsRemainingLabel && !!this.slotsRemainingLabel.trim()) {
        return `${units} ${this.slotsRemainingLabel}`;
      } else {
        return units === 1
          ? `${units} 名分の空き枠があります`
          : `${units} 名分の空き枠があります`;
      }
    },
    previousWeekAriaLabel: "前週",
    nextWeekAriaLabel: "翌週",
    getSelectedDateAriaLabel(date: string) {
      return `現在の予約日時は ${date} です。`;
    },
    noUpcomingTimeSlotsLabel:
      "申し訳ございません、お選びいただいた内容での空きはございません。",
    minQuantityLabel: "",
    maxQuantityLabel: "",
    getOrderLimitMessage(
      minLimit: number,
      maxLimit: number,
      maxQuantity: number,
      userSetLimits,
    ) {
      if (userSetLimits.minLimit || userSetLimits.maxLimit) {
        // checks for NaN, 0, and undefined
        if (
          (!!this.minQuantityLabel && !!this.minQuantityLabel.trim()) ||
          (!!this.maxQuantityLabel && !!this.maxQuantityLabel.trim())
        ) {
          // limits and custom labels are set (display the min/max limits with custom labels)
          return {
            whole: "",
            composite: {
              mainMessage: "",
              minMessage: this.minQuantityLabel
                ? this.minQuantityLabel.replace("{minLimit}", minLimit)
                : "",
              maxMessage: this.maxQuantityLabel
                ? this.maxQuantityLabel.replace("{maxLimit}", maxLimit)
                : "",
            },
          };
        } else {
          // limits are set but custom labels aren't (display the min/max limits with default limit labels)
          if (maxQuantity <= 0 || minLimit > maxQuantity) {
            return EMPTY_LIMIT_LABELS;
          } else {
            const minMsg = minLimit > 1 ? `最小注文個数が ${minLimit}` : "";
            let connector = "";
            if (!!minMsg && maxLimit < maxQuantity) {
              connector = " ";
            }
            const maxMsg =
              maxLimit >= maxQuantity
                ? ""
                : `１度の予約につき ${maxLimit} 個が上限です。`;
            return {
              composite: {},
              whole: minMsg + connector + maxMsg,
            };
          }
        }
      } else {
        // limits aren't set (don't display anything in the min/max limits label no matter what)
        return {
          whole: "",
          composite: {},
        };
      }
    },
    optionalFieldLabel: "",
    bookingModalHeaderLabel: "下記の内容で予約を確定します",
    perAttendeeStepLabel: "",
    getPerAttendeeStepLabel(current: number, total: number) {
      return !!this.perAttendeeStepLabel && !!this.perAttendeeStepLabel.trim()
        ? this.perAttendeeStepLabel
            .replace("{current}", current)
            .replace("{total}", total)
        : `Ticket ${current} of ${total}`;
    },
    previousLabel: "前へ",
    nextLabel: "次へ",
    addLabel: "追加",
    confirmReservationButtonLabel: "確認画面に進む",
    savedSpotLabel: "利用人数分を確保できました！",
    sentConfirmationLabel:
      "確認メールが指定されたメールアドレスに送信されます。",
    finalConfirmationLabel: "閉じる",
    emailReminderLabel: "",
    getEmailReminderDaysLabel(days: number) {
      const daysText = days > 1 ? `${days} 日` : "日";
      return !!this.emailReminderLabel && !!this.emailReminderLabel.trim()
        ? this.emailReminderLabel.replace("{days}", daysText)
        : `${daysText} リマインドの通知が指定されたメールアドレスに自動的に配信されます。`;
    },
    nothingIsAvailableTodayLabel: "今日は何も利用できません",
    goToNextAvailableLabel: "次に利用可能なものに移動します",
    month: "月",
    list: "リスト",
    today: "今日",
  },
  ger: {
    soldOutLabel: "Sold Out",
    spotsLeftLabel: "spots left",
    whoopsLabel: "Whoops!",
    goToNextAvailableMessage: "Keine Ereignisse zum Anzeigen",
    calendarHeader: "Veranstaltungskalender",
    selectDatesLabel: "Bitte Datum wählen",
    selectDatesAriaLabel:
      "Wähle das Datum aus. Dadurch wird die Dropdown-Liste für den Kalender geöffnet.",
    totalLabel: "Gesamt",
    quantityLabel: "Wie viele Personen?",
    quantityAriaLabel:
      "Wie viele Personen? Dadurch wird die Dropdown-Liste für die Anzahl der Personen geöffnet.",
    confirmVariantsLabel: "Bestätigen",
    bookButtonLabel: "Buchen",
    reserveButtonLabel: "Reservieren",
    singularUnitLabel: "person",
    pluralUnitLabel: "leute",
    free: "kostenfrei",
    january: "Januar::Jan",
    february: "Februar::Feb",
    march: "März::März",
    april: "April::Apr",
    may: "Mai::Mai",
    june: "Juni::Juni",
    july: "Juli::Juli",
    august: "August::Aug",
    september: "September::Sept",
    october: "Oktober::Okt",
    november: "November::Nov",
    december: "Dezember::Dez",
    monday: "Montag::Mo",
    tuesday: "Dienstag::Di",
    wednesday: "Mittwoch::Mi",
    thursday: "Donnerstag::Do",
    friday: "Freitag::Fr",
    saturday: "Sonnabend::Sa",
    sunday: "Sonntag::So",
    firstNameLabel: "Vorname",
    lastNameLabel: "Nachname",
    phoneNumberLabel: "Telefonnummer",
    emailLabel: "E-Mail",
    requiredWarningLabel: "die markierten Felder sind erforderlich.",
    selectDateLabel: "Auswählen",
    showSlotsRemainingLabel: true,
    getSlotsRemainingLabel(units: number) {
      if (!!this.slotsRemainingLabel && !!this.slotsRemainingLabel.trim()) {
        return `${units} ${this.slotsRemainingLabel}`;
      } else {
        return units === 1 ? `${units} übrig` : `${units} Verbleibende`;
      }
    },
    previousWeekAriaLabel: "Vorherige Woche",
    nextWeekAriaLabel: "Nächste Woche",
    getSelectedDateAriaLabel(date: string) {
      return `Das ausgewählte Datum ist ${date}`;
    },
    noUpcomingTimeSlotsLabel:
      "Entschuldigung, aktuell sind keine zukünftigen Daten für diese Veranstaltung verfügbar.",
    minQuantityLabel: "",
    maxQuantityLabel: "",
    getOrderLimitMessage(
      minLimit: number,
      maxLimit: number,
      maxQuantity: number,
      userSetLimits,
    ) {
      if (userSetLimits.minLimit || userSetLimits.maxLimit) {
        // checks for NaN, 0, and undefined
        if (
          (!!this.minQuantityLabel && !!this.minQuantityLabel.trim()) ||
          (!!this.maxQuantityLabel && !!this.maxQuantityLabel.trim())
        ) {
          // limits and custom labels are set (display the min/max limits with custom labels)
          return {
            whole: "",
            composite: {
              mainMessage: "Kaufmengenlimits:",
              minMessage: this.minQuantityLabel
                ? this.minQuantityLabel.replace("{minLimit}", minLimit)
                : "",
              maxMessage: this.maxQuantityLabel
                ? this.maxQuantityLabel.replace("{maxLimit}", maxLimit)
                : "",
            },
          };
        } else {
          // limits are set but custom labels aren't (display the min/max limits with default limit labels)
          if (maxQuantity <= 0 || minLimit > maxQuantity) {
            return EMPTY_LIMIT_LABELS;
          } else {
            const minMsg =
              minLimit > 1 ? `Minimale Anzahl von ${minLimit}` : "";
            let connector = "";
            if (!!minMsg && maxLimit >= maxQuantity) {
              connector = " benötigt.";
            } else if (!!minMsg && maxLimit < maxQuantity) {
              connector = " mit einem ";
            }
            const maxMsg =
              maxLimit >= maxQuantity
                ? ""
                : `${
                    !!connector ? "m" : "M"
                  }aximale Anzahl von ${maxLimit} pro Bestellung.`;
            return {
              composite: {},
              whole: minMsg + connector + maxMsg,
            };
          }
        }
      } else {
        // limits aren't set (don't display anything in the min/max limits label no matter what)
        return {
          whole: "",
          composite: {},
        };
      }
    },
    optionalFieldLabel: "optional",
    bookingModalHeaderLabel: "Schließen Sie Ihre Reservierung ab.",
    perAttendeeStepLabel: "",
    getPerAttendeeStepLabel(current: number, total: number) {
      return !!this.perAttendeeStepLabel && !!this.perAttendeeStepLabel.trim()
        ? this.perAttendeeStepLabel
            .replace("{current}", current)
            .replace("{total}", total)
        : `Ticket ${current} of ${total}`;
    },
    previousLabel: "Vorheriges",
    nextLabel: "Nächstes",
    addLabel: "Hinzufügen",
    confirmReservationButtonLabel: "Bestätigen",
    savedSpotLabel: "Wir haben Dir einen Platz gesichert!",
    sentConfirmationLabel: "Eine Bestätigung wird gesendet an",
    finalConfirmationLabel: "Schließen",
    emailReminderLabel: "",
    getEmailReminderDaysLabel(days: number) {
      const daysText = days > 1 ? `${days} tage` : "1 tag";
      return !!this.emailReminderLabel && !!this.emailReminderLabel.trim()
        ? this.emailReminderLabel.replace("{days}", daysText)
        : `Du wirst ${daysText} vor der gebuchten Zeit eine Erinnerung per E-Mail erhalten.`;
    },
    nothingIsAvailableTodayLabel: "Heute ist nichts verfügbar",
    goToNextAvailableLabel: "Zum nächsten verfügbaren gehen",
    month: "Monat",
    list: "Liste",
    today: "Heute",
  },
  swe: {
    soldOutLabel: "Sold Out",
    spotsLeftLabel: "spots left",
    whoopsLabel: "Whoops!",
    goToNextAvailableMessage: "Inga händelser att visa",
    calendarHeader: "Evenemangskalender",
    selectDatesLabel: "Välj Datum",
    selectDatesAriaLabel: "Välj Datum, detta öppnar kalendervyn.",
    totalLabel: "Total",
    quantityLabel: "Hur Många Personer",
    quantityAriaLabel:
      "Hur många personer, detta öppnar antal-personer-väljaren.",
    confirmVariantsLabel: "Bekräfta",
    bookButtonLabel: "Boka",
    reserveButtonLabel: "Reservera",
    singularUnitLabel: "person",
    pluralUnitLabel: "personer",
    free: "gratis",
    january: "Januari::Jan",
    february: "Februari::Feb",
    march: "Mars::Mar",
    april: "April::Apr",
    may: "Maj::Maj",
    june: "Juni::Jun",
    july: "Juli::Jul",
    august: "Augusti::Aug",
    september: "September::Sep",
    october: "Oktober::Okt",
    november: "November::Nov",
    december: "December::Dec",
    monday: "Måndag::Må",
    tuesday: "Tisdag::Ti",
    wednesday: "Onsdag::On",
    thursday: "Torsdag::To",
    friday: "Fredag::Fr",
    saturday: "Lördag::Lö",
    sunday: "Söndag::Sö",
    firstNameLabel: "Förnamn",
    lastNameLabel: "Efternamn",
    phoneNumberLabel: "Telefonnummer",
    emailLabel: "Email",
    requiredWarningLabel: "markerade fält är obligatoriska",
    selectDateLabel: "Välj",
    showSlotsRemainingLabel: true,
    getSlotsRemainingLabel(units: number) {
      if (!!this.slotsRemainingLabel && !!this.slotsRemainingLabel.trim()) {
        return `${units} ${this.slotsRemainingLabel}`;
      } else {
        return `${units} kvar`;
      }
    },
    previousWeekAriaLabel: "Förra veckan",
    nextWeekAriaLabel: "Nästa vecka",
    getSelectedDateAriaLabel(date: string) {
      return `Valt datum är ${date}`;
    },
    noUpcomingTimeSlotsLabel:
      "Ledsen, För tillfället finns inga tillgängliga framtida datum för denna upplevelse.",
    minQuantityLabel: "",
    maxQuantityLabel: "",
    getOrderLimitMessage(
      minLimit: number,
      maxLimit: number,
      maxQuantity: number,
      userSetLimits,
    ) {
      if (userSetLimits.minLimit || userSetLimits.maxLimit) {
        // checks for NaN, 0, and undefined
        if (
          (!!this.minQuantityLabel && !!this.minQuantityLabel.trim()) ||
          (!!this.maxQuantityLabel && !!this.maxQuantityLabel.trim())
        ) {
          // limits and custom labels are set (display the min/max limits with custom labels)
          return {
            whole: "",
            composite: {
              mainMessage: "Gränser för köpkvantitet:",
              minMessage: this.minQuantityLabel
                ? this.minQuantityLabel.replace("{minLimit}", minLimit)
                : "",
              maxMessage: this.maxQuantityLabel
                ? this.maxQuantityLabel.replace("{maxLimit}", maxLimit)
                : "",
            },
          };
        } else {
          // limits are set but custom labels aren't (display the min/max limits with default limit labels)
          if (maxQuantity <= 0 || minLimit > maxQuantity) {
            return EMPTY_LIMIT_LABELS;
          } else {
            const minMsg = minLimit > 1 ? `Minsta köpantal är ${minLimit}` : "";
            let connector = "";
            if (!!minMsg && maxLimit >= maxQuantity) {
              connector = " obligatorisk.";
            } else if (!!minMsg && maxLimit < maxQuantity) {
              connector = " med en ";
            }
            const maxMsg =
              maxLimit >= maxQuantity
                ? ""
                : `${
                    !!connector ? "m" : "M"
                  }aximalt antal är  ${maxLimit} per order.`;
            return {
              composite: {},
              whole: minMsg + connector + maxMsg,
            };
          }
        }
      } else {
        // limits aren't set (don't display anything in the min/max limits label no matter what)
        return {
          whole: "",
          composite: {},
        };
      }
    },
    optionalFieldLabel: "frivillig",
    bookingModalHeaderLabel: "Färdigställ din reservation",
    perAttendeeStepLabel: "",
    getPerAttendeeStepLabel(current: number, total: number) {
      return !!this.perAttendeeStepLabel && !!this.perAttendeeStepLabel.trim()
        ? this.perAttendeeStepLabel
            .replace("{current}", current)
            .replace("{total}", total)
        : `Ticket ${current} of ${total}`;
    },
    previousLabel: "Föregående",
    nextLabel: "Nästa",
    addLabel: "Lägg till",
    confirmReservationButtonLabel: "Bekräfta",
    savedSpotLabel: "Vi har sparat en plats åt dig!",
    sentConfirmationLabel: "En bekräftelse skickas till",
    finalConfirmationLabel: "Stänga",
    emailReminderLabel: "",
    getEmailReminderDaysLabel(days: number) {
      const daysText = days > 1 ? `${days} dagar` : "en dag";
      return !!this.emailReminderLabel && !!this.emailReminderLabel.trim()
        ? this.emailReminderLabel.replace("{days}", daysText)
        : `Du kommer att få en påminnelse via email ${daysText} innan din bokade tid.`;
    },
    nothingIsAvailableTodayLabel: "Ingenting är tillgängligt idag",
    goToNextAvailableLabel: "Gå till nästa tillgängliga",
    month: "Månad",
    list: "Lista",
    today: "I dag",
  },
  fr: {
    soldOutLabel: "Sold Out",
    spotsLeftLabel: "spots left",
    whoopsLabel: "Whoops!",
    goToNextAvailableMessage: "Aucun événement à afficher",
    calendarHeader: "Calendrier des événements",
    selectDatesLabel: "Sélectionnez vos dates",
    selectDatesAriaLabel:
      "Sélectionnez vos dates, cela ouvrira la fenêtre déroulante avec le calendrier",
    totalLabel: "Total",
    quantityLabel: "Nombre de participants",
    quantityAriaLabel:
      "How many people, this will open people quantity selelctor dropdown.",
    confirmVariantsLabel: "Confirmer",
    bookButtonLabel: "Réserver",
    reserveButtonLabel: "Réserver",
    singularUnitLabel: "personne",
    pluralUnitLabel: "personne",
    free: "gratuit",
    january: "Janvier::Janv",
    february: "Février::Févr",
    march: "Mars::Mars",
    april: "Avril::Avr",
    may: "Mai::Mai",
    june: "Juin::Juin",
    july: "Juillet::Juil",
    august: "Août::Août",
    september: "Septembre::Sept",
    october: "Octobre::Oct",
    november: "Novembre::Nov",
    december: "Décembre::Déc",
    monday: "Lundi::Lun",
    tuesday: "Mardi::Mar",
    wednesday: "Mercredi::Mer",
    thursday: "Jeudi::Jeu",
    friday: "Vendredi::Ven",
    saturday: "Samedi::Sam",
    sunday: "Dimanche::Dim",
    firstNameLabel: "Prénom",
    lastNameLabel: "Nom",
    phoneNumberLabel: "Numéro de téléphone",
    emailLabel: "Email",
    requiredWarningLabel: "Les champs marqués sont requis",
    selectDateLabel: "Sélectionner",
    showSlotsRemainingLabel: true,
    getSlotsRemainingLabel(units: number) {
      if (!!this.slotsRemainingLabel && !!this.slotsRemainingLabel.trim()) {
        return `${units} ${this.slotsRemainingLabel}`;
      } else {
        return units === 1 ? `${units} restant` : `${units} restants`;
      }
    },
    previousWeekAriaLabel: "Semaine précedente",
    nextWeekAriaLabel: "Semaine prochaine",
    getSelectedDateAriaLabel(date: string) {
      return `La date sélectionnée est ${date}`;
    },
    noUpcomingTimeSlotsLabel:
      "Désolé, il n'y a pas de futures dates pour cette expérience en ce moment.",
    minQuantityLabel: "",
    maxQuantityLabel: "",
    getOrderLimitMessage(
      minLimit: number,
      maxLimit: number,
      maxQuantity: number,
      userSetLimits,
    ) {
      if (userSetLimits.minLimit || userSetLimits.maxLimit) {
        // checks for NaN, 0, and undefined
        if (
          (!!this.minQuantityLabel && !!this.minQuantityLabel.trim()) ||
          (!!this.maxQuantityLabel && !!this.maxQuantityLabel.trim())
        ) {
          // limits and custom labels are set (display the min/max limits with custom labels)
          return {
            whole: "",
            composite: {
              mainMessage: "Limites de quantité d'achat:",
              minMessage: this.minQuantityLabel
                ? this.minQuantityLabel.replace("{minLimit}", minLimit)
                : "",
              maxMessage: this.maxQuantityLabel
                ? this.maxQuantityLabel.replace("{maxLimit}", maxLimit)
                : "",
            },
          };
        } else {
          // limits are set but custom labels aren't (display the min/max limits with default limit labels)
          if (maxQuantity <= 0 || minLimit > maxQuantity) {
            return EMPTY_LIMIT_LABELS;
          } else {
            const minMsg =
              minLimit > 1 ? `Quantité minimum d'achat de ${minLimit}` : "";
            let connector = "";
            if (!!minMsg && maxLimit >= maxQuantity) {
              connector = " requis.";
            } else if (!!minMsg && maxLimit < maxQuantity) {
              connector = " avec un ";
            }
            const maxMsg =
              maxLimit >= maxQuantity
                ? ""
                : `${
                    !!connector ? "m" : "M"
                  }aximum de ${maxLimit} par commande.`;
            return {
              composite: {},
              whole: minMsg + connector + maxMsg,
            };
          }
        }
      } else {
        // limits aren't set (don't display anything in the min/max limits label no matter what)
        return {
          whole: "",
          composite: {},
        };
      }
    },
    optionalFieldLabel: "facultatif",
    bookingModalHeaderLabel: "Finalisez votre réservation",
    perAttendeeStepLabel: "",
    getPerAttendeeStepLabel(current: number, total: number) {
      return !!this.perAttendeeStepLabel && !!this.perAttendeeStepLabel.trim()
        ? this.perAttendeeStepLabel
            .replace("{current}", current)
            .replace("{total}", total)
        : `Ticket ${current} of ${total}`;
    },
    previousLabel: "Précédent",
    nextLabel: "Suivant",
    addLabel: "Ajouter",
    confirmReservationButtonLabel: "Confirmer",
    savedSpotLabel: "Nous vous avons gardé une place!",
    sentConfirmationLabel: "Une confirmation sera envoyée à",
    finalConfirmationLabel: "Fermer",
    emailReminderLabel: "",
    getEmailReminderDaysLabel(days: number) {
      const daysText = days > 1 ? `${days} jours` : "un jour";
      return !!this.emailReminderLabel && !!this.emailReminderLabel.trim()
        ? this.emailReminderLabel.replace("{days}", daysText)
        : `Vous allez recevoir un email de rappel ${daysText} avant la date réservée.`;
    },
    nothingIsAvailableTodayLabel: "Rien n'est disponible aujourd'hui",
    goToNextAvailableLabel: "Aller au prochain disponible",
    month: "Mois",
    list: "Lister",
    today: "Aujourd'hui",
  },
  nl: {
    soldOutLabel: "Sold Out",
    spotsLeftLabel: "spots left",
    whoopsLabel: "Whoops!",
    goToNextAvailableMessage: "Geen evenementen om weer te geven",
    calendarHeader: "Evenementen kalender",
    selectDatesLabel: "Selecteer datum",
    selectDatesAriaLabel: "Selecteer datum, dit opent kalender.",
    totalLabel: "Totaal",
    quantityLabel: "Aantal personen",
    quantityAriaLabel:
      "Hoeveel mensen, dit opent lijst om aantal te selecteeren.",
    confirmVariantsLabel: "Bevestigen",
    bookButtonLabel: "Boeken",
    reserveButtonLabel: "Reserveren",
    singularUnitLabel: "persoon",
    pluralUnitLabel: "personen",
    free: "gratis",
    january: "januari::jan",
    february: "februari::feb",
    march: "maart::maart",
    april: "april::apr",
    may: "mei::mei",
    june: "Juni::juni",
    july: "juli::juli",
    august: "augustus::aug",
    september: "september::sept",
    october: "oktober::Okt",
    november: "november::nov",
    december: "december::dec",
    monday: "maandag::m",
    tuesday: "dinsdag::di",
    wednesday: "woensdag::w",
    thursday: "donderdag::do",
    friday: "vrijdag::v",
    saturday: "zaterdag::za",
    sunday: "zondag::zo",
    firstNameLabel: "Voornaam",
    lastNameLabel: "Achternaam",
    phoneNumberLabel: "Telefoon nummer",
    emailLabel: "Email",
    requiredWarningLabel: "Gemarkeerde velden zijn vereist",
    selectDateLabel: "Selecteer",
    showSlotsRemainingLabel: true,
    getSlotsRemainingLabel(units: number) {
      if (!!this.slotsRemainingLabel && !!this.slotsRemainingLabel.trim()) {
        return `${units} ${this.slotsRemainingLabel}`;
      } else {
        return `${units} beschikbaar`;
      }
    },
    previousWeekAriaLabel: "Vorige week",
    nextWeekAriaLabel: "Volgende week",
    getSelectedDateAriaLabel(date: string) {
      return `Geselecteerde datum is ${date}`;
    },
    noUpcomingTimeSlotsLabel:
      "Sorry, er zijn geen datums voor dit evenement in de toekomst.",
    minQuantityLabel: "",
    maxQuantityLabel: "",
    getOrderLimitMessage(
      minLimit: number,
      maxLimit: number,
      maxQuantity: number,
      userSetLimits,
    ) {
      if (userSetLimits.minLimit || userSetLimits.maxLimit) {
        // checks for NaN, 0, and undefined
        if (
          (!!this.minQuantityLabel && !!this.minQuantityLabel.trim()) ||
          (!!this.maxQuantityLabel && !!this.maxQuantityLabel.trim())
        ) {
          // limits and custom labels are set (display the min/max limits with custom labels)
          return {
            whole: "",
            composite: {
              mainMessage: "Limieten voor aankoophoeveelheden:",
              minMessage: this.minQuantityLabel
                ? this.minQuantityLabel.replace("{minLimit}", minLimit)
                : "",
              maxMessage: this.maxQuantityLabel
                ? this.maxQuantityLabel.replace("{maxLimit}", maxLimit)
                : "",
            },
          };
        } else {
          // limits are set but custom labels aren't (display the min/max limits with default limit labels)
          if (maxQuantity <= 0 || minLimit > maxQuantity) {
            return EMPTY_LIMIT_LABELS;
          } else {
            const minMsg =
              minLimit > 1 ? `Minimum aankoop aantal is ${minLimit}` : "";
            let connector = "";
            if (!!minMsg && maxLimit >= maxQuantity) {
              connector = " vereist.";
            } else if (!!minMsg && maxLimit < maxQuantity) {
              connector = " met een ";
            }
            const maxMsg =
              maxLimit >= maxQuantity
                ? ""
                : `${
                    !!connector ? "m" : "M"
                  }aximum van ${maxLimit} per aankoop.`;
            return {
              composite: {},
              whole: minMsg + connector + maxMsg,
            };
          }
        }
      } else {
        // limits aren't set (don't display anything in the min/max limits label no matter what)
        return {
          whole: "",
          composite: {},
        };
      }
    },
    optionalFieldLabel: "valgfri",
    bookingModalHeaderLabel: "Reservering afronden",
    perAttendeeStepLabel: "",
    getPerAttendeeStepLabel(current: number, total: number) {
      return !!this.perAttendeeStepLabel && !!this.perAttendeeStepLabel.trim()
        ? this.perAttendeeStepLabel
            .replace("{current}", current)
            .replace("{total}", total)
        : `Ticket ${current} of ${total}`;
    },
    previousLabel: "Vorige",
    nextLabel: "Volgende",
    addLabel: "Toevoegen",
    confirmReservationButtonLabel: "Bevestigen",
    savedSpotLabel: "We hebben een plaats voor je gereserveerd!",
    sentConfirmationLabel: "Een confirmatie zal verstuurd worden",
    finalConfirmationLabel: "Dichtbij",
    emailReminderLabel: "",
    getEmailReminderDaysLabel(days: number) {
      const daysText = days > 1 ? `${days} dagen` : "dag";
      return !!this.emailReminderLabel && !!this.emailReminderLabel.trim()
        ? this.emailReminderLabel.replace("{days}", daysText)
        : `Je zult een bevestigings email ontvangen ${daysText} voor het geboekte tijdslot.`;
    },
    nothingIsAvailableTodayLabel: "Er is vandaag niets beschikbaar",
    goToNextAvailableLabel: "Ga naar de volgende beschikbare",
    month: "Maand",
    list: "Lijst",
    today: "Vandaag",
  },
  it: {
    soldOutLabel: "Sold Out",
    spotsLeftLabel: "spots left",
    whoopsLabel: "Whoops!",
    goToNextAvailableMessage: "Nessun evento da visualizzare",
    calendarHeader: "Calendario eventi",
    selectDatesLabel: "Scegli le date",
    selectDatesAriaLabel:
      "Scegli le date, questo aprirà il menù a tendina del calendario",
    quantityLabel: "Quanti partecipanti",
    totalLabel: "Totale",
    quantityAriaLabel:
      "Quante persone, questo aprirà il menù a tendina per inserire i partecipanti",
    confirmVariantsLabel: "Conferma",
    bookButtonLabel: "Prenota",
    reserveButtonLabel: "Prenota",
    singularUnitLabel: "persona",
    pluralUnitLabel: "persone",
    free: "gratis",
    january: "Gennaio::genn.",
    february: "Febbraio::febbr.",
    march: "Marzo::mar.",
    april: "Aprile::apr.",
    may: "Maggio::magg.",
    june: "Giugno::giugno",
    july: "Luglio::luglio",
    august: "Agosto::ag.",
    september: "Settembre::sett.",
    october: "Ottobre::ott.",
    november: "Novembre::nov.",
    december: "Dicembre::dic.",
    monday: "Lunedì::Lu",
    tuesday: "Martedì::Ma",
    wednesday: "Mercoledì::Me",
    thursday: "Giovedì::Gi",
    friday: "Venerdì::Ve",
    saturday: "Sabato::Sa",
    sunday: "Domenica::Do",
    firstNameLabel: "Nome",
    lastNameLabel: "Cognome",
    phoneNumberLabel: "Telefono",
    emailLabel: "E-mail",
    requiredWarningLabel: "I campi evidenziati sono obbligatori",
    selectDateLabel: "Scegli",
    showSlotsRemainingLabel: true,
    getSlotsRemainingLabel(units: number) {
      if (!!this.slotsRemainingLabel && !!this.slotsRemainingLabel.trim()) {
        return `${units} ${this.slotsRemainingLabel}`;
      } else {
        return `${units} Rimanenti`;
      }
    },
    previousWeekAriaLabel: "Settimana precedente",
    nextWeekAriaLabel: "Settimana successiva",
    getSelectedDateAriaLabel(date: string) {
      return `La data scelta è ${date}`;
    },
    noUpcomingTimeSlotsLabel:
      "Ci dispiace, ma al momento non sono disponibili date per questa esperienza",
    minQuantityLabel: "",
    maxQuantityLabel: "",
    getOrderLimitMessage(
      minLimit: number,
      maxLimit: number,
      maxQuantity: number,
      userSetLimits,
    ) {
      if (userSetLimits.minLimit || userSetLimits.maxLimit) {
        // checks for NaN, 0, and undefined
        if (
          (!!this.minQuantityLabel && !!this.minQuantityLabel.trim()) ||
          (!!this.maxQuantityLabel && !!this.maxQuantityLabel.trim())
        ) {
          // limits and custom labels are set (display the min/max limits with custom labels)
          return {
            whole: "",
            composite: {
              mainMessage: "Limiti di quantità di acquisto:",
              minMessage: this.minQuantityLabel
                ? this.minQuantityLabel.replace("{minLimit}", minLimit)
                : "",
              maxMessage: this.maxQuantityLabel
                ? this.maxQuantityLabel.replace("{maxLimit}", maxLimit)
                : "",
            },
          };
        } else {
          // limits are set but custom labels aren't (display the min/max limits with default limit labels)
          if (maxQuantity <= 0 || minLimit > maxQuantity) {
            return EMPTY_LIMIT_LABELS;
          } else {
            const minMsg =
              minLimit > 1 ? `Quantità minima di acquisto di ${minLimit}` : "";
            let connector = "";
            if (!!minMsg && maxLimit >= maxQuantity) {
              connector = " obbligatorio.";
            } else if (!!minMsg && maxLimit < maxQuantity) {
              connector = " con ";
            }
            const maxMsg =
              maxLimit >= maxQuantity
                ? ""
                : `${
                    !!connector ? "l" : "L"
                  }imite massimo di ${maxLimit} per ordine.`;
            return {
              composite: {},
              whole: minMsg + connector + maxMsg,
            };
          }
        }
      } else {
        // limits aren't set (don't display anything in the min/max limits label no matter what)
        return {
          whole: "",
          composite: {},
        };
      }
    },
    optionalFieldLabel: "(opzionale)",
    bookingModalHeaderLabel: "Concludi la tua prenotazione",
    perAttendeeStepLabel: "",
    getPerAttendeeStepLabel(current: number, total: number) {
      return !!this.perAttendeeStepLabel && !!this.perAttendeeStepLabel.trim()
        ? this.perAttendeeStepLabel
            .replace("{current}", current)
            .replace("{total}", total)
        : `Biglietto ${current} di ${total}`;
    },
    previousLabel: "Precedente",
    nextLabel: "Prossimo",
    addLabel: "Aggiungere",
    confirmReservationButtonLabel: "Conferma",
    savedSpotLabel: "Ti abbiamo riservato un posto",
    sentConfirmationLabel: "Una conferma verrà inviata a",
    finalConfirmationLabel: "Vicino",
    emailReminderLabel: "",
    getEmailReminderDaysLabel(days: number) {
      const daysText = days > 1 ? `${days} giorni` : "giorno";
      return !!this.emailReminderLabel && !!this.emailReminderLabel.trim()
        ? this.emailReminderLabel.replace("{days}", daysText)
        : `Riceverai una mail di promemoria ${daysText} prima dell'orario previsto.`;
    },
    nothingIsAvailableTodayLabel: "Niente è disponibile oggi",
    goToNextAvailableLabel: "Vai al prossimo disponibile",
    month: "Mese",
    list: "Elenco",
    today: "Oggi",
  },
};

/**
 * Receive a language code and spit out a corresponding app labels object, which can be
 */
export function defineLanguageDictionary(
  languageCode: LanguageCodes,
): AppDictionary {
  return languageDictionary[languageCode] as AppDictionary;
}
