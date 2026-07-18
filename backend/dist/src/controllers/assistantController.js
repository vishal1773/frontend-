"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assistantController = void 0;
exports.assistantController = {
    async chat(req, res, next) {
        try {
            res.json({ success: true, data: { message: 'Assistant chat endpoint' } });
        }
        catch (error) {
            next(error);
        }
    },
    async voice(req, res, next) {
        try {
            res.json({ success: true, data: { message: 'Voice request endpoint' } });
        }
        catch (error) {
            next(error);
        }
    },
    async history(req, res, next) {
        try {
            res.json({ success: true, data: { message: 'Chat history endpoint' } });
        }
        catch (error) {
            next(error);
        }
    },
};
