/**
 * Copyright 2019 Jordan Owens
 * All rights reserved.
 */

const fs = require("fs");
let modules, path = require("path");
module.exports = {
    initialize(e) {
        modules = e
    },
    write(e, r) {
        fs.writeFile(e, JSON.stringify(r), r => {
            r && modules.errorHandler.writeError(r, e)
        })
    },
    read(e) {
        if (fs.existsSync(path.resolve(__dirname, e))) try {
            return require(path.resolve(__dirname, e))
        } catch (r) {
            modules.errorHandler.importFailure(r, e)
        }
    }
};