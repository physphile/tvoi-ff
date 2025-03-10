import { getEventsWithIntersections } from "./getEventsWithIntersections";
import type { EventGet } from "../api/timetable";
import { describe, it, expect } from "bun:test";

describe("getEventsWithIntersections", () => {
  it("должен корректно подсчитывать количество пересечений для непересекающихся событий", () => {
    const events: EventGet[] = [
      {
        start_ts: "2024-03-20T10:00:00",
        end_ts: "2024-03-20T11:00:00",
        id: 1,
        name: "Event 1",
        room: [],
        group: [],
        lecturer: []
      },
      {
        start_ts: "2024-03-20T12:00:00",
        end_ts: "2024-03-20T13:00:00",
        id: 2,
        name: "Event 2",
        room: [],
        group: [],
        lecturer: []
      },
    ];

    const result = getEventsWithIntersections(events);
    expect(result[0].intersections).toBe(1); // событие пересекается только с самим собой
    expect(result[1].intersections).toBe(1);
  });

  it("должен корректно подсчитывать количество пересечений для частично пересекающихся событий", () => {
    const events: EventGet[] = [
      {
        start_ts: "2024-03-20T10:00:00",
        end_ts: "2024-03-20T12:00:00",
        id: 1,
        name: "Event 1",
        room: [],
        group: [],
        lecturer: []
      },
      {
        start_ts: "2024-03-20T11:00:00",
        end_ts: "2024-03-20T13:00:00",
        id: 2,
        name: "Event 2",
        room: [],
        group: [],
        lecturer: []
      },
    ];

    const result = getEventsWithIntersections(events);
    expect(result[0].intersections).toBe(2); // пересекается с собой и вторым событием
    expect(result[1].intersections).toBe(2);
  });

  it("должен корректно подсчитывать количество пересечений для полностью перекрывающих друг друга событий", () => {
    const events: EventGet[] = [
      {
        start_ts: "2024-03-20T10:00:00",
        end_ts: "2024-03-20T14:00:00",
        id: 1,
        name: "Event 1",
        room: [],
        group: [],
        lecturer: []
      },
      {
        start_ts: "2024-03-20T11:00:00",
        end_ts: "2024-03-20T13:00:00",
        id: 2,
        name: "Event 2",
        room: [],
        group: [],
        lecturer: []
      },
    ];

    const result = getEventsWithIntersections(events);
    expect(result[0].intersections).toBe(2);
    expect(result[1].intersections).toBe(2);
  });

  it("должен корректно обрабатывать пустой массив событий", () => {
    const events: EventGet[] = [];
    const result = getEventsWithIntersections(events);
    expect(result).toEqual([]);
  });

  it("должен сохранять все оригинальные поля события", () => {
    const events: EventGet[] = [
      {
        id: 1,
        start_ts: "2024-03-20T10:00:00",
        end_ts: "2024-03-20T11:00:00",
        name: "Test Event",
        room: [],
        group: [],
        lecturer: []
      },
    ];

    const result = getEventsWithIntersections(events);
    expect(result[0]).toEqual({
      ...events[0],
      intersections: 1,
    });
  });
});
