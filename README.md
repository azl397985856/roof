
## 示例

clone 到本地，在根目录下执行:

```
tnpm install
node server.js
```

打开浏览器到 [http://localhost:9000/demo/todo](http://localhost:9000/demo/todo)。
[应用讲解视频](http://yunpan.alibaba-inc.com/share/link/N2OiMbbNaJ)


## 文档

 - [设计概览](https://docs.google.com/document/d/1lGEA_hwCrRqnnMVbNLT318IYO68u35-uUdU2X7cxCDs/edit?usp=sharing)
 - [技术架构概览](https://docs.google.com/document/d/1vJy815sliqTGTTKUPs6zapi5MsdKni81GAeIIpDlSas/edit?usp=sharing)
 - [浏览器端对象状态实现](https://docs.google.com/document/d/1jH1OIxtbyv_39GjsIa1fc5yWb3d4WId8FZndSvpnsH8/edit?usp=sharing)
 - [浏览器端对象集合设计](https://docs.google.com/document/d/1IGVabrlpGDul-vLjpr5r599kDhlbfyc4Bi58VhaNZGw/edit?usp=sharing)
 - [应用实现中的问题和解决方案](https://docs.google.com/document/d/1fsc5JZCSopnL1UoWHK0b4Nrp2zmdGEZl6wPqtWAmviY/edit?usp=sharing)
 - [React Mixin 实现](https://docs.google.com/document/d/1L7m8h4o8d1f2g_tcKFC8oKRnt0Csbv_tnazVka8p0TU/edit?usp=sharing)
 - [事件系统设计](https://docs.google.com/document/d/1UW9Lci7KpvPNXLG7n5v_SIEQQOQzIwtHIos44Fl020s/edit?usp=sharing)

## 进度规划

 - [ ] 事件代理类开发 (12)
   - [ ] 模块功能梳理，代码小范围重构 (3)
   - [ ] waitFor 选项 (1)
   - [ ] blockFor 选项 (1)
   - [ ] 无 module 模式 (1)
   - [ ] 服务器端支持 generator (2)
   - [ ] 将调用栈记录功能移到时间代理类外 (2)
   - [ ] 内存泄露检测 (2)
 - [ ] 与 前端 结合 (2)
   - [ ] 通过打包程序自动构造数据源 (1)
   - [ ] 通过打包程序自动构造事件源 (1)
 - [ ] 开发工具
   - [ ] 实时记录事件流，详细设计见[文档](https://docs.google.com/document/d/1Mui2n5_Ei50JwnBK8bLrAXHT_KNZQXL_69eF0z0WoQ0/edit?usp=sharing)
 - [ ] 与 chair 结合 (8)
   - [ ] 后端基于事件的模块化 (3)
   - [ ] 前端事件与后端事件调用合流 (1)
   - [ ] 增加开发模式，可导出调用栈，支持调试工具 (1)
   - [ ] 与权限中心结合 (1)
   - [ ] 前后端统一的可插拔模块化，自动支持一套代码，通过配置项调配模块 (2)
 - [ ] 开发实践 (1)
