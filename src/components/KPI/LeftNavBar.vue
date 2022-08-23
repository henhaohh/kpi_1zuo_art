<template>
    <aside
        class="bg-white p-3 d-flex flex-column justify-content-between text-center sticky-top animate__animated animate__fadeInLeft">
        <router-link :to="{ path: '/way' }"><img src="@/assets/img/logo.png" class="logo m-auto" /></router-link>
        <div class="flex-fill d-flex align-items-center">
            <nav class="nav flex-column" v-if="$route.params.type">
                <router-link class="nav-link" v-for="nav of navs[$route.params.type]"
                    :class="{ 'active': $route.name == nav.to }" :to="{ name: nav.to }" :key="nav.name"
                    :title="nav.label">
                    <IconVue :name="nav.icon" />
                </router-link>
            </nav>
        </div>
        <div><button class="btn" @click="logout()">
                <IconVue name="exit" />
            </button>
        </div>
    </aside>
</template>
<style scoped>
.logo {
    width: 2.5rem;
}

aside {
    height: 100vh;
}

.nav-link {
    color: var(--bs-secondary);
    font-size: 1.5rem;
}

.nav-link.active {
    color: var(--bs-danger);
}
</style>
<script>
import IconVue from '@/components/Icon.vue';
export default {
    data() {
        return {
            navs: {
                me: [
                    {
                        label: "我的战力",
                        to: "Kpi_me_index",
                        icon: 'Kpi_me_index'
                    },
                    {
                        label: "战情回顾",
                        to: "Kpi_me_his",
                        icon: 'Kpi_me_his'
                    },
                    {
                        label: "战力自评",
                        to: "Kpi_me_zipin_zhanli",
                        icon: 'Kpi_me_zipin_zhanli'
                    },
                    {
                        label: "群像口碑",
                        to: "Kpi_me_koubei",
                        icon: 'Kpi_me_koubei'
                    },
                    {
                        label: "我的“脱发”成绩单",
                        to: "Kpi_me_chengji",
                        icon: 'Kpi_me_chengji'
                    }
                ]
            }
        }
    },
    created() {
    },
    methods: {
        logout() {
            sessionStorage.removeItem('isAuthenticationed');
            this.$router.replace({ path: '/' });
        }
    },
    components: {
        IconVue
    }
}
</script>