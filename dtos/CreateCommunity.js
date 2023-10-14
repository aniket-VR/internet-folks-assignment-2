class CreateCommunity {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.slug = data.slug;
    (this.owner = data.owner), (this.created_at = data.createdAt);
    this.updated_at = data.updateAt;
  }
}
module.exports = CreateCommunity;
