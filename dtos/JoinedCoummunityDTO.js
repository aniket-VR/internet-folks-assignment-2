class JoinedCommunityDTO {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.slug = data.slug;
    this.owner = {
      id: data.owner.id,
      name: data.owner.name,
    };
    this.created_at = data.createdAt;
    this.updated_at = data.updatedAt;
  }
}

module.exports = JoinedCommunityDTO;
