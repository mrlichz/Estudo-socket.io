import localStorage from 'local-storage';
export const baseURL = 'http://localhost:5050';
export const token = localStorage('user') ? localStorage('user').token : '';
