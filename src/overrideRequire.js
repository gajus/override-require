// @flow

import Module from 'module';

type ParentType = {
  children: Array<any>,
  exports: any,
  filename: string,
  id: string,
  loaded: boolean,
  parent: any,
  paths: Array<string>
};

type IsOverrideType = (request: string, parent: ParentType) => boolean;

type ResolverOverrideType = (request: string, parent: ParentType) => any;

type OverrideRequireType = (...rest: Array<void>) => void;

/**
 * @param isOverride A condition used to check whether to override Module._load.
 * @param resolveOverride A function used to override Module._load result.
 */
export default (isOverride: IsOverrideType, resolveOverride: ResolverOverrideType): OverrideRequireType => {
  const originalLoad = Module._load;

  // eslint-disable-next-line id-match
  Module._load = function (request: string, parent: ParentType) {
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
