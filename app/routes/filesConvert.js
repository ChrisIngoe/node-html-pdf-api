'use strict';

const filesConverter = require('../processors/filesConverter');

exports.htmlToPdfBase64 = async function (req, res) {
  filesConverter.convertFilesToPdf(req.body, function (err, pdfArr) {
    if (err) {
      return res.status(500).send('Internal server error');
    } else {
      return res.status(200).json(pdfArr);
    }
  });
};
