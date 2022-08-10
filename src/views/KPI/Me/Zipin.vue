<template>
    <div class="d-flex flex-column">
        <TopHeader :name="name" class="mb-2" />
        <section class="mt-1">
            <div class="row row-cols-1 row-cols-md-6 g-6 justify-content-between mb-3">
                <router-link :to="{ name: 'Kpi_me_zipin_zhanli' }"
                    class="col nv-pic pic-1 link-inhert p-4 rounded d-flex align-items-center justify-content-start"
                    :class="{ active: $route.name === 'Kpi_me_zipin_zhanli' }">
                    <div>
                        <div class="fs-3 fw-bold">战力勋章</div>
                        <div class="py-3 animate__animated animate__fadeInLeft" v-if="$route.name === 'Kpi_me_zipin_zhanli'" >基于⻆⾊职责预期 <br />评估⼯作实际产出和贡献</div>
                    </div>
                </router-link>
                <router-link :to="{ name: 'Kpi_me_zipin_xinyang' }"
                    class="col nv-pic pic-2 link-inhert p-4 rounded d-flex align-items-center"
                    :class="{ active: $route.name === 'Kpi_me_zipin_xinyang' }">
                    <div>
                        <div class="fs-3 fw-bold">信仰等级</div>
                        <div v-if="$route.name === 'Kpi_me_zipin_xinyang'" class="py-3 animate__animated animate__fadeInLeft">在⼯作中践⾏壹作团队价值观的 <br />⾼光时刻越多，等级越⾼
                            <div>点击查看价值观对照表</div>
                        </div>
                    </div>
                </router-link>
            </div>
            <router-view />
        </section>
    </div>
</template>
<style scoped>
.nv-pic {
    width: 48%;
    filter: invert(1);
    background: var(--bs-black);
    color: #fff;
    background-repeat: no-repeat;
    background-position: 90% 50%;
    background-size: auto 80%;
}

.nv-pic.pic-1 {
    background-image: url('../../../assets/img/l6c4ysvi.png');
}

.nv-pic.pic-2 {
    background-image: url('../../../assets/img/l6c4ysvj.png');
    background-position: 100% 100%;
}

.nv-pic.active {
    background-color: var(--bs-danger);
    filter: inherit;
}
</style>
<script>
import TopHeader from '../../../components/KPI/TopHeader.vue'
export default {
    data() {
        return {
            name: "",
        }
    },
    computed: {
    },
    methods: {

    },
    components: {
        TopHeader
    }
}
</script>