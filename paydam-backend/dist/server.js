"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const user_1 = require("./routes/user");
const auth_1 = require("./routes/auth");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
//middleware 
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.json());
// this is the main server route that is handling the details 
app.use('/api/v1/user', user_1.userRouter);
app.use("/api/v1/auth", auth_1.authRouter);
app.listen(PORT, () => {
    console.log(`Server is running on port : ${PORT}`);
});
