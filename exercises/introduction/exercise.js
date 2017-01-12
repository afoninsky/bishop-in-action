let exercise = require('workshopper-exercise')()
const filecheck = require('workshopper-exercise/filecheck')
const execute = require('workshopper-exercise/execute');
const comparestdout = require('workshopper-exercise/comparestdout')

// checks that the submission file actually exists
exercise = filecheck(exercise);

// execute the solution and submission in parallel with spawn()
exercise = execute(exercise);


// set up the data file to be passed to the submission
exercise.addSetup((mode, callback) => {
  // verify, run
  console.log(1, mode)
  callback()
})

// add a processor for both run and verify calls, added *before*
// the comparestdout processor so we can mess with the stdouts
exercise.addProcessor(function (mode, callback) {
  console.log(2, mode)
  callback()
});

// compare stdout of solution and submission
exercise = comparestdout(exercise)

module.exports = exercise
