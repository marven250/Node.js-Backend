import session from "express-session";

export const sessionMiddleware = session({
  secret: "thisIsTheBiggestSecret",
  cookie: { secure: false },
  resave: false,
  saveUninitialized: false,
});
