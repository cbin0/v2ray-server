module.exports = {
  log(msg) {
    console.log(`[${(new Date).getTime()}]: ${msg}`)
  },
  fromPairs(array) {
    return array.reduce((memo, x) => {
      memo[x[0]] = x[1]
      return memo
    }, {})
  },
  mapValues() {

  }
}