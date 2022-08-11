tp = window["tp"] || [];

const paidSubscriptionCacheKey = 'paid-sub-name'
const keyAdded = 'newsletter_added';
const keyRemoved = 'newsletter_removed';


var rm_trans = {};

/**
 * Global function to parse date from long
 * 
 * @param {*} datelong 
 * @returns 
 */
var parseDate = (datelong) => {
    const date = new Date(datelong * 1000);
    return `${date.getFullYear()}-${(`0${date.getMonth() + 1}`).slice(-2)}-${(`0${date.getDate()}`).slice(-2)}`;
};

// Set tags for Piano
let tags = [];
if (window.PageContext.post && ['post', 'post_sponsored'].includes(window.PageContext.post.type)) {
    tags = ['article'];

    // add categories
    tags = tags.concat(window.PageContext.post.breadcrumbs?.map((term) => term.slug));
    tp.push(['setContentSection', window.PageContext.post.breadcrumbs[window.PageContext.post.breadcrumbs.length - 1].slug]);

    // add topics
    tags = tags.concat(window.PageContext.post.topics?.map((term) => term.slug));

    // add labels
    tags = tags.concat(window.PageContext.post.labels?.map((term) => term.slug));

    // add authors
    tags = tags.concat(window.PageContext.post['co-authors']?.map((author) => author.user_nicename));
    tp.push(['setContentAuthor', window.PageContext.post['co-authors'][0].user_nicename]);

    // set pub date
    tp.push(["setContentCreated", window.PageContext.post.date_gmt]);
} else if (window.PageContext.categories) {
    tags = ['channel', window.PageContext.categories[0].slug];
} else if (window.PageContext.tags) {
    tags = ['channel', window.PageContext.tags[0].slug];
} else if (window.PageContext.authors) {
    tags = ['author', window.PageContext.authors[0].slug];
} else {
    tags = ['page'];
}

// is a puzzles page puzzles
if (window.location.pathname.includes('/puzzles/')) {
    tags.push('puzzle');
}

tp.push(['setTags', tags]);

window.addEventListener('scroll', () => {
    setTimeout(() => {
        const tpModal = document.querySelector('.tp-modal');
        if (tpModal) {
            if (tpModal.style.position !== 'fixed') {
                tpModal.style.position = 'fixed'
            }
        }
    }, 1500);

}, { once: true })

// There are multiple Login buttons that will load the Piano login modal
const loginButtons = document.querySelectorAll('.i__header__account_login');
loginButtons.forEach((loginButton) => {
    loginButton.addEventListener('click', (e) => {
        e.preventDefault();
        if (window.gtag) {
            gtag('event', 'header click', {
                event_category: 'button_header',
                event_label: 'log in',
            });
        }
        if (window.tp) {
            window.tp.pianoId.show();
        }
    });
});

// Log user out when clicking Log Out button
const logOutButtons = document.querySelectorAll('.inews__logout');
logOutButtons.forEach((logOutButton) => {
    logOutButton.addEventListener('click', (e) => {
        e.preventDefault();
        if (window.tp) {
            NewsLetterCookiesUtil.removeAllCookies();
            window.tp.pianoId.logout();
        }
    });
});

/**
 * Handling paid newsletter name from localStorage (if present), and 
 * marking the newsletter as selected after sending sailthru name.
 */
const processPaidSubscription = (userData) => {
    let listName = window.localStorage.getItem(paidSubscriptionCacheKey)
    if (listName && userData) {
        const xhr = new XMLHttpRequest();
        let queryParams = `?email=${userData.email}`;
        queryParams += `&${listName}=1`;
        xhr.open('POST', `${window.PageContext.publicApiUrl}/newsletter/subscriber/${queryParams}`);
        xhr.send();

        xhr.onload = () => {
            const checkbox = document.querySelector(`input[name='${listName}'][type='checkbox']`);
            if (checkbox) {
                checkbox.checked = true;
            }
            window.localStorage.removeItem(paidSubscriptionCacheKey);
        }
    }
}

/**
 * Check if current page is /my-account
 * 
 * @returns boolean
 */
