<template>
    <main class="kpi flex-fill d-flex">
        <LeftNavBarVue />
        <router-view class="flex-fill bg-gray-200 p-4 animate__animated animate__fadeIn container-fluid" />
    </main>
</template>

<script>
import LeftNavBarVue from "../components/KPI/LeftNavBar.vue"
export default ({
    setup() {

    },
    data() {
        return {

        }
    },
    created() {
    },
    methods: {
    },
    components: {
        LeftNavBarVue
    }
})
</script>
