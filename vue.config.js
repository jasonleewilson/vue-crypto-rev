module.exports = {
    //publicPath: ["vue-crypto-rev/"]
    publicPath: process.env.BASE_URL === 'production'
    ? '/vue-crypto-rev/'
    : '/'
   }