/**
 * Newsletter subscription cookies util
 */
const NewsLetterCookiesUtil = (function() {
    // prefix for newsletter cookies
    // _pc_ is added so Piano can read the cookies
    const newsletterCookiePrefix = '_pc_subscribed_';

    /**
     * Prepare cookie name from sailthru name for a newsletter
     * 
     * @param name
     */
    const getSubscribedCookieName = (sailthruListName) => {
        return `${newsletterCookiePrefix}${sailthruListName.replace(/ /g, '-')}`;
    }

    /**
     * Create newsletter cookie for a sailthruListname
     * 
     * @param sailthruListName
     */
    const createNewsletterCookie = (sailthruListName) => {
        const expireDate = new Date();
        expireDate.setDate(expireDate.getDate() + 7);
        CookiesUtil.setCookie(getSubscribedCookieName(sailthruListName), 'true', expireDate.toString());    
    }

    /**
     * Remove cookie for a sailthruName
     * 
     * @param sailthruName
     */
    const removeNewsletterCookie = (sailthruName) => {
        CookiesUtil.removeCookie(getSubscribedCookieName(sailthruName));
    }

    /**
     * Remove all newsletter cookies
     */
    const removeAllCookies = () => {
        /**
         * Check if a cookie is for a newsletter by comparing cookie 
         * name with newsletter prefix
         */
        const isNewsletterCookie = (cookie) => 
            CookiesUtil.getCookieName(cookie)
                .indexOf(newsletterCookiePrefix) > -1

        // Fetching and removing all newsletter cookies
        document.cookie.split(`; `)
            .filter(cookie => isNewsletterCookie)
            .map(cookie => CookiesUtil.getCookieName(cookie)) 
            .forEach(cookieName =>CookiesUtil.removeCookie(cookieName))
    }

    /**
     * On page load check if newsletter cookies exist.
     * If not, sending request to saulthru to fetch subscribed newsletters and
     * creating newsletter cookies
     */
    function checkNewsletterCookiesOnLoad(userData) {
        const createCookies = (sailthruResponse) => {
            if (sailthruResponse.response.lists) {
                for (const sailthruListName of Object.keys(sailthruResponse.response.lists)) {
                    createNewsletterCookie(sailthruListName);
                }
            }
        };
    
        if (!CookiesUtil.hasCookie(newsletterCookiePrefix)) {
            if (userData) {
                const xhr = new XMLHttpRequest();
                let queryParams = `?email=${userData.email}`;
                xhr.open('GET', `${window.PageContext.publicApiUrl}/newsletter/subscriber/${queryParams}`);
                xhr.send();
    
                xhr.onreadystatechange = () => {
                    if (xhr.readyState === 4) {
                        const sailthruResponse = JSON.parse(xhr.responseText);
                        createCookies(sailthruResponse);
                    }
                };
            }
        }
    }

    return { createNewsletterCookie, checkNewsletterCookiesOnLoad, removeNewsletterCookie, removeAllCookies };
})();
