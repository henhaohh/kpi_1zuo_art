<template>
    <div class="d-flex flex-column">
        <div class="mb-5">
            <div v-for="(item, key) in belief_list" :key="key">
                <div class="fs-5 fw-bold py-4">
                    <input type="radio" v-model="belief_score" name="belief_score" :value="item.score"
                        :id="'belief_score-' + key" class="form-check-input custom-radio" />
                    <label class="ms-2" :for="'belief_score-' + key">
                        {{ item.name }}
                    </label>
                </div>
                <div class="p-3 bg-white border rounded">
                    <div class="fw-bold">践行总结</div>
                    <div><textarea class="form-control border-0 px-0 outline-0" rows="1" :placeholder="item.description"
                            v-model="item.body"></textarea></div>
                </div>
            </div>
        </div>
        <div class="d-grid gap-2">
            <button class="btn btn-danger" @click="submit()">提交</button>
        </div>
    </div>
</template>
<style scoped>
.custom-radio {
    background-repeat: no-repeat;
    float: left;
    border-radius: .25em;
    border: none;
    outline: none;
    border: 1px solid var(--bs-danger);
}

.custom-radio:checked {
    background-image: url(../../../../assets/img/l6c4ysvl.png);
    background-color: var(--bs-danger);
    background-size: auto 50%;
    background-position: 50%;
}
</style>
<script>
export default {
    data() {
        return {
            belief_score: 1,
            belief_body: '',
            belief_list: [
                {
                    name: "入门梦想家：“唔关我事啊”",
                    description: "如在xx情况下，可以付出xx⾏动，维护团队价值观等等。",
                    score: 1,
                    body: ''
                },
                {
                    name: "战斗大骑士：“最重要是一起开心咯”",
                    description: "点击填写",
                    score: 2,
                    body: ''
                },
                {
                    name: "逆天寻梦者：“兄弟齐心！其利断金”",
                    description: "点击填写",
                    score: 3,
                    body: ''
                }
            ]
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