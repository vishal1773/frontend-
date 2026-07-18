"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminController = void 0;
exports.adminController = {
    async dashboard(req, res, next) {
        try {
            res.json({ success: true, data: { message: 'State admin dashboard', user: req.user } });
        }
        catch (error) {
            next(error);
        }
    },
    async users(req, res, next) {
        try {
            res.json({ success: true, data: { message: 'User management' } });
        }
        catch (error) {
            next(error);
        }
    },
    async shops(req, res, next) {
        try {
            res.json({ success: true, data: { message: 'Shop management' } });
        }
        catch (error) {
            next(error);
        }
    },
    async districts(req, res, next) {
        try {
            res.json({ success: true, data: { message: 'District management' } });
        }
        catch (error) {
            next(error);
        }
    },
};
