<template>
  <div>
    <hoge />
    <piyo />
  </div>
</template>

<script>
import Hoge from "@/components/Hoge.vue"
import Piyo from "@/components/Piyo.vue"
import Bar from '~/components/Bar.vue'

export default {
  components: {
    Hoge,
    Piyo,
    Bar
  }
}
</script>
