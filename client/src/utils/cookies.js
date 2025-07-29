export const setCookie = (name, value, days = 365) => {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
};

export const getCookie = (name) => {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? decodeURIComponent(match[2]) : null;
};

export const deleteDeclinedCookies = (declinedCookies) => {
    const cookies = document.cookie.split(';');

    cookies.forEach((cookie) => {
        const name = cookie.trim().split('=')[0];

        if (declinedCookies.includes(name)) {
            document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
        }
    });
};