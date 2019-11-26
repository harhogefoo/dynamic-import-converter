import { convertToDynamicImport } from '../convert-to-dynmic-import'

test('convert to expected', () => {
  const target = `<script>\n
  import ComponentName from "@/components/atoms/ComponentName"\n
  \n
  export default {\n
    components: {\n
      ComponentName\n
    }\n
  }\n
  </script>
  `
  const converted = convertToDynamicImport(target)
  const expected = `<script>\n
  export default {\n
    components: {\n
      ComponentName: () => import("@/components/atoms/ComponentName")\n
    }\n
  }\n
  </script>
  `

  // TODO: it's not check blanks
  expect(converted.replace(/\s+/g, '')).toMatch(expected.replace(/\s+/g, ''))
})
