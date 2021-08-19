"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const PlaylistService_1 = __importDefault(require("../service/PlaylistService"));
const Endpoints_1 = __importDefault(require("../types/controllers/Endpoints"));
const expressErrors_1 = __importDefault(require("../utils/error/expressErrors"));
const router = express_1.Router();
//Endpoint for fetching a specific playlist's information and details
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { id: playlistID, pageToken } = req.query;
        if (!playlistID)
            return expressErrors_1.default.userError(res, "must provide a playlist ID to fetch");
        playlistID = playlistID.toString();
        pageToken ? pageToken = pageToken.toString() : null; // pagination option parameter handlement
        const playlistObj = yield PlaylistService_1.default.getPlaylist(playlistID, pageToken); // get playlist from service class
        if (!playlistObj)
            return expressErrors_1.default.notFound(res); // return 404 if couldn find related playlist
        res.send(playlistObj);
    }
    catch (e) {
        // any error that is thrown and not being handled earlier in the code will be send as an internal error to the client
        expressErrors_1.default.internalError(res);
    }
}));
//Endpoint for fetching a list of playlists belongs to the salesforce channel
router.get("/list", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const playlistList = yield PlaylistService_1.default.getPlaylistsList(); // get the list of playlists from the service class
        if (!playlistList)
            throw ("");
        res.send(playlistList);
    }
    catch (e) {
        // any error that is thrown and not being handled earlier in the code will be send as an internal error to the client
        expressErrors_1.default.internalError(res);
    }
}));
exports.default = {
    router,
    endpoint: Endpoints_1.default.PLAYLIST
};
