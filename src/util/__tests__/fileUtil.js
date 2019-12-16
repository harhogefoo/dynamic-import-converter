import FileUtil from '../fileUtil'

describe('FileUtil', () => {
  describe('getFiles', () => {
    test('normal: target file is not found', async () => {
      const statSyncMock = [
        {
          isDirectory: () => false,
          isFile: () => false
        }
      ]
      const fsStub = {
        promises: {
          readdir: () => Promise.resolve(['a.txt'])
        },
        statSync: () => statSyncMock.shift()
      }
      const fileUtil = new FileUtil(fsStub)
      const files = await fileUtil.getFiles('dirPath/', /.*\.vue$/)
      expect(files).toHaveLength(0)
    })

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
    const given = 'texttext'
    let fsResolveStub
    let fsRejectStub

    beforeEach(() => {
      fsResolveStub = {
        promises: {
          readFile: () => Promise.resolve(given)
        }
      }
      fsRejectStub = {
        promises: {
          readFile: () => Promise.reject(new Error('error'))
        }
      }
    })
    test('normal: readFile', async () => {
      const fileUtil = new FileUtil(fsResolveStub)
      await expect(fileUtil.readFile('filepath')).resolves.toBe(given)
    })

    test('exception: readFile, filePath is blank', async () => {
      const fileUtil = new FileUtil(fsResolveStub)
      await expect(fileUtil.readFile()).rejects.toThrow()
    })

    test('exception: readFile throw exception', async () => {
      const fileUtil = new FileUtil(fsRejectStub)
      await expect(fileUtil.readFile()).rejects.toThrow()
    })
  })

  describe('writeFile', () => {
    let fsResolveStub
    let fsRejectStub

    beforeEach(() => {
      fsResolveStub = {
        promises: {
          writeFile: (text, filePath) => Promise.resolve()
        }
      }
      fsRejectStub = {
        promises: {
          writeFile: (text, filePath) => Promise.reject(new Error('error'))
        }
      }
    })

    test('normal: writeFile', async () => {
      const fileUtil = new FileUtil(fsResolveStub)
      await expect(fileUtil.writeFile('text', 'filePath'))
    })

    test('exception: filePath is blank', async () => {
      const fileUtil = new FileUtil(fsResolveStub)
      await expect(fileUtil.writeFile('text', '')).rejects.toThrow()
    })

    test('exception: throw exception', async () => {
      const fileUtil = new FileUtil(fsRejectStub)
      await expect(fileUtil.writeFile('text', 'filePath')).rejects.toThrow()
    })
  })
})
