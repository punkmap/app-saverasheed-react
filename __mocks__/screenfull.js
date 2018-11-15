const screenfull = {}
screenfull.onchange = jest.fn()
screenfull.exit = jest.fn()
screenfull.request = jest.fn()
screenfull.enabled = true
module.exports = screenfull
