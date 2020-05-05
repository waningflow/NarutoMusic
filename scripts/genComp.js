const fs = require('fs');
const path = require('path');

const compConfig = [
  {
    name: '{key}',
    children: [
      {
        name: '{key}.tsx',
        content: `import React from 'react';
import './{key}.less';

function {key}() {
  return <div className="{key}-container">{key}</div>;
}

export default {key};
`
      },
      {
        name: 'index.ts',
        content: `export { default } from './{key}';
`
      },
      {
        name: '{key}.less',
        content: `.{key}-container {
}
`
      }
    ]
  }
];

function reStr(str, name) {
  return str.replace(/{key}/g, name);
}

function gen(directory, name, config) {
  if (Array.isArray(config)) {
    config.forEach(v => gen(directory, name, v));
  } else if (config.children) {
    const pathName = path.join(directory, reStr(config.name, name));
    if (!fs.existsSync(pathName)) {
      fs.mkdirSync(pathName);
    }
    gen(pathName, name, config.children);
  } else {
    const pathName = path.join(directory, reStr(config.name, name));
    fs.writeFileSync(pathName, reStr(config.content, name));
  }
}

function main() {
  const [p, n] = process.argv.slice(2);
  gen(p, n, compConfig);
}

main();
