import type { Router } from 'express'

abstract class AController {
  public path!: string
  public router!: Router
}

export default AController
