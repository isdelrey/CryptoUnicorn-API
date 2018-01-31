import 'babel-polyfill'
import Auth from './auth'
import restify from "restify"
import passport from 'passport-restify'
import {BasicStrategy} from 'passport-http'
import BearerStrategy from 'passport-http-bearer'
import Routes from './routes'

export default () => {
  let server = restify.createServer()

  server.use(restify.plugins.queryParser())
  server.use(restify.plugins.bodyParser())
  server.use(restify.plugins.gzipResponse())
  server.use(passport.initialize())

  passport.use(new BasicStrategy({}, Auth.basic))
  passport.use(new BearerStrategy({}, Auth.bearer))

  Routes(server, passport)

  server.listen(process.env.PORT || 8080, function() {
    console.log('%s listening at %s', server.name, server.url)
  })
}
