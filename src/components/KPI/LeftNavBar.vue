<template>
    <aside
        class="bg-white p-3 d-flex flex-column justify-content-between text-center sticky-top animate__animated animate__fadeInLeft">
        <router-link :to="{ path: '/way' }"><img src="@/assets/img/logo.png" class="logo m-auto" /></router-link>
        <div class="flex-fill d-flex align-items-center">
            <nav class="nav flex-column" v-if="$route.params.type">
                <router-link class="nav-link" v-for="nav of navs[$route.params.type]"
                    :class="{ 'active': $route.name == nav.to }" :to="{ name: nav.to }" :key="nav.name"
                    v-html="nav.icon" :title="nav.name"> </router-link>
            </nav>
        </div>
        <div><button class="btn" @click="logout()"><i class="fa-solid fa-arrow-right-from-bracket"></i></button>
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
export default {
    data() {
        return {
            navs: {
                me: [
                    {
                        label: "我的战力",
                        to: "Kpi_me_index",
                        icon: '<i class="fa fa-user"></i>'
                    },
                    {
                        label: "战情回顾",
                        to: "Kpi_me_his",
                        icon: '<i class="fa fa-clipboard-list"></i>'
                    },
                    {
                        label: "战力自评",
                        to: "Kpi_me_zipin_zhanli",
                        icon: '<i class="fa-solid fa-file-zipper"></i>'
                    }/* ,
                    {
                        label: "",
                        to: "d",
                        icon: '<i class="fa-solid fa-user-plus"></i>'
                    },
                    {
                        label: "",
                        to: "e",
                        icon: '<i class="fa-solid fa-eye"></i>'
                    } */
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
    }
}
</script>