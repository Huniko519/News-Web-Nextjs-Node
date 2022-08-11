/**
 * Util to mange cookies
 */
const CookiesUtil = {
    
    /**
     * Add a new cookie
     * 
     * @param name
     * @param value
     * @param expires
     */
    setCookie(name, value, expires) {
        document.cookie = `${encodeURI(name)}=${encodeURI(value)};path=/;expires=${expires}`;
    },

    /**
     * Check if a cookie exists
     * 
     * @param name
     */
    hasCookie(name) {
        return document.cookie.indexOf(`; ${name}`) > -1;
    },

    /**
     * Remove a cookie
     * 
     * @param name
     */
    removeCookie(name) {
        const expireDate = new Date();
        expireDate.setDate(expireDate.getDate() - 4);
        document.cookie = `${encodeURI(name)}=${''};path=/;expires=${expireDate.toString()}`;
    },

    /**
     * Get name from a cookie
     */
    getCookieName(cookie) {
        return cookie ? cookie.split("=")?.[0] : '';
    }
}
