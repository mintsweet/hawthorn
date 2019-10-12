import { Service } from 'egg';

export default class BaseService extends Service {
  public model;

  constructor(ctx) {
    super(ctx);
    this.model = ctx.model.AuthUser;
  }

  async create(data) {
    const result = this.model.create(data);
    return result;
  }

  async delete(id) {
    const result = await this.model.findOneAndDelete(id);
    return result;
  }

  async update(id, data) {
    const result = await this.model.findByIdAndUpdate(id, data);
    return result;
  }

  async getPage(page = 1, size = 10, query = {}) {
    const total = await this.model.find(query).countDocuments();
    const list = await this.model
      .find(query)
      .skip((Number(page) - 1) * size)
      .limit(Number(size));

    return {
      list,
      total,
      page,
      size,
    };
  }

  async getOne(query) {
    const result = await this.model.findOne(query);
    return result;
  }

  async getById(id) {
    const result = await this.model.findById(id);
    return result;
  }

  async search(name) {
    const result = await this.model.find({
      name: {
        $regex: name,
      },
    });
    return result;
  }
}
