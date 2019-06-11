/**
 * parseOutput :: [ String ] -> String
 *
 * This function takes in the elm args and pulls out the value assigned to the output arg.
 **/
const parseOutput = args => args
  .find(arg => arg.includes('--output='))
  .match(/--output=(.*)/)[1]

/**
 * init :: { program: Program, input: Stream, output: Stream } -> Model
 *
 * This function takes in the program object and the input/output streams and builds the Model that the rest of the application will use to work.
 **/
function init ({ program, input, output }) {
  return {
    after: program.afterBuild || false,
    before: program.beforeBuild || false,
    build: false,
    cwd: process.cwd(),
    dir: program.dir || process.cwd(),
    elmArgs: program.args || [],
    host: program.host || 'localhost',
    hot: program.hot !== false,
    ide: program.ide || 'atom',
    input,
    log: console.log,
    open: program.open || false,
    output,
    port: program.port || 8000,
    elm: program.pathToElm || 'elm',
    proxyPrefix: program.proxyPrefix || false,
    proxyHost: program.proxyHost || false,
    pushstate: program.pushstate || false,
    recover: program.recover !== false,
    server: false,
    ssl: program.ssl || false,
    startPage: program.startPage || 'index.html',
    target: parseOutput(program.args),
    getAction: key => ({
      reload: program.hot ? 'hotReload' : 'coldReload',
      compile: 'compiling',
      error: 'error',
      buildFailure: 'failure'
    }[key])
  }
}

/*
|-------------------------------------------------------------------------------
| Export
|-------------------------------------------------------------------------------
*/

module.exports = {
  init
}