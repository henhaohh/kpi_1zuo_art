<template>
    <div class="d-flex flex-column">
        <TopHeader :name="name" class="mb-2" />
        <section class="pt-4">
            <div v-for="(item, key) of Q" :key="key" class="mb-3 animate__animated animate__fadeIn"
                :style="{ 'animation-delay': key * 0.1 + 's' }">
                <div class="fw-bold my-2 d-flex justify-content-between"><span>工作重点{{ key + 1 }} （根据自己的OKR填写完成度）</span><span
                        @click="remove(key)" class="text-danger"><i class="fa-regular fa-trash-can"></i></span>
                </div>
                <div><textarea class="form-control" rows="3" placeholder="点击填写（具体描述本季度战况，这一路上都用“发际线”解决了哪些困难呢？）"
                        v-model="item.value"></textarea></div>
            </div>
            <div class="card mb-4">
                <div class="card-body">
                    <span class="btn btn-default btn-sm btn-outline-secondary me-2" @click="add()"><i
                            class="fa fa-add" /></span>点击加号添加
                </div>
            </div>
            <div class="d-grid gap-2">
                <button class="btn btn-danger" :disabled="canSubmit" @click="submit()">提交</button>
            </div>
        </section>
    </div>
</template>
<script>
import TopHeader from '../../../components/KPI/TopHeader.vue'
export default {
    data() {
        return {
            name: "本季度的“脱发”之路：",
            Q: [{ value: '' }, { value: '' },]
        }
    },
    computed: {
        canSubmit() {
            return this.Q.filter(v => !v.value).length
        }
    },
    methods: {
        add() {
            this.Q.push({
                value: ''
            })
        },
        remove(k) {
            this.Q.splice(k, 1);
        },
        submit() {
            console.log(
                this.Q.map(v => v.value)
            )
        }
    },
    components: {
        TopHeader
    }
}
</script>