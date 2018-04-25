import 'core-js/es6/map'
import 'core-js/es6/set'
import 'raf/polyfill'

import express from 'express';
import app from './server/server';

if (module.hot) {
  module.hot.accept('./server/server', function() {
    console.log('🔁  HMR Reloading `./server/server`...');
  });
  console.info('✅  Server-side HMR Enabled!');
}

const port = process.env.PORT || 3000;

export default express()
  .use((req, res) => app.handle(req, res))
  .listen(port, function(err) {
    if (err) {
      console.error(err);
      return;
    }
    console.log(`> Started on port ${port}`);
  });
