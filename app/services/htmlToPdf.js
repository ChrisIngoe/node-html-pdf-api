'use strict';

var fs = require('fs'),
  puppeteer = require('puppeteer');

exports.base64ToPdf = function (html) {
  return new Promise(async (resolve, reject) => {
    const args = ['--no-sandbox', '--disable-setuid-sandbox'];
    const browser = await puppeteer.launch({ args: args });
    const page = await browser.newPage();

    await page.setContent(html, {
      waitUntil: 'networkidle0', // wait for page to load completely
    });

    await page.pdf({ printBackground: true }).then(async function (data) {
      await browser.close();
      return resolve(data);
    });
  });
};
