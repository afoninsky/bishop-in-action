const Promise = require('bluebird')
const path = require('path')
const assert = require('assert')
const chalk = require('chalk')
const filecheck = require('workshopper-exercise/filecheck')
const execute = require('workshopper-exercise/execute')

const exercise = execute(filecheck(require('workshopper-exercise')()))

let submission, solution
let left, right

function getSolutionPath() {
  return path.join(exercise.dir, './solution/')
}

exercise.addSetup((mode, callback) => {
  const submissionPath = [ process.cwd(), exercise.args[0] ].join('/')
  submission = require(submissionPath)
  solution = require(getSolutionPath() + 'solution.js')
  left = Math.floor(Math.random() * 99) + 1
  right = Math.floor(Math.random() * 99) + 1
  callback()
})

exercise.addProcessor((mode, callback) => {
  const route = { role: 'math', cmd: 'sum' }

  Promise.props({
    submission: submission.act(route, { left, right }),
    solution: solution.act(route, { left, right })
  }).then(result => {
    if (mode === 'run') {
      return console.log(chalk.gray(`left = ${left}, right = ${right}, result = ${JSON.stringify(result.solution)}`))
    }
    assert(result.submission, exercise.__('error.noreturn'))
    assert.deepEqual(result.solution, result.submission,
      exercise.__('error.expected', JSON.stringify(result.solution), JSON.stringify(result.submission)))
    callback()
  }).catch(err => {
    exercise.emit('fail', chalk.gray(err.message))
    callback(null, false)
  })
})

module.exports = exercise
