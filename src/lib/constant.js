let apiPrefix = ''
if (process.env.NODE_ENV === 'development') {
  // apiPrefix = 'http://10.16.30.9:8880/visitor-record'
  apiPrefix = 'http://192.168.1.120:8880/visitor-record'
} else if (process.env.NODE_ENV === 'production') {
  // let hostStr = location.protocol + '//' + location.hostname
  // apiPrefix = hostStr + ':8880/visitor-record'
  apiPrefix = '/visitor-record'
}

module.exports = {
  apiPrefix
}
