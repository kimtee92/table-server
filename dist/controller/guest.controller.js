"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var guest_1 = require("../model/guest");
var GuestController = /** @class */ (function () {
    function GuestController() {
        this.addGuest = function (m) {
            console.log(m);
            var guest = new guest_1.default(m);
            guest.save(function (err) {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log('done');
                }
            });
        };
    }
    GuestController.prototype.allGuest = function () {
        guest_1.default.find(function (err, guests) {
            if (err) {
                return "Error!";
            }
            else {
                return guests;
            }
        });
    };
    return GuestController;
}());
exports.GuestController = GuestController;
