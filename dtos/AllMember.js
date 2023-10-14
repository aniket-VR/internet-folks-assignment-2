class AllMember {
  constructor(data) {
    this.id = data.id;
    this.community = data.community;
    this.user = {
      id: data.user.id,
      name: data.user.name,
    };
    this.role = {
      id: data.role.id,
      name: data.role.name,
    };
    this.created_at = data.createdAt;
  }
}
module.exports = AllMember;
