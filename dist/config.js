"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PORT = exports.DB_HOST = void 0;
exports.DB_HOST = process.env.DB_HOST || "mongodb+srv://user22:user223@cluster0.w7xat.mongodb.net/tasks-flow?retryWrites=true&w=majority&appName=Cluster0";
exports.PORT = process.env.PORT || 3001;
