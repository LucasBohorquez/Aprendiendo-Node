import fs from 'fs/promises'
import path from 'path'
import pc from 'picocolors'

const folder = process.argv[2] ?? '.'

async function ls (folder) {
  let files
  try {
    files = await fs.readdir(folder)
  } catch {
    console.error(pc.red(`No se pudo leer el directorio ${folder}`))
    process.exit(1)
  }
  const filePromise = files.map(async file => {
    const filepath = path.join(folder, file)
    let filestat
    try {
      filestat = await fs.stat(filepath) // stat = informacion del directorio
    } catch {
      console.error(pc.red(`No se pudo leer el archivo ${filepath}`))
      process.exit(1)
    }
    const isDirectory = filestat.isDirectory()
    const filetype = isDirectory ? 'd' : 'f'
    const filesize = filestat.size
    const filemodified = filestat.mtime.toLocaleString()
    return `${filetype} ${file.padEnd(20)} ${filesize.toString().padStart(10)} ${filemodified}`
  })
  const filesinfo = await Promise.all(filePromise)
  filesinfo.forEach(fileinfo => {
    console.log(fileinfo)
  })
}
ls(folder)
