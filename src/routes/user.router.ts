import { UserService } from '@services/index'

const routes = async (app) => {
  app.get('/api', UserService.index)
}

export default routes
