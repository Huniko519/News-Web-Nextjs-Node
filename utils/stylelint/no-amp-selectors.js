const stylelint = require('stylelint');
const resolvedNestedSelector = require('postcss-resolve-nested-selector');

const { report, ruleMessages } = stylelint.utils;
const ruleName = 'inews/no-amp-selectors';
const messages = ruleMessages(ruleName, {
  unexpected: (selector) => `Unexpected i-amphtml-* selector in "${selector}"`,
});

module.exports = stylelint.createPlugin(ruleName, () => (postcssRoot, postcssResult) => {
  postcssRoot.walkRules((rule) => {
    const regex = /(^|\W)i-amphtml-/g;

    const hasAmpSelector = rule.selectors.some((s) => resolvedNestedSelector(s, rule).some((ns) => ns.match(regex) !== null));

    if (!hasAmpSelector) {
      return;
    }

    report({
      ruleName,
      result: postcssResult,
      message: messages.unexpected(rule.selector),
      node: rule,
      word: rule.selector,
    });
  });
});

module.exports.ruleName = ruleName;
module.exports.messages = messages;
