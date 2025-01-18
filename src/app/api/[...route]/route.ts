import CataasService from '@/app/services/CataanService'
import { Hono } from 'hono'
import { handle } from 'hono/vercel'
import SegredosRepository from '../repository/SegredosRepository'
import SegredoController from '@/app/controllers/SegredoController'
export const dynamic = 'force-dynamic'

const app = new Hono().basePath('/api')

const cataasService = new CataasService('https://cataas.com/cat?json=true')
const segredosRepository = new SegredosRepository()
const segredoController = new SegredoController(
  cataasService,
  segredosRepository
)

app.get('/hello', c => {
  return c.json({ msg: 'hi :)' })
})

app.get('/segredos', ctx => segredoController.getSegredos(ctx))

app.get('/segredos/:id', async ctx => segredoController.getSegredoById(ctx))

app.post('/segredos', ctx => segredoController.createSegredo(ctx))

// export default handle(app)
export const GET = handle(app)
export const POST = handle(app)
