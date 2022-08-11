// Dictionary of the editions
// Their start and end times are minute offsets for easier computation
const editions = {
  'Morning edition': {
    start: 0,
    end: 719,
  },
  'Afternoon edition': {
    start: 720,
    end: 1019,
  },
  'Evening edition': {
    start: 1020,
    end: 1439,
  },
};

/**
 * Based on the current time in London, determine which edition we are presently on
 */
const getCurrentEdition = () => {
  // Set a default
  let editionName = Object.keys(editions)[0];

  // Get the current time
  const londonDate = new Date().toLocaleString('en-US', { timeZone: 'Europe/London' });
  const now = new Date(londonDate);

  // Determine the current offset in minutes
  const minutes = (now.getHours() * 60) + now.getMinutes();

  // Find a matching edition
  Object.keys(editions).forEach((edition) => {
    if (editions[edition].start <= minutes && editions[edition].end > minutes) {
      editionName = edition;
    }
  });

  return editionName;
};

/**
 * Get the next edition's starting minutes as an offset from midnight, based on the current edition
 *
 * @param {string} currentEditionName
 */
const getNextEditionStart = (currentEditionName) => {
  let nextEditionStart = 0;
  if (editions[currentEditionName]) {
    const currentEditionIndex = Object.keys(editions).indexOf(currentEditionName);
    if (Object.keys(editions).length >= (currentEditionIndex + 1)) {
      nextEditionStart = editions[Object.keys(editions)[0]].start;
      if ((currentEditionIndex + 1) < Object.keys(editions).length) {
        nextEditionStart = editions[Object.keys(editions)[currentEditionIndex + 1]].start;
      }
    }
  }

  return nextEditionStart;
};

/**
 * Get the next edition's start time string based on the current edition
 *
 * @param {string} currentEditionName
 */
const getNextEditionTime = (currentEditionName) => {
  let nextEditionTime = '12am';

  const startMinutes = getNextEditionStart(currentEditionName);

  if (!Number.isNaN(startMinutes)) {
    let hourStart = startMinutes / 60;
    nextEditionTime = `${hourStart}am`;
    if (hourStart >= 12) {
      if (hourStart > 12) {
        hourStart -= 12;
      }
      nextEditionTime = `${hourStart}pm`;
    }
    if (hourStart === 0) {
      nextEditionTime = '12am';
    }
  }

  return nextEditionTime;
};

const init = () => {
  window.addEventListener('load', () => {
    /**
     * Update the DOM every minute to display the current edition
     */
    const updateEdition = () => {
      const editionEl = document.getElementsByClassName('inews__masthead__current-edition')[0];
      const nextEditionEl = document.getElementsByClassName('inews__masthead__next-edition')[0];

      const editionName = getCurrentEdition();
      const nextEditionTime = getNextEditionTime(editionName);

      editionEl.innerHTML = editionName;
      nextEditionEl.innerHTML = `Next edition ${nextEditionTime}`;
    };

    // Only trigger this if the masthead element is present
    if (document.getElementById('masthead')) {
      updateEdition();
      setInterval(updateEdition, (60 * 1000));
    }
  });
};


export {
  init,
  getCurrentEdition,
  getNextEditionStart,
};
