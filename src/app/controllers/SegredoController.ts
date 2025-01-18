import type SegredosRepository from '../api/repository/SegredosRepository'
import type CataasService from '../services/CataanService'
import type { Context } from 'hono'

type Segredo = {
  segredo: string
  cor: string
  coracao?: number
  urlImage?: string
}

class SegredoController {
  private readonly cataasService: CataasService
  private readonly repository: SegredosRepository

  constructor(cataasService: CataasService, repository: SegredosRepository) {
    this.cataasService = cataasService
    this.repository = repository
  }

  async getSegredos(ctx: Context) {
    const dados = await this.repository.getAllSegredos(88)
    return ctx.json({ data: dados })
  }

  async getSegredoById(ctx: Context) {
    const { id } = ctx.req.param() // Usando params da URL
    const dados = await this.repository.getSegredoById(id)
    if (!dados) {
      return ctx.json({ error: 'Segredo não encontrado' }, 404)
    }
    return ctx.json({ data: dados })
  }

  async createSegredo(ctx: Context) {
    try {
      const gatoData = await this.cataasService.fetchCatData()
      const urlgato = this.cataasService.buildCatImageUrl(gatoData._id)

      const segredo = await ctx.req.json<Segredo>()
      segredo.urlImage = urlgato

      // Salva o segredo no banco de dados
      const savedSegredo = await this.repository.createSegredo(segredo)

      return ctx.json({ data: savedSegredo })
    } catch (error) {
      return ctx.json({ error: 'erro' }, 500)
    }
  }

  async createSegredoteste(ctx: Context) {
    try {
      const gatoData = await this.cataasService.fetchCatData()
      const urlgato = this.cataasService.buildCatImageUrl(gatoData._id)

      const segredo = await ctx.req.json<Segredo>()
      segredo.urlImage = urlgato

      return ctx.json({ data: segredo })
    } catch (error) {
      return ctx.json({ error: 'erro create' }, 500)
    }
  }
}

export default SegredoController
