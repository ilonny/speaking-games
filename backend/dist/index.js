"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const db_1 = __importStar(require("./db"));
const passport_1 = __importDefault(require("passport"));
const passport_http_bearer_1 = require("passport-http-bearer");
const auth_1 = __importDefault(require("./middleware/auth"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const lodash_1 = __importDefault(require("lodash"));
const const_1 = require("./const");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)());
passport_1.default.use(new passport_http_bearer_1.Strategy(function (token, cb) {
    db_1.default.user
        .findOne({
        where: {
            access_token: token,
        },
    })
        .then((user) => {
        if (!user) {
            return cb({ name: "Authentication failed" });
        }
        else {
            return cb(null, user);
        }
    })
        .catch(() => {
        return cb({ name: "Authentication failed" });
    });
}));
app.get("/", (req, res) => {
    db_1.default.test();
    res.send("Express + TypeScript Server");
});
app.post("/reg", async (req, res) => {
    const { email, password } = req.body;
    let existedUser = await db_1.UserModel.findOne({
        where: {
            email,
        },
    });
    if (existedUser) {
        res.json({ error: "User already exists" });
        return;
    }
    existedUser = await db_1.UserModel.create({
        email,
        password,
    });
    if (existedUser) {
        res.json({ success: true });
    }
    else {
        res.json({ error: "Internal server error" });
    }
});
app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    let existedUser = await db_1.UserModel.findOne({
        where: {
            email,
            password,
        },
    });
    if (existedUser) {
        existedUser.access_token = jsonwebtoken_1.default.sign(email, "supersecretsalt");
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
    existedUser = await db_1.UserModel.create({
        email,
        password,
    });
    if (existedUser) {
        res.json({ success: true });
    }
    else {
        res.json({ error: "Internal server error" });
    }
});
app.use("/protected", auth_1.default);
app.use((err, req, res, next) => {
    let responseStatusCode = 500;
    let responseObj = {
        success: false,
        data: [],
        error: err,
        message: "There was some internal server error",
    };
    if (!lodash_1.default.isNil(err)) {
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
app.post("/nhi-cards", async (req, res) => {
    const { user_id } = req.body;
    let existedUser;
    try {
        existedUser = await db_1.UserModel.findOne({
            where: {
                id: user_id,
            },
        });
    }
    catch (err) {
        // res.json({ error: "Internal server error" });
        // return;
    }
    if (!existedUser) {
        res.json({ error: "user not exist" });
        return;
    }
    if (existedUser?.nhi_payed) {
        res.json({ cards: const_1.allCards, free: false });
        return;
    }
    else {
        res.json({ cards: const_1.freeCards, free: true });
        return;
    }
});
app.post("/all-cards", async (req, res) => {
    const { user_id } = req.body;
    let existedUser;
    try {
        existedUser = await db_1.UserModel.findOne({
            where: {
                id: user_id,
            },
        });
    }
    catch (err) {
        res.json({ error: "Internal server error" });
        return;
    }
    if (!existedUser) {
        res.json({ error: "user not exist" });
        return;
    }
    if (existedUser?.nhi_payed) {
        res.json(const_1.allCards);
        return;
    }
    else {
        res.json(const_1.freeCards);
        return;
    }
});
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://0.0.0.0:${port}`);
});
//# sourceMappingURL=index.js.map