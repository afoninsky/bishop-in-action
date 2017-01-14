#!/usr/bin/env node

const workshopper = require('workshopper')
const pkg = require('./package')

workshopper({
  name: pkg.name,
  appDir : __dirname,
  languages: ['en', 'ru']
})
