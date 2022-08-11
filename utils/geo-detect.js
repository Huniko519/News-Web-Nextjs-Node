const GEO_LOOKUP_TIMEOUT = 2000;

const dev = process.env.NODE_ENV === 'development';

const scriptBase = (dev || global.location?.host === 'inews.co.uk')
  ? 'inews.co.uk'
  : 'inewsint.co.uk';

export const scriptUrl = `//${scriptBase}/geo/locationjson-v1.3.html`;

/* eslint-disable no-async-promise-executor *//* @TODO: @rd13 to confirm eslint-disable */
export default () => new Promise(async (resolve) => {
  // Default / fallback geo incase lookup fails
  let PageCriteria = {
    geo: 'GB',
    region: '',
    city: '',
    inEU: true,
  };

  // Don't break anything if geo lookup fails
  try {
    const response = await Promise.race([
      fetch(scriptUrl),
      new Promise((reject) => setTimeout(() => reject(new Error('Request timeout')), GEO_LOOKUP_TIMEOUT)),
    ]);

    const {
      Country, REGION_CODE, CITY, INEU,
    } = await response.json();

    PageCriteria = {
      geo: Country,
      region: REGION_CODE,
      city: CITY,
      inEU: INEU,
    };
  } catch (error) {
    /* eslint-disable-next-line no-console */
    console.log('Geo lookup failed, using fallback geo.', error);
  }

  global.PageCriteria = PageCriteria;
  resolve(PageCriteria);
});
