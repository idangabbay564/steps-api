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
const googleapis_1 = require("googleapis");
const config_1 = __importDefault(require("../config"));
//class being used as the service layer for the playist controller
class PlaylistService {
    static init(key, google) {
        this.key = key;
        this.google = google;
    }
    //function handles getting a specific platlist's videos list
    static getPlaylist(playlistId, pageToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const key = this.key;
            //fetch videos list from the GoogleAPI wrapper util
            const params = {
                key,
                part: ["snippet"],
                playlistId,
            };
            pageToken ? params.pageToken = pageToken : null;
            const playlist = (yield this.google.youtube("v3").playlistItems.list(params)).data;
            return playlist;
        });
    }
    //function handles getting a the salesforce platlists list
    static getPlaylistsList() {
        return __awaiter(this, void 0, void 0, function* () {
            const key = this.key;
            //fetch playlists list from the GoogleAPI wrapper util
            const list = (yield this.google.youtube("v3").playlists.list({
                key,
                part: ["snippet"],
                channelId: this.channelID,
            })).data;
            return list;
        });
    }
}
exports.default = PlaylistService;
PlaylistService.channelID = config_1.default.youtube.salesforce.channelID;
//initialize the class with the needed static props
PlaylistService.init(config_1.default.youtube.key, googleapis_1.google);
