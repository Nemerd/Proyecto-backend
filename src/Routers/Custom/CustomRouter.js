const { Router } = require('express');

class CustomRouter {
    constructor() {
        this.router = Router()

        this.dependencies()
        this.init()
    }

    dependencies() {
        // Usado más adelante para implementar los handlers
    }
    init() { }

    getRouter() {
        return this.router
    }

    get(path, ...callbacks) {
        this.router.get(path, this.applyCallbacks(callbacks))
    }
    post(path, ...callbacks) {
        this.router.post(path, this.applyCallbacks(callbacks))
    }
    put(path, ...callbacks) {
        this.router.put(path, this.applyCallbacks(callbacks))
    }
    delete(path, ...callbacks) {
        this.router.delete(path, this.applyCallbacks(callbacks))
    }

    applyCallbacks(callbacks) {
        return callbacks.map(callback => async (...params) => {
            try {
                await callback.apply(this, params)
            } catch (error) {
                console.log(error);
                params[1].status(500).send(error)
            }
        })
    }
}

module.exports = CustomRouter
