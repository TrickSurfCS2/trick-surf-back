import {
  copyFileSync,
  existsSync,
  mkdir,
  readdirSync,
  rmdirSync,
  statSync,
  unlinkSync,
} from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

export function alias(path: string): string {
  return fileURLToPath(new URL(toAbsolute(`../${path}`), import.meta.url))
}

export function toAbsolute(path: string): string {
  const __filename = fileURLToPath(import.meta.url)
  const __dirname = dirname(__filename)

  return resolve(__dirname, path)
}

export function camelize(name: string): string {
  return name.replace(/(^|-)(\w)/g, (a, b, c) => c.toUpperCase())
}

export function copyFileRecursive(src: string, dest: string): void {
  const lastPath = dest.substring(0, dest.lastIndexOf('/'))

  mkdir(lastPath, { recursive: true }, () => {
    copyFileSync(src, dest)
  })
}

export function rmdirRecursive(path: string) {
  if (existsSync(path)) {
    readdirSync(path).forEach((item) => {
      const current = resolve(path, item)

      statSync(current).isDirectory()
        ? rmdirRecursive(current)
        : unlinkSync(current)
    })
    rmdirSync(path)
  }
}
