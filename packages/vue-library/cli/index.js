#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

// Get command and component name from arguments
const [command, componentName] = process.argv.slice(2);

if (command !== 'add' || !componentName) {
  console.error('Usage: vue-library add <component-name>');
  process.exit(1);
}

// Define paths for the component to be copied
const componentFileName = `${componentName.charAt(0).toUpperCase() + componentName.slice(1)}.vue`;
const libraryPath = path.join(__dirname, '..', 'src', 'components', componentFileName);
const targetPath = path.join(process.cwd(), 'src', 'components', componentFileName);

// Check if the component exists in the source library
fs.access(libraryPath, fs.constants.F_OK, (err) => {
  if (err) {
    console.error(`Component "${componentFileName}" not found in the library.`);
    process.exit(1);
  }

  // Copy the component to the target project
  fs.copyFile(libraryPath, targetPath, (err) => {
    if (err) {
      console.error('Failed to copy component:', err);
      process.exit(1);
    }
    console.log(`${componentFileName} component added successfully!`);
  });
});
