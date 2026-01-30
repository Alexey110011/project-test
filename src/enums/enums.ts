export const ErrorEnums = {
  GET_ERROR : 'Can\'t load products. Please, try again later.',
  POST_ERROR : 'Can\'t send data to backend. Please, try again later.',
} as const;
/*export type ErrorKeys = keyof typeof Errors; // "GET_ERROR" | "POST_ERROR"
export type ErrorValues = typeof Errors[ErrorKeys]; // string literal types*/
export const SuccessEnums = {
   POST_SUCCESS : 'Your data were succesfully sent to server.',
} as const;