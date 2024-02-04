import Joi, { CustomHelpers } from 'joi';
import dayjs from 'dayjs';

const createEditTaskValidators = Joi.object({
    title: Joi.string().min(2).max(50).required().messages({
        'string.base': 'Title must be a string.',
        'string.empty': 'Title is required.',
        'string.min': 'Title must be at least {#limit} characters long.',
        'string.max': 'Title cannot be longer than {#limit} characters.',
        'any.required': 'Title is required.',
    }),
    text: Joi.string().required().messages({
        'string.base': 'Text must be a string.',
        'string.empty': 'Text is required.',
        'any.required': 'Text is required.',
    }),
    duration: Joi.number().required().messages({
        'number.base': 'Duration must be a number.',
        'any.required': 'Duration is required.',
    }),
    order: Joi.number().required().messages({
        'number.base': 'Order must be a number.',
        'any.required': 'Order is required.',
    }),
    managerId: Joi.string().allow(null, '').messages({
        'string.base': 'Manager ID must be a string.',
    }),
    id: Joi.string().allow(null, '').messages({
        'string.base': 'ID must be a string.',
    }),
    completed: Joi.boolean().messages({
        'boolean.base': 'Completed must be a boolean.',
    }),
    deadline: Joi.custom((value: string, helpers: CustomHelpers) => {
        if (dayjs(value).isValid()) {
            return value;
        } else {
            return helpers.error('date.format');
        }
    }, 'Date format').messages({
        'date.format': 'Deadline must be a valid date.',
    }),
    apartment: Joi.string().required().messages({
        'string.base': 'Apartment must be a string.',
        'string.empty': 'Apartment is required.',
        'any.required': 'Apartment is required.',
    }),
    userId: Joi.number().required().messages({
        'number.base': 'User ID must be a number.',
        'any.required': 'User ID is required.',
    }),
}).messages({
    'any.required': 'One of the employees must be chosen.',
});

export { createEditTaskValidators };

