export const loadState = key => {
  try {
    const serializedState = localStorage.getItem(key)
    if (serializedState === null) {
      return undefined
    }
    return JSON.parse(serializedState)
  } catch (err) {
    console.log({ err })

    return undefined
  }
}

export const saveState = (key, state) => {
  try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem(key, serializedState)
  } catch (err) {
    // ignore write errors for now
    console.error({ err })
  }
}

export const removeState = key => {
  try {
    if (localStorage && localStorage.getItem(key)) {
      localStorage.removeItem(key)
    }
  } catch (err) {
    console.error({ err })
  }
}
