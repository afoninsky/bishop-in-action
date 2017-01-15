const bishop = require('bishop')()
bishop.add('role: math, cmd: sum', message => {
  return {
    result: message.left + message.right
  }
})
module.exports = bishop
