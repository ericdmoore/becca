const fs = require('fs')
const path = require('path')
// const esm = require('esm')
// const _ = require('lodash')
const R = require('rambda')
// const Ramda = require('ramda')

const { Readable } = require('stream')
const zlib = require('zlib')

const setupSavinging = (fileName, path = './_collectedData/') => {
  const start = new Readable({ objectMode: true })

  // returns save func
  return (data) => {
    const ws = fs.createWriteStream(`${path}${fileName}`, {
      flags: 'w',
      encoding: 'utf8',
      fd: null,
      mode: 0o666,
      autoClose: true
    })
    start.push(`${JSON.stringify(data)}\n`)
    start.push(null)
    start
      .pipe(zlib.createGzip())
      .pipe(ws)
  }
}

const benchmarks = require('beautify-benchmark')

const { argv } = process

/**
 * @description a function that configures the tests to run.
 * @example
 * '$> node index.js'
 * '$> ...scans every file in the `bench` folder'
 * @example
 * '$> node index.js --ls otherModule.js someModule.js'
 * '$> performs bench from each_module listed in the space separated'
 * @param {Object} [config={paths:'*'}] - Configure what tests to look for - defaults to: all.
 * @param {Object} [config.paths="*"] - Asdasd.
 * @todo Evnetually this function will need to be able to compare func.A with itself from different versions
 * to accomplish this: compare now vs its own prior runs - or even create a retrodated run for a function
 * by digging through git-history - The compare to saved priro runs is nice - but does create and every
 * growing burden of analytics data
 * @returns {Array} An array of file names with paths relative to the `benchmarks` folder.
 */
const getBenchmarksToRun = ({ paths } = { paths: '*' }) => {
  const prependBenchPath = (file) => file.includes('bench/') ? `${file}` : `/bench/${file}`
  if (paths === '*') {
    const allFiles = fs.readdirSync(path.join(__dirname, '/bench'))
    return R.compose(
      R.filter(x => x !== 'index.js'),
      R.map(x => prependBenchPath(x))
    )(allFiles)
  } else {
    const files = Array.isArray(paths)
      ? R.compose(
        R.map(x => prependBenchPath(x))
      )(paths)
      : new Error('input paths was not processed into an Array')

    console.info({ files })
    files.length === 0 && console.warn('Please use a space separated list of file names to include from the bench folder')
    files.length === 0 && console.warn('ignore the folder prefix of `bench` as that will be taken care of for you')
    return files
  }
}

async function main () {
  let benchmarksToRun

  if (argv.includes('--ls') || argv.includes('ls')) {
    console.log({ argv })
    benchmarksToRun = getBenchmarksToRun({ paths: argv.slice(2, argv.length) })
  } else {
    // run the all tests as default
    benchmarksToRun = getBenchmarksToRun()
  }

  console.log({ benchmarksToRun })

  return Promise.all(
    benchmarksToRun.map(filePath => {
      console.log(`Running ${filePath}`)
      return runBenchmark(filePath)
    })
  )
}

async function runBenchmark (filePath, { moduleFormat } = { moduleFormat: 'cjs' }) {
  const saveFileName = `${(new Date()).getTime()}.json.gz`
  const saveData = setupSavinging(saveFileName)
  if (moduleFormat === 'cjs') {
    try {
      require(path.join(__dirname, filePath))
        .on('cycle', event => {
          console.log({ event })
          benchmarks.add(event.target)
        })
        .on('complete', function () {
          benchmarks.log()
          saveData(this)
          return this
        })
        .run({
          // 'async': true
        })
    } catch (err) {
      console.log(err)
      process.exit()
    }
  } else if (moduleFormat === 'es6') {
    throw new Error('not implemented yet')
  }
}

// printer
(async () => {
  const results = await main()
  console.log({ results })
})()

// const results = main()
//   .then(console.log)
//   .catch(console.log)

// or less used there is: https://github.com/JoshuaWise/nodemark
