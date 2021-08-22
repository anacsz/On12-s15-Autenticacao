const mongoose = require('mongoose')
const MONGODB = process.env.MONGODB_URL
console.log(process.env)
console.log('MONGO URL', MONGODB)

const connect = () => {mongoose.connect(MONGODB, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(console.log('Database conectada com sucesso.'))
  .catch(err => console.err)
}

module.exports = { connect }