export const isCCPAJurisdiction = () => global.PageCriteria.geo === 'US';
export const isGDPRJurisdiction = () => global.PageCriteria.inEU;

export const getCmpName = () => (isCCPAJurisdiction() ? '__uspapi' : '__cmp');
export const getCmp = () => global[getCmpName()];
// eslint-disable-next-line no-return-assign
export const setCmp = (cmp) => (global[getCmpName()] = cmp);
export const shouldConsentManagementBeEnforced = () => isCCPAJurisdiction() || isGDPRJurisdiction();

export const hasConsent = () => localStorage.getItem('mol.ads.cmp.consent') === 'yes';

const CCPA_COMMANDS_TO_CACHE = {
  getUSPData: '__cachedUSPData',
};

const GDPR_COMMANDS_TO_CACHE = {
  getConsentData: '__cachedGetConsentData',
  getVendorConsents: '__cachedVendorConsents',
};

const CACHED_CMP_COMMANDS = () => (
  isCCPAJurisdiction() ? CCPA_COMMANDS_TO_CACHE : GDPR_COMMANDS_TO_CACHE
);

/**
 * Function to cache certain CMP commands in localstorage
 */
export const updateCache = async () => {
  const cmp = getCmp();
  return Promise.all(Object.entries(CACHED_CMP_COMMANDS()).map(
    ([cmd, key]) => new Promise((resolve) => {
      cmp.a.push([cmd, null, (data, success) => {
        if (success) {
          localStorage.setItem(key, JSON.stringify(data));
          resolve();
        }
      }]);
    }),
  ));
};

/**
 * Function to create a provisional __cmp / __ccpa command queue
 */
export const createProvisionalCMP = async () => {
  // eslint-disable-next-line no-multi-assign
  const cmp = global.__cmpProvisional = getCmp() || ((cmd, param, cb) => {
    const key = CACHED_CMP_COMMANDS()[cmd];
    if (key && localStorage.getItem(key)) {
      cb(JSON.parse(localStorage.getItem(key)), true);
    } else {
      getCmp().a.push([cmd, param, cb]);
    }
  });

  setCmp(cmp);

  cmp.a = cmp.a || [];

  updateCache();
  cmp('onUpdate', null, (_, success) => success && updateCache());
};
