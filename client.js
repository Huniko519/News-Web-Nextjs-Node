import clientComponents from './components/clientComponents';
import geo from './utils/geo-detect';

/**
 * Client Setup
 * @constructor
 */
(async () => {
  // We must have the client geo before setup so that we can enfore CMP
  await geo();
  // eslint-disable-next-line no-unused-vars
  Object.entries(clientComponents).map(([component, init]) => init());
})();
