import type { EventGet } from "../api/timetable";
import { dateTime } from "@gravity-ui/date-utils";

/**
 * Возвращает массив событий с количеством пересечений для каждого события
 * @param events массив событий
 * @returns массив событий с полем intersections
 */
export const getEventsWithIntersections = <
  E extends Pick<EventGet, "start_ts" | "end_ts">
>(
  events: E[]
) =>
  events.map((event) => {
    let intersectionsCount = 0;

    // Проверяем пересечения с каждым другим событием
    for (const otherEvent of events) {
      const eventStart = dateTime({ input: event.start_ts }).valueOf();
      const eventEnd = dateTime({ input: event.end_ts }).valueOf();
      const otherEventStart = dateTime({
        input: otherEvent.start_ts,
      }).valueOf();
      const otherEventEnd = dateTime({ input: otherEvent.end_ts }).valueOf();

      if (
        (otherEventStart >= eventStart && otherEventStart <= eventEnd) ||
        (otherEventEnd >= eventStart && otherEventEnd <= eventEnd) ||
        (otherEventStart <= eventStart && otherEventEnd >= eventEnd)
      ) {
        intersectionsCount++;
      }
    }

    return {
      ...event,
      intersections: intersectionsCount,
    };
  });
