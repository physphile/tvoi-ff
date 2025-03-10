import { describe, it, expect } from 'bun:test';
import { findLcm } from './findLcm';

describe('findLcm', () => {
  it('должен правильно находить НОК для двух чисел', () => {
    expect(findLcm([2, 3])).toBe(6);
    expect(findLcm([4, 6])).toBe(12);
    expect(findLcm([15, 25])).toBe(75);
  });

  it('должен правильно находить НОК для массива из трёх и более чисел', () => {
    expect(findLcm([2, 3, 4])).toBe(12);
    expect(findLcm([4, 6, 8])).toBe(24);
    expect(findLcm([3, 4, 6, 8])).toBe(24);
  });

  it('должен корректно работать с одним числом', () => {
    expect(findLcm([7])).toBe(7);
    expect(findLcm([12])).toBe(12);
  });

  it('должен возвращать 1 для пустого массива', () => {
    expect(findLcm([])).toBe(1);
  });

  it('должен выбрасывать ошибку при наличии нецелых чисел', () => {
    expect(() => findLcm([2, 3.5])).toThrow('Все числа должны быть целыми');
    expect(() => findLcm([2.7, 3])).toThrow('Все числа должны быть целыми');
  });

  it('должен игнорировать нули и находить НОК для оставшихся чисел', () => {
    expect(findLcm([0, 3, 4])).toBe(12);
    expect(findLcm([2, 0, 4])).toBe(4);
    expect(findLcm([6, 8, 0, 10])).toBe(120);
  });

  it('должен возвращать 1 для массива, содержащего только нули', () => {
    expect(findLcm([0])).toBe(1);
    expect(findLcm([0, 0, 0])).toBe(1);
  });
});
