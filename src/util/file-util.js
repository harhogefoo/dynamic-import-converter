import { flattenDeep, extractUndefined } from './array'

export default class FileUtil {
  constructor(fs) {
    this.fs = fs.promises
    this.statSync = fs.statSync
  }

  async readFile(filePath) {
    try {
      if (!filePath) {
        throw Error('should specify filePath')
      }
      const text = await this.fs.readFile(filePath, 'utf-8')
      return text
    } catch (e) {
      throw new Error(e)
    }
  }

  async writeFile(text, filePath) {
    try {
      if (!filePath) {
        throw Error('should specify filePath')
      }
      await this.fs.writeFile(filePath, text)
    } catch (e) {
      throw new Error(e)
    }
  }

  async getFiles(dirPath, filePrefixRegex) {
    try {
      const fileAndDirs = await this.fs.readdir(dirPath)
      const files = await Promise.all(
        fileAndDirs.map(async fileAndDir => {
          const fp = `${dirPath}${fileAndDir}`
          const stat = this.statSync(fp)
          if (stat.isDirectory()) {
            const result = await this.getFiles(`${fp}/`, filePrefixRegex)
            return result
          }
          if (stat.isFile() && filePrefixRegex.test(fp)) {
            return fp
          }
        })
      )

      // remove undefined then flat array
      return flattenDeep(extractUndefined(files))
    } catch (e) {
      throw Error(e)
    }
  }
}
