import { convertToDynamicImport } from '../convert-to-dynmic-import'

test('convert to expected', () => {
  const target = `<script>\n
  import ComponentA from "@/components/atoms/ComponentA"\n
  import ComponentB from "@/components/atoms/ComponentB"\n
  import ComponentC from '@/components/atoms/ComponentC'\n
  \n
  export default {\n
    components: {\n
      ComponentA,\n
      ComponentB,\n
      ComponentC\n
    }\n
  }\n
  </script>
  `
  const converted = convertToDynamicImport(target)
  const expected = `<script>\n
  export default {\n
    components: {\n
      ComponentA: () => import("@/components/atoms/ComponentA"),\n
      ComponentB: () => import("@/components/atoms/ComponentB"),\n
      ComponentC: () => import('@/components/atoms/ComponentC')\n
    }\n
  }\n
  </script>
  `

  // TODO: it's not check blanks
  expect(converted.replace(/\s+/g, '')).toMatch(expected.replace(/\s+/g, ''))
})
