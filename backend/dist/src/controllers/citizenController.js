"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.citizenController = void 0;
exports.citizenController = {
    async dashboard(req, res, next) {
        try {
            res.json({ success: true, data: { message: 'Citizen dashboard', user: req.user } });
        }
        catch (error) {
            next(error);
        }
    },
    async quota(req, res, next) {
        try {
            res.json({ success: true, data: { message: 'Citizen quota' } });
        }
        catch (error) {
            next(error);
        }
    },
    async transactions(req, res, next) {
        try {
            res.json({ success: true, data: { message: 'Transaction history' } });
        }
        catch (error) {
            next(error);
        }
    },
    async complaints(req, res, next) {
        try {
            res.json({ success: true, data: { message: 'Complaints list' } });
        }
        catch (error) {
            next(error);
        }
    },
    async notifications(req, res, next) {
        try {
            res.json({ success: true, data: { message: 'Notifications' } });
        }
        catch (error) {
            next(error);
        }
    },
    async profile(req, res, next) {
        try {
            res.json({ success: true, data: { message: 'Profile', user: req.user } });
        }
        catch (error) {
            next(error);
        }
    },
};
