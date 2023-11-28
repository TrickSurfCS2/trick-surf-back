import prisma from '#/prisma'

class MapService {
  //* Create

  //* Read
  getAll = async () => prisma.map.findMany()

  //* Update

  //* Delete
}

export default MapService
