import { add, F, T, equals, startsWith, prop, __ } from 'ramda'
import {
  words,
  mapKeys,
  isArray,
  opposite,
  mapObjAsArray,
  reduceArrIndexed,
  mapArrIndexed,
  toHex,
  roundToBase,
  roundTo,
  eqByProps,
  isFunction,
  maxAll,
  minAll,
  containsBy,
  size,
  mergeAllWith,
  mergeAllWithNil,
  toggleOrSet,
  flatMap,
  reduceObjIndexed,
  reduceObj,
} from './ramda-extra'

it('mapKeys works', () => {
  const obj = { foo: 'bar' }
  const mapped = mapKeys(x => x + x, obj)
  expect(mapped).toEqual({ foofoo: 'bar' })
})

it('isArray works', () => {
  expect(isArray([])).toBe(true)
  expect(isArray('')).toBe(false)
  expect(isArray(() => {})).toBe(false)
  expect(isArray(function() {})).toBe(false)
})

it('isFunction works', () => {
  expect(isFunction([])).toBe(false)
  expect(isFunction('')).toBe(false)
  expect(isFunction(() => {})).toBe(true)
  expect(isFunction(function() {})).toBe(true)
})

it('opposite works', () => {
  expect(opposite(F)()).toBe(true)
  expect(opposite(T)()).toBe(false)
  expect(opposite(equals(1))(1)).toBe(false)
  expect(opposite(equals(1))(2)).toBe(true)
  // expect(opposite(equals(1), 1)).toBe(false)
  // expect(opposite(equals(1), 2)).toBe(true)
})

it('words works', () => {
  expect(words('Hello there')).toEqual(['Hello', 'there'])
  expect(words('fred, barney, & pebbles')).toEqual([
    'fred',
    'barney',
    'pebbles',
  ])
})

it('mapObjAsArray works', () => {
  expect(mapObjAsArray(x => x, { foo: 'bar' })).toEqual(['bar'])
})

it('reduceArrIndexed works', () => {
  expect(reduceArrIndexed((acc, x, i) => acc + x + i, '', ['bar'])).toEqual(
    'bar0',
  )
})

it('reduceObj works', () => {
  expect(
    reduceObj((acc, x) => acc + x, '', { bar: 'foo', foo: 'bar' }),
  ).toEqual('foobar')
})

it('reduceObjIndexed works', () => {
  expect(
    reduceObjIndexed((acc, x, i) => acc + x + i, '', { bar: 'foo' }),
  ).toEqual('foobar')
})

it('mapArrIndexed works', () => {
  expect(mapArrIndexed((x, i) => x + i, ['bar'])).toEqual(['bar0'])
})

it('toHex works', () => {
  expect(toHex('foo')).toBe('0x666f6f')
})

describe('roundToBase', () => {
  it('rounds postiive numbers correctly', () => {
    expect(roundToBase(91.00005, 4)).toBe('91.0001')
    expect(roundToBase(1.00005, 4)).toBe('1.0001')
    expect(roundToBase(1.005, 2)).toBe('1.01')
    expect(roundToBase(1.004, 2)).toBe('1.00')
    expect(roundToBase(1.5)).toBe('2')
  })

  it('rounds negative numbers correctly', () => {
    expect(roundToBase(-91.00005, 4)).toBe('-91.0001')
    expect(roundToBase(-1.00005, 4)).toBe('-1.0001')
    expect(roundToBase(-1.005, 2)).toBe('-1.01')
    expect(roundToBase(-1.004, 2)).toBe('-1.00')
    expect(roundToBase(-1.5)).toBe('-2')
  })
})

describe('roundTo', () => {
  it('curries correctly', () => {
    const roundTo4 = roundTo(4)
    expect(roundTo4(1.00005)).toBe('1.0001')
    expect(roundTo4(1.005, 2)).toBe('1.0050')
    expect(roundTo4(1.5)).toBe('1.5000')
  })
})

describe('eqByProps', () => {
  it('works correctly', () => {
    const obj1 = {
      foo: 'bar',
      bar: 'baz',
      bin: 'boo',
    }
    const obj2 = {
      foo: 'baz',
      bar: 'bar',
      boo: 'bin',
    }

    expect(eqByProps(['foo', 'bar'], startsWith('ba'), obj1, obj2))
  })

  it('curries correctly', () => {
    const obj1 = {
      foo: 'bar',
      bar: 'baz',
      bin: 'boo',
    }
    const obj2 = {
      foo: 'baz',
      bar: 'bar',
      boo: 'bin',
    }

    expect(eqByProps(['foo', 'bar'], startsWith('ba')(obj1, obj2)))
  })
})

