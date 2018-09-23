import path from 'path';
import Datastore from 'nedb';
import fs from 'fs';
import { directoryFiles, ensureFileExists, ensureDirectoryExists } from '../../lib/utils';

class Database {
  constructor() {
    this.db = {};
  }

  create() {
    const basePath = path.resolve('.tmps/database');
    ensureDirectoryExists(path.resolve('.tmps'));
    ensureDirectoryExists(basePath);

    const dbSeeds = this.getDbSeeds();

    dbSeeds.forEach((seed) => {
      const filePath = basePath + '/' + seed.fileName;
      this.db[seed.name] = new Datastore({
        filename: filePath,
        autoload: true
      });

      if (ensureFileExists(filePath)) {
        let data = JSON.parse(fs.readFileSync(seed.mockPath));
        this.db[seed.name].insert({ data }, function() {})
      };
    })

    return this.db;
  }

  close() {}

  getDbSeeds() {
    ensureDirectoryExists(path.resolve('lib/database/__mocks__'))
    return directoryFiles(path.resolve('lib/database/__mocks__'))
      .map(mock => {
        const fileName = mock.fileName.split('.')[0];
        const seed = {
          name: fileName,
          fileName: fileName + '.db',
          mockPath: mock.filePath
        };

        return seed;
      });
  }
}

export default Database;
