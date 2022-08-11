export const newsletterLists = {
  default: {
    list: 'The Essential',
    frequency: 'Mon-Sun',
    desc: 'A curated daily round-up of news, culture, sport and more.',
    className: 'essential',
    sailThruName: 'inews',
    categories: [],
    sample: '',
    hasLogo: false,
    isNew: false,
  },
  politics: {
    list: 'Waugh on Politics',
    frequency: 'Mon-Fri',
    desc: "Paul Waugh's daily politics email, with analysis of the day's stories.",
    className: 'politics',
    sailThruName: 'Politics',
    categories: [43, 21049, 39617, 20020, 37689], // Politics, Brexit, Local Elections, Scotland, Analysis
    sample: '',
    hasLogo: false,
    isNew: false,
  },
  opinion: {
    list: 'Opinion',
    frequency: 'Mon-Fri',
    desc: "Today's Talking points from our comment desk and elsewhere.",
    className: 'opinion',
    sailThruName: 'Opinion',
    categories: [12, 82, 356, 80, 81], // Opinion, Columnists, Comment, Editor, Your Views
    sample: '',
    hasLogo: false,
    isNew: false,
  },
  education: {
    list: 'Education',
    frequency: 'Weekly',
    desc: 'News and analysis as schools try to return to normal.',
    className: 'education',
    sailThruName: 'Education',
    categories: [359], // Education
    sample: '',
    hasLogo: false,
    isNew: false,
  },
  money: {
    list: 'money',
    frequency: 'Weekly',
    desc: 'Personal finance advice on savings and investments.',
    className: 'money',
    sailThruName: 'Money',
    categories: [48], // Money
    sample: '',
    hasLogo: true,
    isNew: false,
  },
  environment: {
    list: 'Green Shoots',
    frequency: 'Every Saturday',
    desc: "i's Guide to helping the planet in your everyday life.",
    className: 'environment',
    sailThruName: 'Environment',
    categories: [391, 51], // Environment, Science
    sample: '',
    hasLogo: false,
    isNew: false,
  },
  culture: {
    list: 'Reviews',
    frequency: 'Weekly',
    desc: 'All of i\'s film, TV and book reviews in one place, every single week.',
    className: 'culture',
    sailThruName: 'Culture',
    categories: [62, 39, 64, 63, 65, 4442], // Films, Music, Arts, Books, Gaming, Radio
    sample: '',
    hasLogo: true,
    isNew: false,
  },
  tv: {
    list: 'on tv',
    frequency: 'Mon-Fri',
    desc: 'Expert recommendations for what to watch next.',
    className: 'tv',
    sailThruName: 'TV',
    categories: [19], // Television
    sample: '',
    hasLogo: true,
    isNew: false,
  },
  score: {
    list: 'The Score',
    frequency: 'Weekly',
    desc: 'In-depth Monday morning analysis, on every Premier League club.',
    className: 'sport',
    sailThruName: 'Score',
    categories: [7, 31, 99, 101, 8], // Sport, Football, Rugby Union, Formula 1, Tennis
    sample: '',
    hasLogo: false,
    isNew: false,
  },
  football: {
    list: 'Fantasy-Football',
    frequency: 'Weekly',
    desc: 'Surge up the FPL rankings with our expert advice.',
    className: 'football',
    sailThruName: 'Football',
    categories: [23559], // Fantasy-Football
    sample: '',
    hasLogo: false,
    isNew: false,
  },
  cricket: {
    list: 'Inside Cricket',
    frequency: 'Monthly',
    desc: 'News, reaction and analysis from the world of cricket.',
    className: 'cricket',
    sailThruName: 'Cricket',
    categories: [142], // Cricket
    sample: '',
    hasLogo: false,
    isNew: false,
  },
  boxing: {
    list: 'Boxing Tonight',
    frequency: 'Every Saturday',
    desc: 'Your essential guide to Saturday night fights.',
    className: 'boxing',
    sailThruName: 'Boxing',
    categories: [151], // Boxing
    sample: '',
    hasLogo: false,
    isNew: false,
  },
  earlyEdition: {
    list: 'Early Edition',
    frequency: 'Every weekday at 6.30am',
    desc: 'i\'s morning news briefing. Cut through the noise, and get up to speed on the big issues of the day.',
    className: 'earlyedition',
    sailThruName: 'EarlyEdition',
    categories: [],
    sample: '',
    hasLogo: false,
    isNew: false,
    subscriptionRequired: true,
  },
  cultureFix: {
    list: 'Culture Fix',
    frequency: 'Every Monday',
    desc: 'Your guide to the week ahead - with our culture editor.',
    className: 'culture-fix',
    sailThruName: 'CultureFix',
    categories: [],
    sample: '',
    hasLogo: false,
    isNew: false,
    subscriptionRequired: true,
  },
  armchairEconomics: {
    list: 'Armchair Economics',
    frequency: 'Every Wednesday',
    desc: 'From Hamish McRae. Get behind the numbers with our finance commentator.',
    className: 'armchair-economics',
    sailThruName: 'ArmchairEconomics',
    categories: [],
    sample: '',
    hasLogo: false,
    isNew: false,
    subscriptionRequired: true,
  },
  ianDunt: {
    list: 'Ian Dunt\'s Week',
    frequency: 'Every Friday',
    desc: 'Politics, culture and possibly swearing.',
    className: 'ianDunt',
    sailThruName: 'Dunt',
    categories: [],
    sample: '',
    hasLogo: false,
    isNew: false,
    subscriptionRequired: true,
  },
  cockburn: {
    list: 'Patrick Cockburn\'s Dispatches',
    frequency: 'Every Friday',
    desc: 'Analysis on world news from our award-winning correspondent.',
    className: 'cockburn',
    sailThruName: 'Cockburn',
    categories: [],
    sample: '',
    hasLogo: false,
    isNew: false,
    subscriptionRequired: true,
  },
  bigReads: {
    list: 'Big Reads',
    frequency: 'Every Saturday',
    desc: 'The best of i, chosen by our features editor.',
    className: 'big-reads',
    sailThruName: 'BigReads',
    categories: [],
    sample: '',
    hasLogo: false,
    isNew: false,
    subscriptionRequired: true,
  },
  homeFront: {
    list: 'Home Front',
    frequency: 'Every Tuesday',
    desc: 'Essential news and analysis on the state of housing, from Vicky Spratt.',
    className: 'homefront',
    sailThruName: 'HomeFront',
    categories: [],
    sample: '',
    hasLogo: false,
    isNew: false,
    subscriptionRequired: true,
  },
  geekWeek: {
    list: 'Geek Week',
    frequency: 'Every Thursday',
    desc: 'Tom Chivers tries to understand (and explain) science, technology and the world.',
    className: 'geekweek',
    sailThruName: 'GeekWeek',
    categories: [],
    sample: '',
    hasLogo: false,
    isNew: false,
    subscriptionRequired: true,
  },
  inConversation: {
    list: 'In Conversation',
    frequency: 'Every Thursday',
    desc: 'From Yasmin Alibhai-Brown, thoughtful commentary to spark debate.',
    className: 'inconversation',
    sailThruName: 'InConversation',
    categories: [],
    sample: '',
    hasLogo: false,
    isNew: false,
    subscriptionRequired: true,
  },
};

