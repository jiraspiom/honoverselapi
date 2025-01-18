import { PrismaClient } from '@prisma/client'
import { Hono } from 'hono'
import { handle } from 'hono/vercel'
export const dynamic = 'force-dynamic'

const app = new Hono().basePath('/api')

const prisma = new PrismaClient()

app.get('/hello', c => {
  return c.json({ msg: 'ok' })
})

app.get('/teste/:id', async ctx => {
  const id = ctx.req.param('id')
  return ctx.json({ msg: `id e ${id}` })
})

app.post('/teste', async ctx => {
  const { nome } = await ctx.req.json()
  return ctx.json({ usuario: nome })
})

app.get('/usuario', async ctx => {
  const usuario = prisma.usuario.findMany()
  return ctx.json({ data: usuario })
})

// export default handle(app)
export const GET = handle(app)
export const POST = handle(app)