describe('maxAll', () => {
  it('works correctly', () => {
    expect(maxAll([0, 1, 2])).toBe(2)
    expect(maxAll([0, -1, -2])).toBe(0)
  })
})

describe('minAll', () => {
  it('works correctly', () => {
    expect(minAll([0, 1, 2])).toBe(0)
    expect(minAll([0, -1, -2])).toBe(-2)
  })
})

describe('containsBy', () => {
  it('works correctly', () => {
    expect(containsBy(x => x % 2 === 0, [0, 1, 2, 3])).toBe(true)
    expect(containsBy(x => x % 2 === 0, [1, 3, 5, 7])).toBe(false)
    expect(containsBy(x => equals(5, prop('foo', x)), [{ foo: 5 }])).toBe(true)
    expect(containsBy(x => equals(5, prop('foo', x)), [{ foo: 4 }])).toBe(false)
  })
})

describe('size', () => {
  it('works on arrays correctly', () => {
    expect(size([1, 2, 3])).toBe(3)
  })
  it('works on objects correctly', () => {
    expect(size({ a: 1, b: 2, c: 3, d: 4 })).toBe(4)
  })
})

describe('mergeAllWith', () => {
  it('works correctly', () => {
    expect(mergeAllWith(add, [{ foo: 1 }, { bar: 2 }, { foo: 3 }])).toEqual({
      foo: 4,
      bar: 2,
    })
    expect(
      mergeAllWith((a, b) => b || a, [{ foo: 1 }, { bar: 2 }, { foo: 3 }]),
    ).toEqual({
      foo: 3,
      bar: 2,
    })
    expect(
      mergeAllWith((a, b) => b || a, [{ foo: 1 }, { bar: 2 }, { foo: null }]),
    ).toEqual({
      foo: 1,
      bar: 2,
    })
  })
})

describe('mergeAllWithNil', () => {
  it('works correctly', () => {
    expect(mergeAllWithNil([{ foo: 1 }, { bar: 2 }, { foo: null }])).toEqual({
      foo: 1,
      bar: 2,
    })
  })
})

describe('flatMap', () => {
  it('works correctly', () => {
    expect(flatMap(x => x, [[0, 1], [1, 2], [3, 4]])).toEqual([
      0,
      1,
      1,
      2,
      3,
      4,
    ])
  })
})

describe('toggleOrSet', () => {
  it('works correctly with null and undefined', () => {
    expect(toggleOrSet('appLoading', null)({ appLoading: true })).toEqual({
      appLoading: false,
    })
    expect(toggleOrSet('appLoading', undefined)({ appLoading: true })).toEqual({
      appLoading: false,
    })
    expect(toggleOrSet('appLoading', null)({ appLoading: false })).toEqual({
      appLoading: true,
    })
    expect(toggleOrSet('appLoading', undefined)({ appLoading: false })).toEqual(
      {
        appLoading: true,
      },
    )
  })
  it('works correctly with a value', () => {
    expect(toggleOrSet('appLoading', true)({ appLoading: true })).toEqual({
      appLoading: true,
    })
    expect(toggleOrSet('appLoading', false)({ appLoading: true })).toEqual({
      appLoading: false,
    })
    expect(toggleOrSet('appLoading', true)({ appLoading: false })).toEqual({
      appLoading: true,
    })
    expect(toggleOrSet('appLoading', false)({ appLoading: false })).toEqual({
      appLoading: false,
    })
  })
  it('curries correctly', () => {
    expect(toggleOrSet('appLoading', true, { appLoading: true })).toEqual({
      appLoading: true,
    })
    expect(toggleOrSet('appLoading', false, { appLoading: true })).toEqual({
      appLoading: false,
    })
    expect(toggleOrSet('appLoading', true, { appLoading: false })).toEqual({
      appLoading: true,
    })
    expect(toggleOrSet('appLoading', false, { appLoading: false })).toEqual({
      appLoading: false,
    })
  })
})
