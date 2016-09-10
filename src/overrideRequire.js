// @flow

import Module from 'module';

/**
 * @param isOverride A condition used to check whether to override Module._load.
 * @param resolveOverride A function used to override Module._load result.
 */
export default (isOverride: Function, resolveOverride: Function): Function => {
  const originalLoad = Module._load;

  // eslint-disable-next-line id-match
  Module._load = function (request, parent) {
    if (isOverride(request, parent)) {
      return resolveOverride(request, parent);
    }

    // eslint-disable-next-line prefer-rest-params
    return originalLoad.apply(this, arguments);
  };

  return () => {
    // eslint-disable-next-line id-match
    Module._load = originalLoad;
  };
};