const isMyAccountPage = () => {
    return (window.PageContext.post?.slug === 'my-account'
        || window.location.pathname === '/my-account')
}

// Handle state changes if a user is logged in or out
tp.push(['init', () => {
    if (tp.pianoId.isUserValid()) {
        let pianoRID = 'BR3GN1WU';
        if (window.adverts?.config?.piano?.rid) {
            pianoRID = window.adverts.config.piano.rid;
        }

        // Check and create newsletter cookies for Piano
        NewsLetterCookiesUtil.checkNewsletterCookiesOnLoad(tp.user.getProvider().getUser());
        window.tp.api.callApi('/access/list', {}, ({ data }) => {

            // hide subscribe button for people who are paying subscribers
            if (data.some(s => s.resource?.rid === pianoRID)) {
                document.querySelectorAll('.i__header__account_register').forEach((el) => el.style.visibility = 'collapse');
                document.querySelectorAll('.newsletter-management-card__subscribe').forEach((el) => el.style.display = 'none');
                document.body.classList.add('subscribed');

                // If user is subscribed and on my account page, check localStorage for paid newsletters
                if (isMyAccountPage() && (data && data.length > 0)) {
                    processPaidSubscription(data[0].user);
                }

            } else {
                document.body.classList.add('registered');
                if (isMyAccountPage()) {
                    // Deleting localStorage key for paid newsletters if not fully subscribed
                    window.localStorage.removeItem(paidSubscriptionCacheKey);
                }
            }
            // disable Taboola for all registered/subscribed users
            const taboolaElement = document.getElementById('taboola-below-article-thumbnails---inews');
            if (taboolaElement) {
                taboolaElement.remove();
                document.querySelectorAll('.inews__more-from').forEach((el) => el.style.display = 'block');
            }
        });
    } else {
        document.body.classList.add('anonymous');
    }

    tp.pianoId.init({
        loggedOut() {
            window.location = '/';
        },
    });
}]);

/**
 * Sending free newsletters to sailthru after user registration.
 * Request is sent to sailthru only if editorialemails checkbox is not disabled by user
 * 
 * @param {*} reloadPage If true, page will be reloaded after sailthru request
 */
const sendFreeNewsletters = (reloadPage) => {
    tp.pianoId.loadExtendedUser({
        extendedUserLoaded(data) {
            let allowEditorialEmails = true;
            // eslint-disable-next-line
            for (const i in data.custom_field_values) {
                if (data.custom_field_values[i].field_name === 'editorialemails'
                    && data.custom_field_values[i].value === 'true') {
                    allowEditorialEmails = false;
                }
            }

            if (allowEditorialEmails) {

                let queryParams = `?email=${data.email}`;
                queryParams += `&first_name=${data.first_name}`;
                queryParams += `&last_name=${data.last_name}`;
                queryParams += `&Piano_Customer_ID=${data.uid}`;
                queryParams += `&allowEditorialEmails=${allowEditorialEmails}`;
                queryParams += `&Piano_Registration_Date=${new Date((new Date(0)).setUTCSeconds(data.updated))}`;
                // eslint-disable-next-line
                if (window.newsletterLists) {
                    for (const list in newsletterLists) {
                        const approvedLists = ['inews', 'Politics', 'Opinion'];
                        if (approvedLists.includes(newsletterLists[list].sailThruName)) {
                            queryParams += `&list[${newsletterLists[list].sailThruName}]=1`;
                        }
                    }
                }
                const xhr = new XMLHttpRequest();
                xhr.onload = () => {
                    if (reloadPage === true) {
                        window.location.reload();
                    }
                }
                xhr.open('POST', `${window.PageContext.publicApiUrl}/newsletter/subscriber/${queryParams}`);
                xhr.send();
            }
        },
        formName: 'RegistrationFields',
    });
}

// Reload Page on user login
tp.push(['addHandler', 'loginSuccess', function (e) {

    // If user is logged in after registration on subscribe page.
    if (e.registration === true && e.source === 'OFFER') {
        sendFreeNewsletters(false)
    }
    if (e.source !== "PIANOID") {
        tp.api.callApi('/access/list', {}, (data) => {
            if (typeof data.data !== 'undefined') {
                for (const i in data.data) {
                    if (data.data[i].granted) {
                        tp.offer.close();
                    }
                }
            }
        });
    } else if (!e.registration) {
        window.location.reload();
    }
}
]
);

