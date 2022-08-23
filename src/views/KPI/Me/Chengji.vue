<template>
    <div class="d-flex flex-column">
        <TopHeader :name="name" class="mb-2" />
        <section class="bg-white flex-fill d-flex align-items-center justify-content-center position-relative"
            v-if="!finished">
            <div class="fs-4 fw-bold">
                还没有出来呢，不要急哦 ~
            </div>
            <IconVue name="hand" class="hand hand1" />
            <IconVue name="hand" class="hand hand2" />
        </section>
        <section class="" v-else>
            <div class="card mb-3" v-if="zhanli && Object.keys(zhanli).length">
                <div class="card-body">
                    <div><span class="fs-5 fw-bold">战力勋章</span><span
                            class="text-muted fs-sm">（基于⻆⾊职责预期，评估⼯作实际产出和贡献）</span></div>
                    <div class="my-2">
                        <div class="row row-cols-1 row-cols-sm-4 row-cols-md-4 g-4 mb-1">
                            <div class="col">{{ zhanli.s.s1.name }}：{{ zhanli.s.s1.value }}分</div>
                            <div class="col">{{ zhanli.s.s2.name }}：{{ zhanli.s.s2.value }}分</div>
                        </div>
                        <div class="row row-cols-1 row-cols-sm-4 row-cols-md-4 g-4 mb-1">
                            <div class="col">{{ zhanli.s.s3.name }}：{{ zhanli.s.s3.value }}分</div>
                            <div class="col">{{ zhanli.s.s4.name }}：{{ zhanli.s.s4.value }}分</div>
                        </div>
                    </div>
                    <div class="row"><span class="fw-bold col col-12 col-md-2 col-lg-2 col-sm-12">综合评语:</span><span
                            class="text-muted col">{{
                                    zhanli.body
                            }}</span></div>
                </div>
            </div>
            <div class="card mb-3" v-if="xingyang && Object.keys(xingyang).length">
                <div class="card-body">
                    <div class="mb-2"><span class="fs-5 fw-bold">信仰等级：{{ xingyang.name }}</span>
                    </div>
                    <div class="row"><span class="fw-bold col col-12 col-md-2 col-lg-2 col-sm-12">具体表现行为总结:</span><span
                            class="text-muted px-2 col">{{
                                    xingyang.body
                            }}</span></div>
                </div>
            </div>
            <div class="card mb-3" v-if="pingji && Object.keys(pingji).length">
                <div class="card-body">
                    <div class="mb-2"><span class="fs-5 fw-bold">{{ pingji.name }}:</span>
                    </div>
                    <div class="fw-bold"><span class="me-2">{{ pingji.value }}</span>({{ pingji.body }})</div>
                </div>
            </div>
            <div class="card mb-3" v-if="shangji && Object.keys(shangji).length">
                <div class="card-body">
                    <div class="mb-2"><span class="fs-5 fw-bold">{{ shangji.name }}:</span>
                    </div>
                    <div class="text-muted">{{ shangji.body }}</div>
                </div>
            </div>
        </section>
    </div>
</template>
<style scoped>
.hand {
    position: absolute;
    z-index: 1;
    font-size: 18rem;
    color: var(--bs-secondary);
}

.hand1 {
    right: 0;
    top: 0;
}

.hand2 {
    left: 0;
    bottom: 0;
    transform: rotateX(180deg) rotateY(180deg);
}
</style>
<script>
import TopHeader from '@/components/KPI/TopHeader.vue'
import IconVue from '@/components/Icon.vue';
export default {
    data() {
        return {
            finished: true,
            zhanli: {
                s: {
                    s1: {
                        name: '完成度',
                        value: 10
                    },
                    s2: {
                        name: '挑战性',
                        value: 10
                    },
                    s3: {
                        name: '影响力',
                        value: 10
                    },
                    s4: {
                        name: '投入度',
                        value: 10
                    },
                },
                body: '评价内容'.repeat(20)
            },
            xingyang: {
                name: "战斗大骑士",
                score: 2,
                body: '评价内容'.repeat(20)
            },
            pingji: {
                name: "综合评级",
                value: 'C',
                body: "唔嘤唔嘤，前途漫漫，少年还需继续成长呀！"
            },
            shangji: {
                name: "上级给的结论评语",
                body: "⼀句话总结测评时段（季度）的具体表现1234 多维度分析结果1234"
            }
        }
    },
    computed: {
        name() {
            return this.finished ? "我的战力成绩单" : "查看结果"
        }
    },
    methods: {

    },
    components: {
        TopHeader,
        IconVue
    }
}
</script>