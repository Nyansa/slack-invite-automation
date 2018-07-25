const config = require('../config');
const GoogleSpreadsheet = require('google-spreadsheet');
const doc = new GoogleSpreadsheet(config.googleDocId);

const authPromise = auth();

function auth() {
  return new Promise((resolve, reject) => {
    doc.useServiceAccountAuth({
      client_email: config.googleClientEmail,
      private_key: config.googlePrivateKey
    }, function(err) {
      err ? reject(err) : resolve();
    });
  });
}

async function addRow(sheetId, data) {
  await authPromise;

  return new Promise((resolve, reject) => {
    doc.addRow(sheetId, data, function (err, rows) {
      err ? reject(err) : resolve(rows);
    });
  });
}


async function getRows(sheetId) {
  await authPromise;

  return new Promise((resolve, reject) => {
    doc.getRows(sheetId, function (err, rows) {
      err ? reject(err) : resolve(rows);
    });
  });
}

module.exports = { addRow, getRows };
