import router from '@/router'
import store from '@/store'

router.beforeEach((to, from, next) => {
  // 白名单
  const whiteList = ['/login', '/404']
  const token = store.getters.token
  const url = to.path
  // 有token
  if (token && url !== '/login') next()
  // 有token 在登录页面
  if (token && url === '/login') next('/')
  // 没token 在白名单里面 放行
  if (!token && whiteList.includes(url)) next()
  // 没token 不在白名单 跳到登录页
  if (!token && !whiteList.includes(url)) next('/login')
})
