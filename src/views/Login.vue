<template>
    <div class="login d-flex flex-fill justify-content-center align-items-center">
        <div class="login-form card border-0">
            <div class="card-body">
                <img src="../assets/img/l6c4ysvc.png" class="logo" />
                <div class="text-center fw-bold fs-5 my-4">壹作人战力评估系统</div>
                <div class="mb-3">
                    <label class="form-label">账号</label>
                    <input type="text" :class="{
                        'is-valid': userName,
                        'is-invalid': !userName
                    }" v-model="userName" class="form-control" placeholder="输入登录账号">
                </div>
                <div class="mb-4">
                    <label class="form-label">密码</label>
                    <input type="password" :class="{
                        'is-valid': userPassword,
                        'is-invalid': !userPassword
                    }" v-model="userPassword" class="form-control" placeholder="输入登录密码">
                    <div class="text-secondary fs-sm my-1">忘记密码请找管理员修改你的密码</div>
                </div>
                <div class="d-grid gap-2 mb-5">
                    <button class="btn btn-danger btn-sm" :disabled="!userName || !userPassword"
                        @click="login()">登录</button>
                    <div v-if="isLoginFailed" class="text-danger fs-sm">账号或密码错误!</div>
                </div>
            </div>
        </div>
    </div>
    <div v-if="isOver" class="game-over position-fixed w-100 h-100 d-flex justify-content-center align-items-center">
        <div class="card w-75 h-50">
            <div class="bg bg-1 pe-none w-100 h-100 position-absolute">
            </div>
            <div class="bg bg-2 pe-none w-100 h-100 position-absolute">
            </div>
            <div class="card-body d-flex justify-content-center align-items-center" style="z-index:1">
                <div class="text-center">
                    <div class="fs-3 fw-bold mb-2">2022第0期评价通道已关闭</div>
                    <div class="">战友如有疑问，请联系管理员吧～</div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
.login {
    background-image: url('../assets/img/l6c4ysvb.png');
    background-size: contain;
    background-repeat: no-repeat;
    background-position: 50%;
    background-color: rgba(0, 0, 0, .05);
}

.login-form {
    width: 32vw;
}

.logo {
    width: 10vw;
}

.game-over {
    background-color: rgba(0, 0, 0, .5);
    z-index: 1023;
}

.game-over .bg {
    background-image: url(../assets/img/l6c4ysvd.png);
    background-repeat: no-repeat;
    background-size: auto 18vw;
    background-position: 100% 0%;
    z-index: 0;
}

.bg-2 {
    transform: rotateX(180deg) rotateY(180deg);
}
</style>
<script>

export default {
    data() {
        return {
            userName: "",
            userPassword: "",
            isOver: false, // 是否已经结束了
            isLoginFailed: false, //是否登录失败
        }
    },
    methods: {
        login() {
            if (this.userName === 'henhaohh' && this.userPassword === '123456') {
                console.log(this.$router);
                sessionStorage.setItem('isAuthenticationed', 'true');
                this.$router.replace({ path: '/way' });
            } else {
                this.isLoginFailed = true;
                setTimeout(() => {
                    this.userName = '';
                    this.userPassword = '';
                    this.isLoginFailed = false;
                }, 3e3);
            }
        }
    }
}
</script>
