'use strict';

const htmlToPdf = require('../services/htmlToPdf'),
  async = require('async');

exports.convertFilesToPdf = function (files, callback) {
  let pdfArr = [];

  async.each(
    files,
    (file, asyncCallback) => {
      const html = Buffer.from(file.data, 'base64').toString();
      htmlToPdf
        .base64ToPdf(html)
        .then((pdfData) => {
          pdfArr.push({
            fileName: file.fileName.replace('.html', '.pdf'),
            data: pdfData.toString('base64'),
          });
          asyncCallback();
        })
        .catch((err) => asyncCallback(err));
    },
    function (err) {
      return callback(err, pdfArr);
    }
  );
};
