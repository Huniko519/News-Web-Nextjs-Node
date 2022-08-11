// Export client componets to initialise here
import CMP from './CMP';
import AdsSetup from './ads/AdsSetup';
import RTA from './analytics/rta';
import IPSOS from './analytics/ipsos';
import Comscore from './analytics/comscore';
import GoogleAnalytics from './analytics/ga';
import FBPixel from './analytics/fb';
import MicrosoftAnalytics from './analytics/microsoft';
import PushNotifications from './push-notifications';
import DailyMotionVideo from '../utils/video';
import { init as Masthead } from './masthead';
import PostViewed from './post-items/viewed';
import Slider from '../utils/slider/slider-client';
import PostObserver from './post-templates/post-observer';
import PostCategoryBanner from './post-templates/post-category-banner';

export default {
  CMP,
  AdsSetup,
  RTA,
  IPSOS,
  Comscore,
  GoogleAnalytics,
  FBPixel,
  PushNotifications,
  DailyMotionVideo,
  Masthead,
  PostViewed,
  MicrosoftAnalytics,
  Slider,
  PostObserver,
  PostCategoryBanner,
};
