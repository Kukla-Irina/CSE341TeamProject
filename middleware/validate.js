const validator = require('../helpers/validate');

const saveClient = (req, res, next) => {
    const validationRule = {
        firstName: 'required|string',
        address: 'required|string',
        email: 'required|email',
        phone: 'required|string',
        lastName: 'required|string'
    };
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412).send({
                success: false,
                message: 'Validation failed',
                data: err
            });
        } else {
            next();
        }
    });
};

const saveCake = (req, res, next) => {
    const validationRule = {
        flavor: 'required|string',
        frosting: 'required|string',
        toppings: 'required|string',
        topping1: 'required|string',
        topping2: 'required|string',
        numberOfLayers: 'required|string',
        nutrients: 'required|string',
        kcal: 'required|string',
        fat: 'required|string',
        sugar: 'required|string'
    };
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412).send({
                success: false,
                message: 'Validation failed',
                data: err
            });
        } else {
            next();
        }
    });
};

const saveOrder = (req, res, next) => {
    const validationRule = {
        number: 'required|string',
        client: 'required|string',
        type: 'required|string',
        date: 'required|string',
        payment: 'required|string'
    };
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412).send({
                success: false,
                message: 'Validation failed',
                data: err
            });
        } else {
            next();
        }
    });
};

const saveSweet = (req, res, next) => {
    const validationRule = {
        type: 'required|string',
        quantity: 'required|string'
    };
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412).send({
                success: false,
                message: 'Validation failed',
                data: err
            });
        } else {
            next();
        }
    });
};


module.exports = {
    saveClient, saveCake, saveOrder, saveSweet
};