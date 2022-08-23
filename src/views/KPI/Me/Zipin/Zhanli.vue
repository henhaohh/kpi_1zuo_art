<template>
    <div class="d-flex flex-column">
        <div class="row row-cols-1 row-cols-sm-4 row-cols-md-4 g-4 mb-3">
            <div class="col" v-for="(item, key) of s" :key="key">
                <div class="card h-100 animate__animated animate__zoomIn">
                    <div class="card-body">
                        <div class="card-title d-flex justify-content-between align-items-center">
                            <span class="fs-5 fw-bold">{{ item.name }}打分</span>
                            <span class="fs-sm text-muted">{{ item.min }}-{{ item.max }}分</span>
                        </div>
                        <div class="text-center">
                            <input type="text" pattern="[0-9]" maxlength="2" v-model="item.value"
                                class="text-danger custom-input"><span class="ms-2">分</span>
                        </div>
                        <div class="fs-sm text-muted text-center">{{ item.description }}</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="mb-5">
            <div class="fw-bold fs-4">综合评语</div>
            <div>
                <textarea class="form-control" rows="3" placeholder="点击填写(对⾃⼰的评语总结客观总结优缺点)"></textarea>
            </div>
        </div>
        <div class="d-grid gap-2">
            <button class="btn btn-danger" @click="submit()">提交</button>
        </div>
    </div>
</template>
<style scoped>
.fs-biggest {
    font-size: 5em;
}

.custom-input {
    font-size: 5em;
    border: none;
    outline: none;
    display: inline-block;
    width: 1.25em;
    text-align: center;
}
</style>
<script>
export default {
    data() {
        return {
            type: 0,
            s: {
                s1: {
                    name: '完成度',
                    min: 0,
                    max: 10,
                    value: 10,
                    description: "根据⼯作实际完成情况对应个⼈okr"
                },
                s2: {
                    name: '挑战性',
                    min: 0,
                    max: 10,
                    value: 10,
                    description: "根据⽬标的难度程度或者创新性"
                },
                s3: {
                    name: '影响力',
                    min: 0,
                    max: 10,
                    value: 10,
                    description: "为公司带来的价值和贡献"
                },
                s4: {
                    name: '投入度',
                    min: 0,
                    max: 10,
                    value: 10,
                    description: "实现⽬标所付出的努⼒和投⼊程度"
                },
            },
            body: ''
        }
    },
    computed: {
    },
    methods: {

    },
    components: {
    }
}
</script>