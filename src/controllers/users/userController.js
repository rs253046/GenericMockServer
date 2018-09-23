export default class UserController {
  constructor(db) {
    this.db = db;
    this.get = this.get.bind(this);
  }

  get(req, res) {
    this.db.user.findOne({}, function(err, docs) {
        res.status(200).json(docs.data);
    });
  }
}
