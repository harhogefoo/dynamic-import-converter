import fs from 'fs'
import FileUtil from './util/file-util'
import { convertToDynamicImport } from './lib/convert-to-dynmic-import'

const main = async () => {
  const args = process.argv
  if (!args[2]) {
    throw Error('[ERROR] You should input args with file path')
  }

  const fileUtil = new FileUtil(fs)
  const files = await fileUtil.getFiles(args[2], /.*\.vue$/)
  for (let i = 0; i < files.length; i++) {
    const text = await fileUtil.readFile(files[i])
    await fileUtil.writeFile(convertToDynamicImport(text), files[i])
  }
}

main()
  .then()
  .catch(e => console.error(e))
