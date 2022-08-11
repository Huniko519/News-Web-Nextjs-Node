import React from 'react';
import PropTypes from 'prop-types';

/**
 * Map of color variables to output for each parent key.
 *
 * All properties will be output as --inews-color-[childKey]
 *
 * @type {*}
 */
const colorMap = {
  'news': {
    primary: '#E33A11',
    secondary: '#F7F3EF',
    tertiary: '#F5B8AD',
  },
  'politics': {
    primary: '#5C909D',
    secondary: '#EFF4F5',
    tertiary: '#BDD2D7',
  },
  'opinion': {
    primary: '#3759B7',
    secondary: '#EFF2FA',
    tertiary: '#B7C3E5',
  },
  'business': {
    primary: '#F88379',
    secondary: '#FEF2F1',
    tertiary: '#F5B8AD',
  },
  'culture': {
    primary: '#EDA400',
    secondary: '#FDF6E5',
    tertiary: '#F7DAA8',
  },
  'culture-fix': {
    primary: '#EDA400',
    secondary: '#FDF6E5',
    tertiary: '#F7DAA8',
  },
  'money': {
    primary: '#F88379',
    secondary: '#FEF2F1',
    tertiary: '#FCCDC9',
  },
  'sport': {
    primary: '#8BC419',
    secondary: '#F6FBED',
    tertiary: '#D0E7A9',
  },
  'football': {
    primary: '#8BC419',
    secondary: '#F6FBED',
    tertiary: '#D0E7A9',
  },
  'cricket': {
    primary: '#8BC419',
    secondary: '#F6FBED',
    tertiary: '#D0E7A9',
  },
  'boxing': {
    primary: '#8BC419',
    secondary: '#F6FBED',
    tertiary: '#D0E7A9',
  },
  'lifestyle': {
    primary: '#46A3E0',
    secondary: '#EBF5FC',
    tertiary: '#A4D9BB',
  },
  'inews-lifestyle': {
    primary: '#46A3E0',
    secondary: '#EBF5FC',
    tertiary: '#90C7EC',
  },
  'big-reads': {
    primary: '#46A3E0',
    secondary: '#EBF5FC',
    tertiary: '#90C7EC',
  },
  'light-relief': {
    primary: '#46A3E0',
    secondary: '#EBF5FC',
    tertiary: '#90C7EC',
  },
  'travel': {
    primary: '#46A3E0',
    secondary: '#EBF5FC',
    tertiary: '#90C7EC',
  },
  'environment': {
    primary: '#009641',
    secondary: '#F2FAF5',
    tertiary: '#66C08D',
  },
  'armchair-economics': {
    primary: '#F88379',
    secondary: '#FEF2F1',
    tertiary: '#FCCDC9',
  },
  'ianDunt': {
    primary: '#3759B7',
    secondary: '#EFF2FA',
    tertiary: '#B7C3E5',
  },
  'cockburn': {
    primary: '#E33A11',
    secondary: '#F7F3EF',
    tertiary: '#F5B8AD',
  },
  'geekweek': {
    primary: '#E33A11',
    secondary: '#F7F3EF',
    tertiary: '#F5B8AD',
  },
  'homefront': {
    primary: '#3759B7',
    secondary: '#EFF2FA',
    tertiary: '#B7C3E5',
  },
  'inconversation': {
    primary: '#3759B7',
    secondary: '#EFF2FA',
    tertiary: '#B7C3E5',
  },
  'television': {
    primary: '#B9244C',
    secondary: '#F0F0F0',
    tertiary: '#D57B93',
  },
  'black': {
    primary: '#000000',
    secondary: '#F0F0F0',
  },
  'long-reads': {
    primary: '#E33A11',
    secondary: '#F7F3EF',
    tertiary: '#F5B8AD',
  },
  'puzzles': {
    primary: '#2DC1AA',
  },
  'number-puzzles': {
    primary: '#eda400',
  },
  'word-puzzles': {
    primary: '#1b50b2',
  },
  'ifavourites': {
    primary: '#e33a11',
  },
  'crosswords': {
    primary: '#46a3e0',
  },
};

/**
 * Utility method that returns the intended color object.
 *
 * Will return the the first color object matched in the colorKeys array.
 *
 * If useDefault is not false it will return the colorMap.news color object
 * if no color objects were matched with the keys in colorKeys
 *
 * @param {array} colorKeys Order is important
 * @param {bool} useDefault
 * @return {object}
 */
const getColors = (colorKeys, useDefault) => {
  // Use news as the default color set
  let colors = useDefault ? colorMap.news : {};
  if (colorKeys) {
    const keyArray = typeof colorKeys === 'string' ? [colorKeys] : colorKeys.filter((el) => el);
    let i = 0;
    const l = keyArray.length;

    // eslint-disable-next-line
    for (; i < l; i++) {
      if (colorMap[keyArray[i]]) {
        colors = colorMap[keyArray[i]];
        break;
      }
    }
  }
  return colors;
};

/**
 * Component that wraps its child elements in a div that we scope
 * the intended color object variables to.
 *
 * It will not wrap the child elements in a div if not color object variables
 * are created.
 *
 * @param {*} props
 * @return {*}
 */
const ScopedColorContext = (props) => {
  const {
    children, colorKeys, useDefault,
  } = props;

  const colors = getColors(colorKeys, useDefault);
  let cssVars = '';

  // eslint-disable-next-line
  for (const [key, value] of Object.entries(colors)) {
    cssVars += `--inews-color-${key}: ${value};`;
  }

  return (
    cssVars
      ? (
        <div className="color-context">
          <style jsx>
            {`
          .color-context {
            ${cssVars};
          }
        `}
          </style>
          {children}
        </div>
      )
      : <>{children}</>
  );
};

ScopedColorContext.propTypes = {
  children: PropTypes.node.isRequired,
  colorKeys: PropTypes.arrayOf(PropTypes.string).isRequired,
  useDefault: PropTypes.bool,
};

ScopedColorContext.defaultProps = {
  useDefault: true,
};

export default ScopedColorContext;
