import { body } from 'express-validator';

export const checkValidFields = [
  body('name', 'Name is required').not().isEmpty(),
  body('description', 'Description is required').not().isEmpty(),
  body('status', 'Status is required').not().isEmpty(),
];
