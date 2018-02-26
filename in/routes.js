'use strict'
import Actions from './actions'
import passport from 'passport-restify'

export default (server, passport) => {
    server.get("/", Actions.status)
    server.get("/token", passport.authenticate("basic", { session: false }), Actions.getToken)
    server.post("/account", Actions.newAccount)
    server.get("/setup", passport.authenticate("bearer", { session: false }) , Actions.getSetup);
    server.post("/setup", passport.authenticate("bearer", { session: false }) , Actions.setSetup);
    server.post("/stream", passport.authenticate("bearer", { session: false }) , Actions.setStream);
}
