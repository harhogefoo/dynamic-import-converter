export const convertToDynamicImport = text => {
  // include \n (new line)
  const pattern = /import (.*) from ("@\/components\/.*")\n/g
  const results = [...text.matchAll(pattern)]
  let convertedText = text
  for (let j = 0; j < results.length; j++) {
    const [matched, componentName, componentPath] = results[j]
    convertedText = convertedText.replace(matched, "")
    // find strictly by componentName
    // componentName has blank before one and new line or comma(,) after one
    const componentNameRegex =  new RegExp(`( +)(${componentName})(\n|,)`)
    convertedText = convertedText.replace(componentNameRegex, `$1$2: () => import(${componentPath})$3`)
  }
  return convertedText
}
