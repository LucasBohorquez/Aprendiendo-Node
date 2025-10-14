import fs from 'fs/promises'

fs.readdir('.')
  .then(files => {
    files.forEach(file => {
      console.log(file)
    })
  }).catch(err => {
    if (err) {
      console.error('Error al leer directorio: ', err)
    }
  })