tp.push(["addHandler", "checkoutClose", function () {
    if (window.location.pathname !== '/subscribe') {
        setTimeout(function () {
            window.location.reload();
        }, 500);
    }
}]);

/**
 * Global function to validate monthly vs annual subscription
 * 
 * @param {*} sub  data from piano access list
 * 
 * @returns 
 */
var getSubscriptionInterval = (sub) => {
    if (sub && sub.term) {
        return (sub.term.name.indexOf('Monthly') > -1) ? 'monthly' : 'annual';
    }
}

/**
 * Sending GA events for successful checkout/Subscription (thank you popup)
 * 
 * @param {*} convertion  Piano conversation object
 * @param {*} productInfo  term information from piano access list
 */
const initCheckoutGAEvents = (convertion, productInfo) => {
    if (convertion) {
        const { termConversionId, chargeAmount, promotionId, termId } = convertion;
        const data = {
            transaction_id: termConversionId,
            value: chargeAmount,
            affiliation: 'subscription page',
            currency: 'GBP',
            coupon: promotionId
        }

        const action = getSubscriptionInterval(productInfo);
        const variant = 'digital';

        // Product information
        data.items = [{
            "id": termId,
            "name": productInfo.term?.name,
            category: action,
            variant,
            "quantity": 1,
            "price": chargeAmount
        }];

        gtag('event', 'purchase', data);

        gtag('event', action, {
            event_category: 'new subscription',
            event_label: variant,
        });
    }
}


tp.push(["addHandler", "checkoutComplete", function (conversion) {
    rm_trans = {
        affiliateConfig: { ranMID: "48016", discountType: "item", includeStatus: "false", taxRate: 0, removeTaxFromDiscount: true },

        orderid: conversion.termConversionId,
        currency: "GBP",
        conversionType: conversion.type,
        customerID: conversion.uid,
        discountCode: conversion.promotionId,
        taxAmount: 0,
        lineitems: [{
            quantity: 1,
            unitPrice: conversion.chargeAmount,
            unitPriceLessTax: conversion.chargeAmount,
            SKU: conversion.termId,
        }]
    };

    tp.api.callApi('/access/list', {}, (data) => {
        if (typeof data.data !== 'undefined') {
            rm_trans.customerStatus = data.data.length === 1 ? "Subscription Status New" : "Subscription Status Existing";
            const info = data.data[0];
            rm_trans.lineitems[0].productName = info.term.name;
            rm_trans.discountAmount = 0;
            initCheckoutGAEvents(conversion, info);
        }

        // Loading rakuten datalayer dynamically
        const rakutenScript = document.createElement('script');
        rakutenScript.src = "/static/rakuten-datalayer.js";
        rakutenScript.async = true;
        rakutenScript.type = 'text/javascript';
        document.head.appendChild(rakutenScript);
    });
}]);

// Registration callback to send data to Sailthru and elsewhere
tp.push(['init', () => {
    tp.pianoId.init({
        registrationSuccess() {
            if (fbq) { fbq('track', 'Complete Registration'); }
            // Trigger Microsoft Ads tracking after registration
            window.uetq = window.uetq || [];
            window.uetq.push('event', 'user_registration', {});

            sendFreeNewsletters(true)
        },
    });
}]);


