/* globals window */
const LEVELS = {
  DEBUG: 10,
  INFO: 20,
  WARN: 30,
  ERROR: 40,
  FATAL: 50
};

let LOG_LEVEL = 10;

function getLogFn(level = LEVELS.DEBUG) {
  let fn = window.console.log;
  switch(level) {
  case LEVELS.FATAL:
    fn = window.console.error;
    break;
  case LEVELS.ERROR:
    fn = window.console.error;
    break;
  case LEVELS.WARN:
    fn = window.console.warn;
    break;
  case LEVELS.INFO:
    fn = window.console.warn;
    break;
  default:
    fn = window.console.log;
  }
  return fn;
}

function log(level, args) {
  if (level >= LOG_LEVEL) getLogFn(level).apply(this, args);
}


export default {
  setLevel: (d) => LOG_LEVEL = d,
  log: function()   { log(LEVELS.INFO, Array.prototype.slice.call(arguments)); },
  debug: function() { log(LEVELS.DEBUG, Array.prototype.slice.call(arguments)); },
  info: function()  { log(LEVELS.INFO, Array.prototype.slice.call(arguments)); },
  warn: function()  { log(LEVELS.WARN, Array.prototype.slice.call(arguments)); },
  error: function() { log(LEVELS.ERROR, Array.prototype.slice.call(arguments)); },
  fatal: function() { log(LEVELS.FATAL, Array.prototype.slice.call(arguments)); }
};
