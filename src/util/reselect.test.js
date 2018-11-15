import { subscribe } from './reselect'

it('subscribe works properly', () => {
  const mapStateToProps = subscribe({
    foo: x => x.foo,
    getBar: x => x.bar,
    getFooBar: x => x.fooBar,
  })

  const state = {
    foo: 'foo',
    bar: 'bar',
    fooBar: 'barFoo',
  }

  expect(mapStateToProps(state)).toEqual({
    foo: 'foo',
    bar: 'bar',
    fooBar: 'barFoo',
  })
})
