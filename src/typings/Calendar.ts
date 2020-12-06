import { AssetDBO } from "@helpfulhuman/expapp-shared-libs";
import { ViewApi } from "@fullcalendar/react";

export interface ICalendarEventContent {
  event: {
    start: Date;
    url?: string;
    _def: {
      extendedProps: {
        customUrl?: string;
        imageUrl?: string | AssetDBO;
        paymentType?: string;
        price?: [string, number];
      };
      title: string;
    };
  };
}

export type DateClickEvent = {
  dateStr: string;
  date: Date;
  allDat: boolean;
  jsEvent: MouseEvent;
  view: ViewApi;
  dayEl: HTMLElement;
};

export type CalendarEventClick = {
  event: {
    _def: {
      publicId: string;
    };
    _instance: {
      range: {
        start: Date;
        end: Date;
      };
    };
  }
};