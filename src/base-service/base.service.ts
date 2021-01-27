import {
  CreateQuery,
  Document,
  FilterQuery,
  Model,
  ModelPopulateOptions,
  QueryFindOneAndUpdateOptions,
  UpdateQuery,
  QueryPopulateOptions,
} from 'mongoose';

export abstract class BaseService<T extends Document> {
  private readonly model: Model<T>;
  constructor(model: Model<T>) {
    this.model = model;
  }

  async store(
    input: CreateQuery<T>,
    populate?: ModelPopulateOptions | ModelPopulateOptions[],
  ) {
    return await this.model
      .create(input)
      .then((doc) => {
        if (populate) {
          return doc.populate(populate).execPopulate();
        }
        return doc;
      })
      .then((doc) => doc.toObject());
  }

  async findOne(
    query: FilterQuery<T>,
    select?: any,
    populate?: ModelPopulateOptions | ModelPopulateOptions[],
    sort?: string | any,
  ): Promise<T> {
    return await this.model
      .findOne(query)
      .select(select)
      .populate(populate)
      .sort(sort)
      .lean();
  }

  async find(
    query: FilterQuery<T>,
    populate?: ModelPopulateOptions | ModelPopulateOptions[],
    sort?: string | any,
    limit?: number,
  ): Promise<T[]> {
    return await this.model
      .find(query)
      .populate(populate)
      .sort(sort)
      .limit(limit)
      .lean();
  }

  async update(
    query: FilterQuery<T>,
    update: UpdateQuery<T>,
    options?: QueryFindOneAndUpdateOptions,
    populate?: QueryPopulateOptions | QueryPopulateOptions[],
  ): Promise<T> {
    return await this.model
      .findOneAndUpdate(query, update, options)
      .populate(populate);
  }

  async remove(query: FilterQuery<T>): Promise<T> {
    return await this.model.findOneAndRemove(query);
  }

  async insertMany(input: any[]): Promise<T[]> {
    return await this.model.insertMany(input);
  }

  async deleteMany(query: FilterQuery<T>): Promise<any> {
    return await this.model.deleteMany(query);
  }

  async aggregate(query: any[]): Promise<any> {
    return await this.model.aggregate(query);
  }

  async distinct(key, query) {
    return await this.model.distinct(key, query);
  }

  async updateMany(query: FilterQuery<T>, update: UpdateQuery<T>) {
    return await this.model.updateMany(query, update);
  }

  async counts(query: FilterQuery<T>) {
    return await this.model.countDocuments(query);
  }
}
