<template>
    <div class="d-flex flex-column">
        <TopHeader :name="name" class="mb-2" />
        <section class="bg-white flex-fill d-flex">
            <div class="w-50 d-flex align-items-center justify-content-center flex-column">
                <div>
                    <div class="fw-bold fs-4 mb-3">
                        <p>一个季度的战斗过去了，</p>
                        <p>宝宝子的头发都还在嘛？</p>
                        <p>快来看看我们用上移的发际线,</p>
                        <p>换取了怎样的成就吧！</p>
                    </div>
                    <div><img src="../../../assets/img/l6c4ysvh.png" class="icon-hand me-2" />点击左侧按钮开启环评之路！</div>
                </div>
            </div>
            <div class="main w-50"></div>
        </section>
    </div>
</template>
<style scoped>
.main {
    background-image: url(../../../assets/img/l6c4ysvg.png);
    background-repeat: no-repeat;
    background-position: 50% 50%;
    background-size: 90%;
}

.icon-hand {
    width: 1.5rem;
}
</style>
<script>
import TopHeader from '@/components/KPI/TopHeader.vue'
export default {
    data() {
        return {
            name: '致【壹作人】的一封信'
        }
    },
    components: {
        TopHeader
    }
}
</script>