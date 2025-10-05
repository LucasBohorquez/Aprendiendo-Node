import path from 'node:path'

// barra que separa las carpetas segun el so
// console.log(path.sep)

// unir rutas con path.join

const filepath = path.join('content', 'subfolder', 'test.txt')
console.log(filepath)

const base = path.basename('content/subfolder/test.txt') // ver nombre del fichero
console.log(base)

const file = path.basename('content/subfolder/test.txt', 'txt') // ver nombre del fichero sin extension
console.log(file)

const extension = path.extname('test.txt') // ver la extension final del archivo
console.log(extension)
