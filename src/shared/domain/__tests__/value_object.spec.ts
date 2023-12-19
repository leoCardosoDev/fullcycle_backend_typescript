import { ValueObject } from '../value_object'

class StringValueObject extends ValueObject {
  constructor (readonly value: string) {
    super()
  }
}

class ComplexValueObject extends ValueObject {
  constructor (readonly props1: string, readonly props2: number) {
    super()
  }
}

describe('Value Object Unit Test', () => {
  test('should be equals', () => {
    const valueObject1 = new StringValueObject('test')
    const valueObject2 = new StringValueObject('test')
    expect(valueObject1.equals(valueObject2)).toBe(true)

    const complexValueObject1 = new ComplexValueObject('test', 1)
    const complexValueObject2 = new ComplexValueObject('test', 1)
    expect(complexValueObject1.equals(complexValueObject2)).toBe(true)
  });

  test('should not be equals', () => {
    const valueObject1 = new StringValueObject('test')
    const valueObject2 = new StringValueObject('test2')
    expect(valueObject1.equals(valueObject2)).toBe(false)

    const complexValueObject1 = new ComplexValueObject('test', 1)
    const complexValueObject2 = new ComplexValueObject('test2', 2)
    expect(complexValueObject1.equals(complexValueObject2)).toBe(false)
  })
});
