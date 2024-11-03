// generate-types.js
const { generateApi } = require('swagger-typescript-api');
const path = require('path');

generateApi({
  name: 'api.ts',
  output: path.resolve(__dirname, './src/api'),
  url: 'http://localhost:5118/swagger/v1/swagger.json',
}).catch(e => console.error(e));

//node generate-types.js
