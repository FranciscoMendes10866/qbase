class UserService {
  async index (user: any): Promise<number> {
    return user.id
  }
}

export default new UserService()
