const { getFiles, readFile, writeFile } = require('./util/file')
const { convertToDynamicImport } = require('./lib/convert-to-dynmic-import')

// main
const main = async () => {
  const args = process.argv
  if (!args[2]) {
    console.error("[ERROR] You should input args with file path")
    return
  }
  const files = await getFiles(args[2], /.*\.vue$/)
  for (let i = 0; i < files.length; i++) {
    const text = await readFile(files[i])
    await writeFile(convertToDynamicImport(text), files[i])
  }
}

main().then().catch(e => console.error(e))
