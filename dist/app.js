"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("./config");
const boardRouter_1 = __importDefault(require("./routers/boardRouter"));
const columnRouter_1 = __importDefault(require("./routers/columnRouter"));
const cardRouter_1 = __importDefault(require("./routers/cardRouter"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';
app.use((0, morgan_1.default)(formatsLogger));
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.static(path_1.default.join(__dirname, "public")));
app.get('/', (req, res) => {
    res.status(200).json({ message: 'Server is running' });
});
app.use('/api/boards', boardRouter_1.default);
app.use('/api', columnRouter_1.default);
app.use('/api/boards', cardRouter_1.default);
app.use((req, res) => {
    res.status(404).json({ message: "Not found" });
});
app.use((err, req, res, next) => {
    res.status(err.status || 500).json({ message: err.message });
});
mongoose_1.default.connect(config_1.DB_HOST)
    .then(() => {
    app.listen(config_1.PORT, () => console.log(`Server running on port http://localhost:${config_1.PORT}`));
})
    .catch((error) => {
    console.log(error.message || "An error occurred while connecting to the database");
    process.exit(1);
});
exports.default = app;
