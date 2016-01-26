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
  api.use("jagi:astronomy@2.0.0-rc.1");

  api.imply("jagi:astronomy");

  // The files of this package
  api.addFiles("lib/index.js", ["client", "server"]);

  // The variables that become global for users of your package
  api.export("log", ["client", "server"]);
});

Package.onTest(function (api) {
  var testPackages = [
    'ecmascript',
    'stevezhu:lodash',
    'tinytest',
    'insecure',
    'jagi:astronomy'
  ];
  api.use(testPackages);
  api.use('robdooh:tycho');

  api.addFiles('tests/tinytesttest.js');
  api.addFiles('tests/eventStreamAsSecondModel.js');
});