// Capture submissions to the Piano newsletter signup form
tp.push(['addHandler', 'customEvent', function (event) {
    let newsLetterCategory = "";
    let source;
    let isSplash = false;
    if (event.eventName === "newsletter-submit-button-cat") {
        /* Preparing sailthru and source information for Piano splashes */
        if (event.params.category !== undefined) {
            newsLetterCategory = window.getEmailListByClassName(event.params.category);
        }
        let pathName = window.location.pathname;
        if (pathName.length > 1) {
            pathName = pathName.replace("/", "website:")
            pathName = pathName.replace(/\//g, ":")
            source = pathName;
        } else {
            source = "website:home"
        }
        isSplash = true;
    } else if (event.eventName === 'newsletter-submit-button') {
        /* Preparing sailthru and source information for in-artcle submition */
        const container = document.querySelector('#inews__email-signup')
        // Fetching source from data attribute
        source = container.dataset.source;
        let primaryCategoryId = false
        // Getting primary category from Post, if on post page
        if (window.PageContext.post) {
            window.PageContext.post.breadcrumbs.forEach((breadcrumb) => {
                if (breadcrumb?.primary === true) {
                    primaryCategoryId = breadcrumb.term_id;
                }
            });
        }
        newsLetterCategory = window.getEmailList(window.PageContext.post.categories, primaryCategoryId);
    }

    // Triggering Microsoft Ads tracking for Piano newsletter signup form
    window.uetq = window.uetq || [];
    window.uetq.push('event', 'signup', { "event_category": "newsletter" });

    // Passing Piano newsletter signup form data to Sailthru
    let email = "";
    if (typeof event.params.userEmail !== 'undefined') {
        email = event.params.userEmail;

        const xhr = new XMLHttpRequest();
        let queryParams = `?email=${email}`;
        queryParams += `&list[${newsLetterCategory.sailThruName}]=1`;
        // Adding source parameter for siulthru if available
        if (source) queryParams += `&source=${source}`
        xhr.open('POST', `${window.PageContext.publicApiUrl}/newsletter/subscriber/${queryParams}`);
        xhr.send();

        // Add new subscribed newsletter cookie for Piano
        // Only if the subscription email address is identical with logged in user's email address
        if (tp.user.isUserValid()) {
            if (tp.user.getProvider().getUser().email === email) {
                NewsLetterCookiesUtil.createNewsletterCookie(newsLetterCategory.sailThruName);
            }
        }

        // Custom event to identify in-article newsletter submit click
        const subscribeEvent = new CustomEvent("pn-newsletter-submit-button", {
            detail: {
                sailthruName: newsLetterCategory.sailThruName,
                email,
                isSplash
            }
        })
        window.dispatchEvent(subscribeEvent);
    }
}]);

// Password reset page logic
if (window.PageContext.post?.slug === 'reset-password'
    || window.location.pathname === '/reset-password') {
    tp.push(['init', () => {
        // Password can be reset only if user is anonymous
        if (!tp.user.isUserValid()) {
            // If URL has reset_token parameter
            const tokenMatch = window.location.search.match(/reset_token=([A-Za-z0-9]+)/);
            if (tokenMatch) {
                const token = tokenMatch[1];
                // Present password reset form with the found token
                tp.pianoId.show({
                    'resetPasswordToken': token,
                    'loggedIn': () => {
                        // Once user logs in - refresh the page
                        window.location.reload();
                    },
                });
            }
        }
    }]);
}

const filterNewsLetterName = (name) => {
    return name.substring(name.indexOf('[') + 1, name.length - 1)
}

/**
 * Event handler for paid newsletters subscribe now button to store selected newsletter in localStorage
 */
const bindPaidNewsletterHandler = () => {
    const subscritionButtons = document.querySelectorAll('.newsletter-management-card__subscribe')
    if (subscritionButtons && subscritionButtons.length > 0) {
        subscritionButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault()
                const aEl = e.target.parentElement
                window.localStorage.setItem(paidSubscriptionCacheKey, aEl.dataset.name)
                if (window.gtag) {
                    const listName = filterNewsLetterName(aEl.dataset.name);
                    let label = listName;
                    if (aEl.dataset.label) {
                        label = `${label}_-_${aEl.dataset.label.replace(/ /g, '-').replace("'", '')}`;
                    }
                    label = label.toLowerCase();

                    gtag('set', 'dimension25', `subscriber_newsletters_-_${label}`);
                    gtag('event', `subscribe now click`, {
                        event_category: 'subscriber newsletters',
                        event_label: label,
                    });
                }

                window.location.href = aEl.href;
            })
        })
    }
}

