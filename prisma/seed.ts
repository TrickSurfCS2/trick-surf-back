import process from 'node:process'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import type { Log } from '../src/utils/logger'
import prisma from '../src/prisma'
import { LogType, Logger } from '../src/utils/logger'

interface SeedFile {
  name: string
  path: string
}

const seedFiles: SeedFile[] = [
  { name: 'user', path: 'sql/user.sql' },
  { name: 'map', path: 'sql/map.sql' },
  { name: 'trigger', path: 'sql/trigger.sql' },
  { name: 'trick', path: 'sql/trick.sql' },
  { name: 'route', path: 'sql/route.sql' },
  { name: 'complete', path: 'sql/complete.sql' },
]

const logger = new Logger()

async function run() {
  const seedsStatus: Log[] = []

  logger.info('✨ Run seeds')

  for (const seedFile of seedFiles) {
    try {
      const sql: string = readFileSync(resolve(__dirname, seedFile.path), 'utf8')
      const queries: string[] = sql.split(';')

      for (const query of queries) {
        logger.info(query)
        await prisma.$executeRawUnsafe(query)
      }
      seedsStatus.push({ type: LogType.Success, message: seedFile.name })
    }
    catch (e) {
      seedsStatus.push({ type: LogType.Error, message: seedFile.name })
    }
  }

  logger.info('✨ All seeds finished')

  seedsStatus.forEach(({ type, message }) => logger[type](message))

  await prisma.$disconnect()
}

run().catch((e) => {
  logger.error('❌ Seed', e)
  process.exit(1)
})
