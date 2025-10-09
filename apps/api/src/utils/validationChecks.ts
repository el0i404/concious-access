import Joi from 'joi';

export const validationSchema = Joi.object({
  date: Joi.string()
    .pattern(/^\d{4}-\d{2}-\d{2}$/)
    .error(new Error('Date must be in the format YYYY-MM-DD')),
  start_time: Joi.string()
    .pattern(/^\d{2}:\d{2}$/)
    .error(new Error('Time must be in the format HH:MM')),
});

export function hasDuplicates(array) {
  const values = array.map((option) => option.value);
  const uniqueValues = new Set(values);

  return values.length !== uniqueValues.size;
}