// my-account page handling
if (isMyAccountPage()) {

    bindPaidNewsletterHandler()
    getSailthruCheckBoxes = (sailthruResponse) => {
        if (sailthruResponse.response.lists) {
            const currentListNames = Object.keys(sailthruResponse.response.lists);
            window.sailthruList = [...currentListNames]
            // eslint-disable-next-line
            for (const sailthruListName of currentListNames) {
                const checkbox = document.querySelector(`input[name='list[${sailthruListName}]'][type='checkbox']`);
                if (checkbox) {
                    checkbox.checked = true;
                }
            }
        }
    }


    /**
     * Populate the newsletter preference center form
     *
     * @param {*} userData
     */
    populateNewsletterForm = (userData) => {
        if (document.getElementsByClassName('inews__newsletter-management').length > 0) {
            document.getElementById('email').value = userData.email;
            if (userData.email.length > 0) {
                document.getElementById('email').readOnly = true;
            }
            document.getElementById('first_name').value = userData.firstName;
            document.getElementById('last_name').value = userData.family_name;
            document.getElementById('Piano_Customer_ID').value = userData.uid;
            document.getElementById('allowEditorialEmails').value = true;
            let url = `${window.PageContext.publicApiUrl}/newsletter/subscriber/?email=${userData.email}`;
            const xhr = new XMLHttpRequest();
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    const sailthruResponse = JSON.parse(xhr.responseText);
                    this.getSailthruCheckBoxes(sailthruResponse);
                }
            };
            xhr.open('GET', url);
            xhr.send();

        }
    }


    const that = this;
    tp.push(['init', () => {
        tp.pianoId.init({
            loggedIn(data) {
                that.populateNewsletterForm(data.user);
                document.querySelector('.management__tab-button.piano .hide-on-mobile').innerHTML = 'Manage Account';
                tp.myaccount.show({
                    displayMode: 'inline',
                    containerSelector: '.piano-management',
                });
            },
        });
        // if not a valid user, check for email address in URL params
        if (!tp.user.isUserValid()) {
            const urlParams = new URLSearchParams(window.location.search);
            const emailParam = urlParams.get('email');
            if (emailParam) {
                const userData = {
                    email: emailParam,
                };
                that.populateNewsletterForm(userData);
            }
            // If not logged in, bind the Piano modal to the "Create Account" tab
            const createAccountButton = document.getElementById('management__tab-piano-account');
            if (createAccountButton) {
                createAccountButton.addEventListener('click', (e) => {
                    e.preventDefault();
                    if (window.tp) {
                        window.tp.pianoId.show({ screen: 'register' });
                    }
                });
            }
        }
    }]);

    // Attempt to fetch existing subscriptions from manual input
    let newsletterDebounce;
    const emailField = document.getElementById('email');
    emailField.oninput = function () {
        const submitBtn = document.getElementById('inews__email-signup__submit__button');
        submitBtn.setAttribute('disabled', 'true');

        // Check if entered email is valid
        if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(emailField.value)) {
            return;
        }

        clearTimeout(newsletterDebounce);
        newsletterDebounce = setTimeout(() => {
            const submitBtn = document.getElementById('inews__email-signup__submit__button');
            submitBtn.setAttribute('disabled', 'true');
            const xhr = new XMLHttpRequest();
            xhr.open('GET', `${window.PageContext.publicApiUrl}/newsletter/subscriber/?email=${encodeURIComponent(emailField.value)}`, true);
            xhr.onreadystatechange = function () {
                if (this.readyState === XMLHttpRequest.DONE) {
                    if (this.status === 200) {
                        const response = JSON.parse(xhr.responseText);
                        if (typeof (response.response) === 'object' && typeof (response.response.lists) === 'object') {
                            const lists = Object.keys(response.response.lists);
                            for (let i = 0; i < lists.length; i++) {
                                const checkbox = document.querySelector(`input[name="list[${lists[i]}]"].newsletter-management__list-checkbox`);
                                if (checkbox !== null) {
                                    checkbox.checked = true;
                                }
                            }
                        }
                    }
                    setTimeout(() => {
                        submitBtn.removeAttribute('disabled');
                    }, 2000);
                }
            };
            xhr.send();
        }, 100);
    };
}

const filterNewsLetter = (sailthruname) => {
    return (Object.values(newsletterLists).filter((value) =>
        value.sailThruName === sailthruname
    ))[0]
}

