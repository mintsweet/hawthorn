import { Service } from 'egg';

export default class BaseService extends Service {
  public model;

  constructor(ctx) {
    super(ctx);
    this.model = ctx.model.AuthUser;
  }

  create(data) {
    return this.model.create(data);
  }

  delete(id) {
    return this.model.findOneAndDelete(id);
  }

  update(id, data) {
    return this.model.findByIdAndUpdate(id, data, { new: true });
  }

  updateOne(query, data) {
    return this.model.findOneAndUpdate(query, data, { new: true });
  }

  getOne(query) {
    return this.model.findOne(query);
  }

  getById(id) {
    return this.model.findById(id);
  }

  async getPage(page = 1, size = 10, query = {}) {
    const total = await this.model
      .find(query)
      .countDocuments();
    const list = await this.model
      .find(query)
      .skip((+page - 1) * size)
      .limit(+size);

    return {
      list,
      total,
      page,
      size,
    };
  }

  search(name) {
    return this.model
      .find({
        name: { $regex: name },
      })
      .select('_id name');
  }
}
