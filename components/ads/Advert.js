import { useState, useEffect } from 'react';
import useBreakpoints from '../../utils/useBreakpoint';

const adsDescriptions = global.adverts?.config?.adsDescriptions || {};

/**
 * the DFP network code is 5765
 *
 * The primary ad unit will be inews
 *
 * The secondary ad unit will be: section_subsection_subsection
 *
 * The third level ad unit will be the pos value which will be supplied in an excel doc
 *
 * e.g. /5765/inews/parent_child/billboard
 */
export const getAdUnitPath = () => {
  const ctx = global.PageContext;

  const { topCategory, subCategory } = ctx.pageData;

  return topCategory === 'home' ? topCategory : `${topCategory}_${subCategory}`;
};

/**
 * Advert Component - render a dfp ad
 * @constructor
 */
const Advert = (props) => {
  const [mounted, setMounted] = useState(false);
  const breakpoint = useBreakpoints();
  const { pos } = props;

  const description = adsDescriptions[pos];

  const mountSlot = () => {
    const adUnitPath = getAdUnitPath(pos);

    window.adverts.cmd.push(
      {
        scope: 'adSlotMount',
        data: {
          position: pos,
          slotId: pos,
          appState: adUnitPath,
        },
      },
    );

    setMounted(true);
  };

  // Ensure we are in the correct breakpoint to
  // display this ad. If not, then try again when
  // breakpoint has changed.
  useEffect(() => {
    if (!description.breakpoints
      || description.breakpoints.includes(breakpoint)) {
      if (!mounted) {
        mountSlot();
      }
    }
  }, [breakpoint]);

  return null;
};

export default Advert;
