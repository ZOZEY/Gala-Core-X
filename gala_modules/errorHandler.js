/**
 * Copyright 2019 Galaktikos
 * All rights reserved.
 */

let modules;
module.exports = {
    initialize(o) {
        modules = o
    },
    missingModule(o) {
        throw `Error 001: Module '${o}' not found`
    },
    importFailure(o, r) {
        console.log(`${o}\nError 010: Module '${r}' failed to import correctly`)
    },
    findFailure(o, r) {
        console.log(`${o}\nError 011: Could find file '${r}'`)
    },
    readError(o, r) {
        console.log(`${o}\nError 012: Could not read from '${r}'`)
    },
    writeError(o, r) {
        console.log(`${o}\nError 013: Could not write to '${r}'`)
    },
    loginFailure(o) {
        throw `${o}\nError 020: Could not log into bot`
    },
    encryptionError(o) {
        throw `${o}\nError 030: Encryption failed to complete`
    },
    decryptionError(o) {
        throw `${o}\nError 031: Decryption failed to complete`
    },
    runError(o, r) {
        throw `${o}\nError 040: Could not run '${r}'`
    }
};