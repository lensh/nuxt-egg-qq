const baseParam = require('./base')

module.exports = app => {
  const { mongoose } = app
  const Schema = mongoose.Schema

  const userSchema = new Schema(Object.assign({}, baseParam, {
    nick: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String }
  }))

  userSchema.index({ email: 1 }, { unique: true })

  // 定义User模型
  return mongoose.model('User', userSchema)
}