import { DIRECTORIES } from './constants/constants.js';
import { initMongoConnection } from './db/initMongoConnection.js';
import { setupServer } from './server.js';
import { checkExistFolders } from './utils/checkExistFolders.js';

(async () => {
  await initMongoConnection();
  await checkExistFolders(DIRECTORIES.TEMP_UPLOAD_DIR);
  setupServer();
})();