/**
 * Fetch newsletter infromation based on className
 *
 * @param {string} classname Classname to fetch newsletter information
 *
 * @returns
 */
export const getEmailListByClassName = (classname) => {
  let list = 'default';

  // eslint-disable-next-line
  Object.keys(newsletterLists).some((listID) => {
    // Check for classname match first
    if (newsletterLists[listID].className === classname) {
      list = listID;
      return true;
    }
  });

  return newsletterLists[classname] || newsletterLists[list];
};

/**
 * Determine which email signup to use given the channel
 *
 * @param {array} categories
 * @param {string} primaryCategory
 */
export const getEmailList = (categories, primaryCategory) => {
  let list = 'default';

  // Determine which list to use based on a truthy intersection
  // of the list.categories compared to first, the primary category
  // (if set), then the rest of the categories on the post
  // eslint-disable-next-line
  Object.keys(newsletterLists).some((listID) => {
    // Check for primary category match first
    if (newsletterLists[listID].categories.includes(primaryCategory)) {
      list = listID;
      return true;
    }

    // Check for secondary category match
    if (newsletterLists[listID].categories.some((item) => categories.includes(item))) {
      list = listID;
    }
  });

  return newsletterLists[list];
};

// Getting See Latest link
// eslint-disable-next-line no-shadow
export const updatedNewsLetterList = (newsletterLists, dummyUser) => {
  const public_urls = dummyUser?.response?.vars;
  const tmpObj = {};
  // eslint-disable-next-line array-callback-return
  Object.entries(newsletterLists).map(([item, k]) => {
    tmpObj[item] = k;
    Object.keys(public_urls).forEach((key) => {
      if (key.includes('latest_URL')) {
        const sailThru_Name = key.substring(0, key.indexOf('_'));
        if (newsletterLists[item].sailThruName === sailThru_Name) {
          [tmpObj[item].sample] = public_urls[key];
        }
      }
    });
  });
  return tmpObj;
};

export default {};
