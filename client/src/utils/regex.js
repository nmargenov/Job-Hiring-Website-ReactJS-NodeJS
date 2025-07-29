const emailRegex = /[a-z0-9]+@[a-z0-9]+\.[a-z]{2,3}/;

export function isValidEmail(email){
    return emailRegex.test(email);
}