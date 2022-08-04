<template>
    <header class="d-flex justify-content-between align-items-center">
        <div><span class="fw-bold fs-4">{{ name }}</span></div>
        <div>
            <router-link :to="{ path: '/way' }" class="link-inhert">返回首页<i
                    class="fa-solid fa-arrow-rotate-left px-1"></i></router-link>
        </div>
    </header>
</template>
<script>
export default {
    props: {
        name: {
            type: String,
            default: ''
        }
    }
}
</script>