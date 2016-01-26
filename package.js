Package.describe({
  name: 'robdooh:tycho',
  summary: 'Event sourcing via Astronomy models',
  version: '0.1.0',
  git: 'https://github.com/rdooh/meteor-tycho',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  // Meteor releases below this version are not supported
  api.versionsFrom("1.2.0.1");

  // Core packages and 3rd party packages
  api.use("jagi:astronomy@1.2.7");

  api.imply("jagi:astronomy");

  // The files of this package
  api.addFiles([
    'lib/modules/core/global.js',
    'lib/modules/core/config.js'
  ], ["client", "server"]);

  // The variables that become global for users of your package
  api.export(['Tycho', 'Observatory'], ['client', 'server']);
});

Package.onTest(function (api) {
  var testPackages = [
    'ecmascript',
    'stevezhu:lodash',
    'tinytest',
    'insecure',
    'jagi:astronomy',
    'jagi:astronomy-timestamp-behavior',
    'jagi:astronomy-slug-behavior',
    'jagi:astronomy-softremove-behavior',
    'jagi:astronomy-validators',
    'jagi:astronomy-simple-validators'
  ];
  api.use(testPackages);
  api.use('robdooh:tycho');

  api.addFiles('tests/tinytesttest.js');
});
