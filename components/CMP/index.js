import './styles.scss';
import { queryParams } from '../../utils/URL';
import { shouldConsentManagementBeEnforced, createProvisionalCMP, isCCPAJurisdiction } from './utils';

const params = queryParams();

let CCPA_VERSION = '2.8.18-ccpa-30-inews';

if (params.ccpa_version) {
  CCPA_VERSION = params.ccpa_version;
}

const toggleSettingsLinks = document.getElementsByClassName('cmp-settings-toggle');
[...toggleSettingsLinks].forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    if (global.__tcfapi) {
      window.openUi('Level2');
    } else if (global.__uspapi) {
      global.__uspapi.a.push(['openSettings', null, () => {}]);
    }
  }, false);
});

/**
 * CMP framework component to be rendered on the client
 * @constructor
 */
const CMP = async () => {
  try {
    // Inject CMP script if it is required in this geo
    if (shouldConsentManagementBeEnforced()) {
      if (!isCCPAJurisdiction()) return;

      createProvisionalCMP();

      const scriptBase = `https://cmp.dmgmediaprivacy.co.uk/${CCPA_VERSION}`;

      const script = document.createElement('script');

      script.dataset.render = false;
      script.id = 'mol-ads-cmp';
      script.src = `${scriptBase}/iife/mol-ads-cmp.min.js`;

      document.head.appendChild(script);
    }
  } catch (error) {
    // eslint-disable-next-line
    console.warn('[inews] Couldn\'t init CMP ', error);
  }
};

export default CMP;
