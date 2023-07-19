const express = require("express");
const router = express.Router();
const passport = require("passport");
const _ = require("lodash");

router.all("*", function (req, res, next) {
    passport.authenticate(
        "bearer",
        { session: false },
        function (err, user, info) {
            if (!req.headers.authorization) {
                return next({ name: "Authentication failed" });
            }
            if (err) {
                return next(err);
            } else {
                return next();
            }
        }
    )(req, res, next);
});

export default router;
