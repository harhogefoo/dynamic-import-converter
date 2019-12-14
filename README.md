[![Build Status](https://travis-ci.org/harhogefoo/dynamic-import-converter.svg?branch=master)](https://travis-ci.org/harhogefoo/dynamic-import-converter)
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

or

yarn global add dynamic-import-converter
```

```bash
dyanmic-import-converter ./YOUR_DIRECTORY_PATH]/
```