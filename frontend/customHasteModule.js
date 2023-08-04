// customHasteModule.js
const path = require('path');
const { createHasteMap } = require('jest-haste-map');

module.exports = createHasteMap({
  // Customize the module name for the conflicting packages
  moduleNameMapper: {
    // For example, add a unique identifier to the package names
    '^createEPF$': path.resolve(__dirname, 'amplify', '#current-cloud-backend', 'function', 'createEPF', 'src', 'package.json'),
    '^createEPF/src$': path.resolve(__dirname, 'amplify', 'backend', 'function', 'createEPF', 'src', 'package.json'),
    '^deleteEPF$': path.resolve(__dirname, 'amplify', '#current-cloud-backend', 'function', 'deleteEPF', 'src', 'package.json'),
    '^deleteEPF/src$': path.resolve(__dirname, 'amplify', 'backend', 'function', 'deleteEPF', 'src', 'package.json'),
    '^deleteUser$': path.resolve(__dirname, 'amplify', '#current-cloud-backend', 'function', 'deleteUser', 'src', 'package.json'),
    '^deleteUser/src$': path.resolve(__dirname, 'amplify', 'backend', 'function', 'deleteEPF', 'src', 'package.json'), 
    '^getEPFs$': path.resolve(__dirname, 'amplify', '#current-cloud-backend', 'function', 'getEPFs', 'src', 'package.json'),
    '^getEPFs/src$': path.resolve(__dirname, 'amplify', 'backend', 'function', 'getEPFs', 'src', 'package.json'),  
    '^getEXCOEPFs$': path.resolve(__dirname, 'amplify', '#current-cloud-backend', 'function', 'getEXCOEPFs', 'src', 'package.json'),
    '^getEXCOEPFs/src$': path.resolve(__dirname, 'amplify', 'backend', 'function', 'getEXCOEPFs', 'src', 'package.json'),  
  },
});