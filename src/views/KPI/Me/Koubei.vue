<template>
    <div class="d-flex flex-column">
        <TopHeader :name="name" class="mb-5" />
        <div>
            <div class="card mb-4">
                <div class="card-body">
                    <div class="fs-5 fw-bold">快来获取你的群像口碑！（邀请与你并肩作战的TA）</div>
                    <div class="fs-sm text-muted py-2">
                        <img src="@/assets/img/l6c4ysvk.png" class="icon-tip me-1" />
                        <span>{{ isActiveString }}</span>
                    </div>
                    <img class="pic" src="@/assets/img/l6c4ysvm.png" />
                </div>
            </div>
            <div>
                <div class="fw-bold fs-6 mb-2">随机匹配</div>
                <div class="fs-sm text-muted mb-4"><span v-if="isActive">（随机匹配2人）</span><span
                        v-else>截止评价后，点击战友可看到TA对你的评价</span></div>
                <div class="w-25" v-if="isActive && !comments.length">
                    <div class="d-grid gap-2">
                        <button class="btn btn-danger btn-sm" @click="getComments()">开始匹配</button>
                    </div>
                </div>
                <div v-if="comments.length">
                    <div class="mb-2">
                        <button class="btn btn-sm me-2"
                            :class="key === this.thisCommentIndex ? 'btn-outline-danger' : 'btn-outline-secondary'"
                            v-for="(item, key) of comments" :key="key" @click="thisCommentIndex = key">战友{{ key +
                                    1
                            }}号</button>
                    </div>
                    <div class="card fs-sm text-muted">
                        <div class="card-body">
                            {{ this.comments[thisCommentIndex].suggest || '战友的评价' }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
.icon-tip {
    display: inline-block;
    width: 1em;
    height: 1em;
    object-fit: contain;
}

.pic {
    position: absolute;
    right: 9%;
    bottom: 0;
    width: 7rem;
}
</style>
<script>
import moment from 'moment';
import { checkTimestamp } from '@/assets/js/util'
import TopHeader from '../../../components/KPI/TopHeader.vue'
export default {
    data() {
        return {
            name: "",
            isActive: !0, // 是否在进行
            endTime: '',
            thisCommentIndex: 0,// 当前选中的评论索引
            comments: []
        }
    },
    computed: {
        isActiveString() {
            return this.isActive ? '该环节在进⾏中' : '该环节在已在' + this.endTime + '截⽌'
        }
    },
    created() {
        this.checkIsActive();
    },
    methods: {
        checkIsActive() {
            let data = {
                code: 1,
                data: {
                    endTime: 1661788800,
                    isActive: true
                }
            }
            this.isActive = data.data.isActive;
            this.endTime = moment(checkTimestamp(data.data.endTime)).format('yyyy-MM-DD HH:mm:ss');
        },
        getComments() {
            this.comments = [
                {
                    id: Math.random() * 100 | 0,
                    uid: 1,
                    touid: 2,
                    type: 0,
                    suggest: ''
                },
                {
                    id: Math.random() * 100 | 0,
                    uid: 3,
                    touid: 2,
                    type: 0,
                    suggest: ''
                }
            ]
        }
    },
    components: {
        TopHeader
    }
}
</script>