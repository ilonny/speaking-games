import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import db, { UserModel } from "./db";
import passport from "passport";
import { Strategy } from "passport-http-bearer";
import authMiddleware from "./middleware/auth";
import jwt from "jsonwebtoken";
import _ from "lodash";
import { allCards, freeCards } from "./const";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

passport.use(
    new Strategy(function (token, cb) {
        db.user
            .findOne({
                where: {
                    access_token: token,
                },
            })
            .then((user) => {
                if (!user) {
                    return cb({ name: "Authentication failed" });
                } else {
                    return cb(null, user);
                }
            })
            .catch(() => {
                return cb({ name: "Authentication failed" });
            });
    })
);

app.get("/", (req: Request, res: Response) => {
    db.test();
    res.send("Express + TypeScript Server");
});

app.post("/reg", async (req: Request, res: Response) => {
    const { email, password } = req.body;

    let existedUser = await UserModel.findOne({
        where: {
            email,
        },
    });

    if (existedUser) {
        res.json({ error: "User already exists" });
        return;
    }

    existedUser = await UserModel.create({
        email,
        password,
    });

    if (existedUser) {
        res.json({ success: true });
    } else {
        res.json({ error: "Internal server error" });
    }
});

app.post("/login", async (req: Request, res: Response) => {
    const { email, password } = req.body;

    let existedUser = await UserModel.findOne({
        where: {
            email,
            password,
        },
    });

    if (existedUser) {
        existedUser.access_token = jwt.sign(email, "supersecretsalt");
        await existedUser.save();
        res.send({
            success: true,
            access_token: existedUser.access_token,
            user_id: existedUser.id,
            email,
            nhi_payed: existedUser.nhi_payed,
        });
        return;
    }

    existedUser = await UserModel.create({
        email,
        password,
    });

    if (existedUser) {
        res.json({ success: true });
    } else {
        res.json({ error: "Internal server error" });
    }
});

app.use("/protected", authMiddleware);
app.use((err, req, res, next) => {
    let responseStatusCode = 500;
    let responseObj = {
        success: false,
        data: [],
        error: err,
        message: "There was some internal server error",
    };

    if (!_.isNil(err)) {
        if (err.name === "Authentication failed") {
            responseStatusCode = 401;
            responseObj.message =
                "You cannot get the details. You are not authorized to access this protected resource";
        }
    }

    if (!res.headersSent) {
        res.status(responseStatusCode).json(responseObj);
    }
});

app.post("/nhi-cards", async (req: Request, res: Response) => {
    const { user_id } = req.body;
    let existedUser;
    try {
        existedUser = await UserModel.findOne({
            where: {
                id: user_id,
            },
        });
    } catch (err) {
        // res.json({ error: "Internal server error" });
        // return;
    }

    // if (!existedUser) {
    //     res.json({ error: "user not exist" });
    //     return;
    // }

    if (existedUser?.nhi_payed) {
        res.json({ cards: allCards, free: false });
        return;
    } else {
        res.json({ cards: freeCards, free: true });
        return;
    }
});

app.post("/all-cards", async (req: Request, res: Response) => {
    const { user_id } = req.body;
    let existedUser;
    try {
        existedUser = await UserModel.findOne({
            where: {
                id: user_id,
            },
        });
    } catch (err) {
        res.json({ error: "Internal server error" });
        return;
    }

    if (!existedUser) {
        res.json({ error: "user not exist" });
        return;
    }

    if (existedUser?.nhi_payed) {
        res.json(allCards);
        return;
    } else {
        res.json(freeCards);
        return;
    }
});

app.get("/", (req, res) => res.type('html').send(html));

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://0.0.0.0:${port}`);
});


const html = `
<!DOCTYPE html>
<html>
  <head>
    <title>Hello from Speaking Games!</title>
    <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.5.1/dist/confetti.browser.min.js"></script>
    <script>
      setTimeout(() => {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          disableForReducedMotion: true
        });
      }, 500);
    </script>
    <style>
      @import url("https://p.typekit.net/p.css?s=1&k=vnd5zic&ht=tk&f=39475.39476.39477.39478.39479.39480.39481.39482&a=18673890&app=typekit&e=css");
      @font-face {
        font-family: "neo-sans";
        src: url("https://use.typekit.net/af/00ac0a/00000000000000003b9b2033/27/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3") format("woff2"), url("https://use.typekit.net/af/00ac0a/00000000000000003b9b2033/27/d?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3") format("woff"), url("https://use.typekit.net/af/00ac0a/00000000000000003b9b2033/27/a?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3") format("opentype");
        font-style: normal;
        font-weight: 700;
      }
      html {
        font-family: neo-sans;
        font-weight: 700;
        font-size: calc(62rem / 16);
      }
      body {
        background: white;
      }
      section {
        border-radius: 1em;
        padding: 1em;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-right: -50%;
        transform: translate(-50%, -50%);
      }
    </style>
  </head>
  <body>
    <section>
      Hello from Speaking games api! any questions? contact me in telegram @iLonny
    </section>
  </body>
</html>
`