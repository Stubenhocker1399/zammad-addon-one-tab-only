'use strict';

const fs = require('fs');

const files = [
  {
    location: 'app/assets/javascripts/app/lib/base/one-tab-only.js',
    sourceFile: 'one-tab-only.js'
  }
];

const source = {
  name: "one-tab-only",
  version: process.env.npm_package_version,
  vendor: "Stubenhocker",
  license: "MIT",
  url: "https://github.com/Stubenhocker1399/zammad-addon-one-tab-only",
  description: [
    {
      "language": "en",
      "text": "Ensures that there is only one tab of Zammad open."
    }
  ],
  files: [
  ]
};

for (const file of files) {
  source.files.push({
    "permission": "644",
    "location": file.location,
    "content": fs.readFileSync("one-tab-only.js").toString('base64')
  });
}

fs.writeFile(`one-tab-only-v${process.env.npm_package_version}.zpm`, JSON.stringify(source, null, 2), err => {
    if (err) {
      console.err(err)
    }
  }
);
