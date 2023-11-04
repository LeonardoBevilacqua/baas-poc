export class TodoService {
  repository;
  constructor(repository) {
    this.repository = repository;
  }

  async getAll() {
    return (await this.repository.findAll()) ?? [];
  }

  async getByUser(userId) {
    return (await this.repository.findAllByUser(userId)) ?? [];
  }

  async add(todo) {
    return await this.repository.insert(todo);
  }

  async delete(id, userId) {
    await this.repository.delete(id, userId);
  }

  async update(item, userId) {
    await this.repository.update(item, userId);
  }
}
