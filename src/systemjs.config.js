/**
 * System configuration for Angular samples
 * Adjust as necessary for your application needs.
 */
(function (global) {
  System.config({
    paths: {
      // paths serve as alias
      'npm:': 'node_modules/'
    },
    // map tells the System loader where to look for things
    map: {
      // our app is within the app folder
      'app': 'app',

      // angular bundles
      '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
      '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
      '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
      '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
      '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
      '@angular/http': 'npm:@angular/http/bundles/http.umd.js',
      '@angular/router': 'npm:@angular/router/bundles/router.umd.js',
      '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',

      // other libraries
      'rxjs':                      'npm:rxjs',
      'angular-in-memory-web-api': 'npm:angular-in-memory-web-api/bundles/in-memory-web-api.umd.js',
      //'google-maps-angular2':      'npm:google-maps-angular2/dist',
      'angular2-google-maps/core': 'npm:angular2-google-maps/core/core.umd.js',
      '@agm/core': 'node_modules/@agm/core/core.umd.js',
      //'ng2-pop-over' : 'node_modules/ng2-pop-over/bundles/npm-module-seed.umd.js',
      '@ng-bootstrap/ng-bootstrap': 'node_modules/@ng-bootstrap/ng-bootstrap/bundles/ng-bootstrap.js',
      'ts': 'npm:plugin-typescript@4.0.10/lib/plugin.js',
      'typescript': 'npm:typescript@2.0.2/lib/typescript.js',

      '@angular/material': 'npm:@angular/material/bundles/material.umd.js',

    },
    // packages tells the System loader how to load when no filename and/or no extension
    packages: {
      app: {
        defaultExtension: 'js',
        transpiler: 'ts',
        typescriptOptions: {
            tsconfig: true
        },
        meta: {
          './*.js': {
            loader: 'systemjs-angular-loader.js'
          }
        }
      },
      rxjs: {
        defaultExtension: 'js'
      },
      'google-maps-angular2': {
      defaultExtension: 'js',
      main: 'index.js',
      format: 'cjs'
      }
    }
  });
})(this);
