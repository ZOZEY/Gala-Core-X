/**
 * Copyright 2019 Galaktikos
 * All rights reserved.
 */

const crypto = require("crypto"),
    algorithm = "aes-256-cbc";
let modules;
module.exports = {
    initialize(r) {
        modules = r
    },
    encrypt(r, e) {
        try {
            var t = crypto.createCipher(algorithm, e),
                o = t.update(r, "utf8", "hex");
            return o += t.final("hex")
        } catch (r) {
            modules.errorHandler.encryptionError(r)
        }
    },
    decrypt(r, e) {
        try {
            var t = crypto.createDecipher(algorithm, e),
                o = t.update(r, "hex", "utf8");
            return o += t.final("utf8")
        } catch (r) {
            modules.errorHandler.decryptionError(r)
        }
    }
};