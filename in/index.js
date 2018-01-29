import restify from "restify";
import passport from "passport-restify";
import {BasicStrategy} from "passport-http";
import CookieParser from 'restify-cookies'
let HOOKS = {};

/* Auth */
let authenticate = function(username, password, done) {
    /*User.findOne({ username: username }, function(err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false);
      }
      if (!user.verifyPassword(password)) {
        return done(null, false);
      }
      return done(null, user);
    });*/
    if(username == "potatoe" && password == "potatoe") {
      return done(null, "potatoe");
    }
    else {
      return done(null, false);
    }
  };

/* Hooks */
HOOKS = {
  root: (req, res, next) => {
    res.send({
      ok: true
    });
    return next();
  },
  data: {
    get: (req, res, next) => {
      res.send({
        ok: true
      });
      return next();
    },
    put: (req, res, next) => {
      res.send({
        ok: true
      });
      return next();
    }
  }
};


/* Server */
let server = restify.createServer();
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());
server.use(restify.plugins.gzipResponse());
server.use(restify.plugins.requestLogger());
server.use(passport.initialize());
server.use(CookieParser.parse);
server.use(passport.session());
passport.use(new BasicStrategy({ session: true }, authenticate));
server.on("uncaughtException", function(req, res, route, err) {
  console.log("uncaughtException", err.stack);
});

// Routes:
server.get("/", passport.authenticate("basic"), HOOKS.root);
server.get("/data", passport.authenticate("basic"), HOOKS.data.get);
server.put("/data", passport.authenticate("basic"), HOOKS.data.put);


server.listen(process.env.PORT || 8080, function() {
  console.log("%s listening at %s", server.name, server.url);
});
