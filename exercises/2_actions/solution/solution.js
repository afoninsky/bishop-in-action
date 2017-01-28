const math = require('./math')
const [ , , left, right ] = process.argv

math.act('role: math, cmd: sum', {
  left: Number(left),
  right: Number(right)
}).then(console.log)
