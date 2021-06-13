'use strict';

const fs = require('fs');

exports.getFiles = function () {
  const fileNameTest1 = 'test1.html';
  const fileNameTest2 = 'test2.html';
  const fileNameTest3 = 'test3.html';

  const fileTest1 = fs.readFileSync(`./test/${fileNameTest1}`, {
    encoding: 'base64',
  });
  const fileTest2 = fs.readFileSync(`./test/${fileNameTest2}`, {
    encoding: 'base64',
  });
  const fileTest3 = fs.readFileSync(`./test/${fileNameTest3}`, {
    encoding: 'base64',
  });
  return [
    { fileName: fileNameTest1, data: fileTest1 },
    { fileName: fileNameTest2, data: fileTest2 },
    { fileName: fileNameTest3, data: fileTest3 },
  ];
};
