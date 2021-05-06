export const imgerr = {
  inserted(dom, options) {
    // 自定义指令的这个钩子函数
    // 可以接受两个形参
    // 1. 当前dom本身
    // 2. 当前指令的配置参数, 允许传值
    // 这是指定使用指令的 dom 插入页面时需要的操作
    dom.onerror = function() {
      dom.src = options.value
    }
  }
}
