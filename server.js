const express = require('express');
const next = require('next');
const krabs = require('krabs').default;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
//
async function main() {
  try {
    await app.prepare();

    const handle = app.getRequestHandler();
    const server = express();

    server
      .post('*', (req, res) => krabs(req, res, handle, app))
      .get('*', (req, res) => krabs(req, res, handle, app))
      .put('*', (req, res) => krabs(req, res, handle, app))
      .delete('*', (req, res) => krabs(req, res, handle, app))
      .patch('*', (req, res) => krabs(req, res, handle, app))
      .listen(3000, () => console.log('server ready'));
  } catch (err) {
    console.log(err.stack);
  }
}

main();
