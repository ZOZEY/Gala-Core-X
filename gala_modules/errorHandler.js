/**
 * Copyright 2019 Jordan Owens
 * All rights reserved.
 */

let modules;
module.exports = {
    initialize(o) {
        modules = o
    },
    missingModule(o) {
        throw 'Error 001: Module "' + o + '" not found'
    },
    importFailure(o, r) {
        console.log(o + '\nError 002: Module "' + r + '" failed to import correctly')
    },
    readError(o, r) {
        console.log(o + '\nError 003: Could not read from "' + r + '"')
    },
    writeError(o, r) {
        console.log(o + '\nError 004: Could not write to "' + r + '"')
    },
    findFailure(o, r) {
        console.log(o + '\nError 005: Could find file "' + r + '"')
    },
    loginFailure(o) {
        throw o + "\nError 006: Could not log into bot"
    },
    encryptionError(o) {
        throw o + "\nError 007: Encryption failed to complete"
    },
    decryptionError(o) {
        throw o + "\nError 008: Decryption failed to complete"
    }
};