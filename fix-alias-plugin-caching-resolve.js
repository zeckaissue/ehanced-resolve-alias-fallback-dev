const fs = require('fs')
const path = require('path');
class FixAliasPluginCachingResolve {
    constructor({enabled = true, targetFolder, fallbackFolder, alias} = {}) {
      this.enabled = !!enabled
      if(!enabled){
        return
      }
      if(!targetFolder || !fallbackFolder || !alias){
        throw new Error('FixAliasPluginCachingResolve need at least alias, targetFolder and fallbackFolder')
      }
      this.target = 'resolve';
      this.targetFolder = targetFolder;
      this.fallbackFolder = fallbackFolder;
      this.alias = alias;
  
    }
    apply(resolver) {
      if(!this.enabled){
        return;
      }
      const target = resolver.ensureHook(this.target);
      resolver.getHook(this.target).tapAsync(
        'FixAliasPluginCachingResolve',
        (request, resolveContext, callback) => {
          if (request.request.startsWith(this.alias+'/')) {
          const file = request.request.replace(this.alias+'/', '');
            const childThemeLocation = path.resolve(this.targetFolder, file);
            const parentThemeLocation = path.resolve(this.fallbackFolder, file)
            let newRequest = null;
            if(fs.existsSync(childThemeLocation)){
              newRequest = childThemeLocation;
            }else if(fs.existsSync(parentThemeLocation)){
              newRequest = parentThemeLocation;
            }
            if(newRequest){
              const obj = { ...request, request: newRequest  };
              return resolver.doResolve(target, obj, null, resolveContext, callback);
            }
          }
          return callback();
        }
      );
    }
  }
  module.exports = FixAliasPluginCachingResolve