// Don't open a new tab and redirect to /my-account page from Splash piano template
tp.push(["addHandler", "checkoutCustomEvent", function (event) {
    if (event.eventName === "splashSubscribeButton") {
        localStorage.setItem(paidSubscriptionCacheKey, event.params.sailthruname);

        // Triggering a google analytics event
        const listName = filterNewsLetterName(event.params.sailthruname);
        const newsletter = filterNewsLetter(listName)
        let label = listName
        if (newsletter) {
            label = `${label}_-_${newsletter.list.replace(/ /g, '-').replace("'", '')}`;
        }
        label = label.toLowerCase();
        if (window.gtag) {
            gtag('set', 'dimension25', `subscriber_newsletters_-_${label}`);
            gtag('event', `subscribe now click`, {
                event_category: 'subscriber newsletters',
                event_label: label,
            });
        }

        window.location.href = "/my-account?ico=button_-_newsletter_-_subscribe";
    }
}]);

/* Hide newsletter container with min-height if it doesn't contain an iframe */
const nlSignuContainer = ['.inews__email-signup', '.inews__email-signup-cat']
    .map(sel => document.querySelectorAll(sel));

const checkIframeForPiano = (el) => {
    const iframe = el.querySelector('iframe');
    if (!iframe) {
        el.style.display = 'none';
    }
}

if (nlSignuContainer) {
    setTimeout(() => {
        nlSignuContainer.forEach((elList) => {
            if (elList) {
                elList.forEach(checkIframeForPiano);
            }
        })
    }, 3000);
}


// Enable cross-domain linking for GA: https://docs.piano.io/integrating-with-google-analytics/
tp.push(["init", function () {
    tp.enableGACrossDomainLinking('UA-128755582-162');
}]);

const sendNewsletterGAEvents = (action, category, label) => {
    gtag('event', action, {
        event_category: category,
        event_label: label,
    });
}

/**
 * Sending FB custom event on addition of a newsletter subscription on myaccount page
 */
const sendFBCustomEvent = () => {
    if (fbq) {
        const addeditems = localStorage.getItem(keyAdded);
        if (addeditems) {
            const payload = { NL_selected: addeditems.replace(/,/g, ';') };
            if (document.getElementById('email')?.value.length > 0) {
                fbq('trackCustom', 'Newsletter_subscription', payload);
            }
        }
    }
}

/**
 * Updating cookies for newsletters for Piano
 * Adding new cookies to added newsletters and removing cookies for removed newsletters
 */
const updateNewsletterCookies = () => {
    // Adding newsletters
    const addedItems = localStorage.getItem(keyAdded) || '';
    addedItems.split(',').forEach(item => NewsLetterCookiesUtil.createNewsletterCookie(item));

    // Removing newsletters
    const removedItems = localStorage.getItem(keyRemoved) || '';
    removedItems.split(',').forEach(item => NewsLetterCookiesUtil.removeNewsletterCookie(item));
}


const myAccountNewsletterGAHandler = () => {
    let from = "";
    try {
        from = new URLSearchParams(window.location.search).get("ico");
    } catch (err) { }
    // Update newsletter cookies for Piano
    updateNewsletterCookies();
    if (localStorage.getItem(keyAdded)) {
        // Check if user is logged in, if not, check if the email exists in sailthru
        if (!tp.user.isUserValid()) {
            let tmpEmail = document.getElementById('email');
            if (tmpEmail) {
                const url = `${window.PageContext.publicApiUrl}/newsletter/subscriber/?email=${tmpEmail.value}`;
                const xhr = new XMLHttpRequest();
                xhr.onreadystatechange = () => {
                    if (xhr.readyState === 4) {
                        const sailthruResponse = JSON.parse(xhr.responseText);
                        const tmpNewsletterName = (sailthruResponse.success === true) ? 'newsletter_topic-addition' : 'newsletter_new-subscription';
                        sendNewsletterGAEvents(from, tmpNewsletterName, localStorage.getItem(keyAdded));
                        sendFBCustomEvent();
                        localStorage.removeItem(keyAdded);
                    }
                };
                xhr.open('GET', url);
                xhr.send();
            }
        } else {
            sendNewsletterGAEvents(from, 'newsletter_topic-addition', localStorage.getItem(keyAdded));
            sendFBCustomEvent();
            localStorage.removeItem(keyAdded);
        }
    }
    if (localStorage.getItem(keyRemoved)) {
        sendNewsletterGAEvents(from, 'newsletter_topic-removal', localStorage.getItem(keyRemoved));
        localStorage.removeItem(keyRemoved);
    }
}

