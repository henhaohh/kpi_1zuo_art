<template>
    <div class="way d-flex flex-fill flex-column bg-light">
        <div class="flex-fill position-relative">
            <section class="main transform-center">
                <div class="mb-3"><img class="bg" src="../assets/img/l6c4ysve.png" /></div>
                <div class="d-flex d-flex justify-content-around">
                    <router-link :to="{ path: '/kpi/me/index' }" class="btn btn-danger btn-sm px-4">我的战力</router-link>                  
                    <div></div>
                    <div></div>
                    <router-link :to="{ path: '/kpi/team/index' }" class="btn btn-danger btn-sm px-4 me-4">战友认证</router-link>
                </div>
            </section>
        </div>
        <div class="text-end text-secondary p-3 mb-4 fs-sm">2022年8月 第一期</div>
    </div>
</template>
<style scoped>
.bg {
    width: 64vw;
}
</style>