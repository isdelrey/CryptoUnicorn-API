import mongoose from './db'

let User = mongoose.model("User", {
  name: String,
  email: String,
  password: String,
  token: String,
  setup: mongoose.SchemaTypes.Mixed
})


export {User}
