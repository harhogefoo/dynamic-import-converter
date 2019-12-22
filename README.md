[![Build Status](https://travis-ci.org/harhogefoo/dynamic-import-converter.svg?branch=master)](https://travis-ci.org/harhogefoo/dynamic-import-converter)
[![Maintainability](https://api.codeclimate.com/v1/badges/a99a88d28ad37a79dbf6/maintainability)](https://codeclimate.com/github/codeclimate/codeclimate/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/a99a88d28ad37a79dbf6/test_coverage)](https://codeclimate.com/github/codeclimate/codeclimate/test_coverage)
[![MIT License](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)](LICENSE)

# Dynamic import converter

# What is this

```bash
dynamic-import-converter ./demo/
```

## convert from...

```.vue
<template>
  <div>
    <hoge />
    <piyo />
  </div>
</template>

<script>
import Hoge from "@/components/Hoge.vue"
import Piyo from "@/components/Piyo.vue"

export default {
  components: {
    Hoge,
    Piyo
  }
}
</script>
```

## to

```.vue
<template>
  <div>
    <hoge />
    <piyo />
  </div>
</template>

<script>

export default {
  components: {
    Hoge: () => import("@/components/Hoge.vue"),
    Piyo: () => import("@/components/Piyo.vue")
  }
}
</script>
```

# Requirement
- Node.js v12

# Usage

## Install
```bash
npm install -g dynamic-import-converter
```

or

```bash
yarn global add dynamic-import-converter
```

## Execute
```bash
dyanmic-import-converter ./YOUR_DIRECTORY_PATH/
```

# Debug
```bash
yarn watch
node dist/main.js
```
