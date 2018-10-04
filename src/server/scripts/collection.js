class Collection {
  constructor(controller, logger) {
    this.controller = controller;
    this.logger = logger;
    this.collectionName =this.controller.Model.collection.collectionName;
  }
  clear() {
    this.logger.info('Removing all records from collection: %s', this.collectionName);
    return this.controller.clear();
  }

  initialize(md) {
    const logger = this.logger;
    return new Promise((resolve, reject)  => {
      this.clear().then(
        (d) => {
          logger.info('Cleared collection %s: deleted %s records', this.collectionName, d.n);
          logger.info('Inserting %s records....', md.length);
          this.controller.populate(md)
            .then((d) => {
              logger.info('Inserted %s Records.', d.length);
              resolve(d);
            }, (e) => {
              logger.error(e);
              reject(e);
            });
        },
        (e) => {
          logger.error(e);
          reject(e);
        });
    });
  }
}

module.exports = Collection;
