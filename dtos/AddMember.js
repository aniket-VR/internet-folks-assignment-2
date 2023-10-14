class AddMember {
  constructor(data) {
    this.id = data.id;
    this.community = data.community;
    this.user = data.user.id;
    this.role = data.role.id;
    this.created_at = data.createdAt;
  }
}
module.exports = AddMember;