/**
 * Prepare array or add item from array
 * 
 * @param {*} list 
 * @param {*} item 
 * @returns 
 */
const addNewsletterInList = (list, item) => {
    if (list) {
        if (!list.find(name => name === item)) {
            list.push(item);
        }
        return list;
    }
    return [item];
}

/**
 * Remvoe an item from array
 * 
 * @param {*} list 
 * @param {*} item 
 * @returns 
 */
const removeNewsletterInList = (list, item) => {
    if (list) {
        const index = list.indexOf(item);
        if (index > -1) {
            list.splice(index, 1);
        }
        return list;
    }
}

/**
 * Handling comma saperated value in locastorage for added and removed newsletters.
 * 
 * @param {*} name newsletter name from checkbox.name.
 * @param {*} isAdding boolean for add or remove.
 */
const updateNewsletterStateInLocalStore = (name, isAdding) => {
    let addedList = localStorage.getItem(keyAdded) ? localStorage.getItem(keyAdded).split(',') : undefined;
    let removedList = localStorage.getItem(keyRemoved) ? localStorage.getItem(keyRemoved).split(',') : undefined;

    /**
     * To make sure we have the defaul state which we got on page load.
     * If a newsletter is added on page load, should not be listed as added if removed and checked again.
     * Same goes for removing.
     * 
     * For Adding: Remove if present in removed list or Add in added list
     * For Removing: Remove if present in added list or Add in removed list
     */
    if (isAdding) {
        if (removedList && removedList.indexOf(name) > -1) {
            removedList = removeNewsletterInList(removedList, name);
        } else {
            addedList = addNewsletterInList(addedList, name);
        }
    } else {
        if (addedList && addedList.indexOf(name) > -1) {
            addedList = removeNewsletterInList(addedList, name);
        } else {
            removedList = addNewsletterInList(removedList, name);
        }
    }
    removedList && localStorage.setItem(keyRemoved, removedList.toString());
    addedList && localStorage.setItem(keyAdded, addedList.toString());
}

/**
 * Event handler for newsletter checkbox change.
 * 
 * @param {*} e Event
 */
const newsletterChangehandler = (e) => {
    const checkbox = e.target;
    updateNewsletterStateInLocalStore(filterNewsLetterName(checkbox.name), checkbox.checked);
}

/**
 * If on my account page, add listener for newsletter checkboxes and submission button.
 */
if (isMyAccountPage()) {
    const newsletterSubmitAcount = document.querySelector('.newsletter-management__footer__submit');
    const newsletterCheckboxes = document.querySelectorAll('.newsletter-management__list-checkbox');

    // Removing state if present on page load.
    localStorage.getItem(keyAdded) && localStorage.removeItem(keyAdded);
    localStorage.getItem(keyRemoved) && localStorage.removeItem(keyRemoved);

    // Event listener for checkbox on change.
    if (newsletterCheckboxes) {
        newsletterCheckboxes.forEach(checkbox => checkbox.addEventListener('change', newsletterChangehandler))
    }

    // Event listener for newsletter submission event.
    if (newsletterSubmitAcount) {
        newsletterSubmitAcount.addEventListener('click', myAccountNewsletterGAHandler);
    }
}


//Load the Piano SDK 
let sdkURL = 'https://sandbox.tinypass.com/xbuilder/experience/load?aid=Z1d261iksu';

if (window.location.host === 'inews.co.uk') {
    sdkURL = 'https://experience.tinypass.com/xbuilder/experience/load?aid=Xi7fMnt7pu';
}

const script = document.createElement('script');
script.src = sdkURL;
script.async = true;
script.type = 'text/javascript';
document.head.appendChild(script);