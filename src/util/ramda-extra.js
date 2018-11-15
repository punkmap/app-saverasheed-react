import {
  addIndex,
  curry,
  toPairs,
  reduce,
  assoc,
  is,
  apply,
  not,
  map,
  values,
  join,
  concat,
  eqBy,
  all,
  min,
  max,
  filter,
  length,
  gt,
  pipe,
  __,
  mergeWith,
  isNil,
  evolve,
  flatten,
} from 'ramda'
import { reAsciiWord, reHasUnicodeWord, reUnicodeWord } from './regex'

export const debug = i => console.log(i) || i
export const noop = () => {}

export const mapObjAsArray = curry((fn, arr) => map(fn, values(arr)))
export const maxAll = reduce(max, -Infinity)
export const minAll = reduce(min, Infinity)

export const [mapArrIndexed, reduceArrIndexed] = map(addIndex, [map, reduce])

export const reduceObj = (fn, x, obj) => reduce(fn, x, values(obj))

export const reduceObjIndexed = (fn, x, obj) =>
  reduce((acc, [key, val]) => fn(acc, val, key), x, toPairs(obj))

export const mapKeys = curry((f, obj) =>
  reduceArrIndexed(
    (acc, [key, val]) => assoc(f(key), val, acc),
    {},
    toPairs(obj),
  ),
)

export const isArray = is(Array)
export const isFunction = is(Function)
export const castArray = x => (isArray(x) ? x : [x])
export const opposite = curry(predicate => (...args) =>
  not(apply(predicate, args)),
)

export const size = pipe(
  values,
  length,
)

export const words = str => {
  if (reHasUnicodeWord.test(str)) {
    return str.match(reUnicodeWord) || []
  }
  return str.match(reAsciiWord) || []
}

export const toHex = pipe(
  map(x => x.charCodeAt(0).toString(16)),
  concat(['0x']),
  join(''),
)

export const roundToBase = (n, digits = 0) => {
  let negative = false

  if (n < 0) {
    negative = true
    n *= -1
  }
  const multiplier = Math.pow(10, digits)
  n = parseFloat((n * multiplier).toFixed(11))
  n = (Math.round(n) / multiplier).toFixed(digits)
  if (negative) {
    n = (n * -1).toFixed(digits)
  }
  return n
}

export const roundTo = curry((digits, n) => roundToBase(n, digits))

export const eqByProps = curry((props, fn, obj1, obj2) =>
  all(key => eqBy(fn, obj1[key], obj2[key]), props),
)

export const containsBy = curry((fn, arr) =>
  pipe(
    filter(fn),
    length,
    gt(__, 0),
  )(arr),
)

export const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

export const mergeAllWith = curry((fn, arr) =>
  reduce((acc, obj) => mergeWith(fn, acc, obj), {}, arr),
)

export const flatMap = pipe(
  map,
  flatten,
)

export const mergeAllWithNil = mergeAllWith((a, b) => b || a)

export const toggleOrSet = curry(
  (key, val, obj) =>
    opposite(isNil)(val) ? assoc(key, val, obj) : evolve({ [key]: not }, obj),
)
