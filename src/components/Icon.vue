<template>
    <component :is="name" class="icon" />
</template>
<style scoped>
.icon {
    width: 1em;
    height: 1em;
}
</style>
<script>
import hand from '@/components/icon/hand.vue'
import exit from '@/components/icon/exit.vue'
import Kpi_me_index from '@/components/icon/Kpi_me_index.vue'
import Kpi_me_his from '@/components/icon/Kpi_me_his.vue'
import Kpi_me_zipin_zhanli from '@/components/icon/Kpi_me_zipin_zhanli.vue'
import Kpi_me_koubei from '@/components/icon/Kpi_me_koubei.vue'
import Kpi_me_chengji from '@/components/icon/Kpi_me_chengji.vue'
import print from '@/components/icon/print.vue'
export default {
    props: {
        name: {
            type: String,
            default: ''
        }
    },
    components: {
        hand,
        Kpi_me_index,
        exit,
        Kpi_me_his,
        Kpi_me_zipin_zhanli,
        Kpi_me_koubei,
        Kpi_me_chengji,
        print
    }
}
</script>