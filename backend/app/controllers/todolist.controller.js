'use strict';

// exports
const TodolistService = require("../services/todolist.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");
const store = require('amplify-store');

// create and save a new todolist
exports.create = async (req, res, next) => {
    if(store("username")) {
        if (!req.body?.name) {
            return next(new ApiError(400, "Name can not be empty"));
        }
        try {
            const todolistService = new TodolistService(MongoDB.client);
            const document = await todolistService.create(req.body);
            return res.send(document);
        } catch (error) {
            return next(
                new ApiError(500, "An error occurred while creating the todolist")
            );
        }
    } else {        
        return res.send("Error login")   
    }
    

        

};

// Find a single todolist with an id
exports.findOne = async (req, res, next) => {
    try {
        const todolistService = new TodolistService(MongoDB.client);
        const document = await todolistService.findById(req.params.id);
        if (!document) {
            return next(new ApiError(404, "Todolist not found"));
        }
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(
                500, `Error retrieving todolist with id=${req.params.id}`
            )
        );
    }
};

// Retrieve all todolists of a user from the database
exports.findAll = async (req, res, next) => {
    let documents = [];
    
    try {
        const todolistService = new TodolistService(MongoDB.client);
        const { name } = req.query;
        if (name) {
            documents = await todolistService.findByName(name);
        } else {
            documents = await todolistService.find({});
        }
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while retrieving todolists")
        );
    }
    
    return res.send(documents);
};

// Update a todolist by the id in the request
exports.update = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return next(new ApiError(400, "Data to update can not be empty"));
    }

    try {
        const todolistService = new TodolistService(MongoDB.client);
        const document = await todolistService.update(req.params.id, req.body);
        if (!document) {
            return next(new ApiError(404, "Todolist not found"));
        }
        return res.send({ message: "Todolist was updated successfully" });
    } catch (error) {
        return next(
            new ApiError(500, `Error updating todolist with id=${req.params.id}`)
        );
    }
};

// Delete a todolist with the specified id in the request
exports.delete = async (req, res, next) => {
    try {
        const todolistService = new TodolistService(MongoDB.client);
        const document = await todolistService.delete(req.params.id);
        if (!document) {
            return next(new ApiError(404, "Todolist not found"));
        }
        return res.send({ message: "Todolist was deleted successfully" });
    } catch (error) {
        return next(
            new ApiError(
                500, `Could not deleted todolist with id=${req.params.id}`
            )
        );
    }
};

// Delete all todolists of a user from the database
exports.deleteAll = async (req, res, next) => {
    try {
        const todolistService = new TodolistService(MongoDB.client);
        const deletedCount = await todolistService.deleteAll();
        return res.send({
            message: `${deletedCount} contacst were deleted successfully`
        });
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while removing all todolists")
        );
    }
};

// Find All complete todolists of a user
exports.findAllComplete = async (req, res, next) => {
    try {
        const todolistService = new TodolistService(MongoDB.client);
        const documents = await todolistService.findComplete();
        return res.send(documents);
    } catch (error) {
        return next(
            new ApiError(
                500, "An error occurred while retrieving complete todolists"
            )
        );
    }
};

// 
exports.findAllTodolistByUer = async (req, res, next) => {
    let documents = [];
    
    try {
        const todolistService = new TodolistService(MongoDB.client);
        const { name } = req.query;
        if (name) {
            documents = await todolistService.findByName(name);
        } else {
            documents = await todolistService.findAllTodolistByUer();
        }
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while retrieving todolists")
        );
    }
    
    return res.send(documents);
}