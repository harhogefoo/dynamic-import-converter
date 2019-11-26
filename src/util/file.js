const fs = require('fs').promises
const { statSync } = require('fs')

export const readFile = async filePath => {
  try {
    const text = await fs.readFile(filePath, 'utf-8')
    return text
  } catch (e) {
    console.error(e)
  }
}

export const writeFile = async (text, filePath) => {
  try {
    await fs.writeFile(filePath, text)
  } catch (e) {
    console.error(e)
  }
}

export const getFiles = async (dirPath, filePrefixRegex) => {
  try {
    const fileAndDirs = await fs.readdir(dirPath)
    const files = await Promise.all(fileAndDirs.map(async (fileAndDir) => {
        const fp = `${dirPath}${fileAndDir}`
        const stat = statSync(fp)
          if (stat.isDirectory()) {
            return await getFiles(`${fp}/`, filePrefixRegex);
          }
          if (stat.isFile() && filePrefixRegex.test(fp)) {
            return fp
          }
        }
    ))

    // remove undefined
    const filtered = files.filter(v => v)
    // flat array
    const flatten = (array) => array.reduce(
      (a, c) => (Array.isArray(c) ? a.concat(flatten(c)) : a.concat(c)),
      []
    )
    return flatten(filtered)
  } catch (e) {
    console.error(e)
  }
}
