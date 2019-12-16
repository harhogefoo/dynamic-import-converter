import { FileUtil } from '../file'

describe('FileUtil', () => {
  describe('getFiles', () => {
    test('normal: getFiles', async () => {
      const statSyncMock = [
        {
          isDirectory: () => true,
          isFile: () => false
        },
        {
          isDirectory: () => false,
          isFile: () => true
        },
        {
          isDirectory: () => false,
          isFile: () => true
        },
        {
          isDirectory: () => false,
          isFile: () => true
        }
      ]
      const fsStub = {
        promises: {
          readdir: () => Promise.resolve(['organisms', 'awesome.vue'])
        },
        statSync: () => statSyncMock.shift()
      }
      const fileUtil = new FileUtil(fsStub)
      const files = await fileUtil.getFiles('dirPath/', /.*\.vue$/)
      expect(files).toHaveLength(2)
      expect(files).toStrictEqual([
        'dirPath/organisms/awesome.vue',
        'dirPath/awesome.vue'
      ])
    })

    test('exception: throw exception', async () => {
      const fsStub = {
        promises: {
          readdir: () => Promise.reject(new Error('error'))
        }
      }
      const fileUtil = new FileUtil(fsStub)
      await expect(fileUtil.getFiles('dirPath/', /.*\.vue$/)).rejects.toThrow()
    })
  })

  describe('readFile', () => {
    test('normal: readFile', async () => {
      const given = 'texttext'
      const fsStub = {
        promises: {
          readFile: () => Promise.resolve(given)
        }
      }
      const fileUtil = new FileUtil(fsStub)
      await expect(fileUtil.readFile('filepath')).resolves.toBe(given)
    })

    test('exception: readFile, filePath is blank', async () => {
      const given = 'texttext'
      const fsStub = {
        promises: {
          readFile: () => Promise.resolve(given)
        }
      }
      const fileUtil = new FileUtil(fsStub)
      await expect(fileUtil.readFile()).rejects.toThrow()
    })

    test('exception: readFile throw exception', async () => {
      const fsStub = {
        promises: {
          readFile: () => Promise.reject(new Error('error'))
        }
      }
      const fileUtil = new FileUtil(fsStub)
      await expect(fileUtil.readFile()).rejects.toThrow()
    })
  })

  describe('writeFile', () => {
    test('normal: writeFile', async () => {
      const fsStub = {
        promises: {
          writeFile: (text, filePath) => Promise.resolve()
        }
      }
      const fileUtil = new FileUtil(fsStub)
      await expect(fileUtil.writeFile('text', 'filePath'))
    })

    test('exception: filePath is blank', async () => {
      const fsStub = {
        promises: {
          writeFile: (text, filePath) => Promise.resolve()
        }
      }
      const fileUtil = new FileUtil(fsStub)
      await expect(fileUtil.writeFile('text', '')).rejects.toThrow()
    })

    test('exception: throw exception', async () => {
      const fsStub = {
        promises: {
          writeFile: (text, filePath) => Promise.reject(new Error('error'))
        }
      }
      const fileUtil = new FileUtil(fsStub)
      await expect(fileUtil.writeFile('text', 'filePath')).rejects.toThrow()
    })
  })
})
