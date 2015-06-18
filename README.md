
## 介绍

Roof 是一个能帮助你构建高质量单页应用的前端框架，它擅长于管理应用数据和逻辑。特别适用于数据概念多、业务逻辑复杂的项目。使用 Roof 之后，应用的可维护性、可扩展性将得到大幅提升。

它和具体的渲染框架无关，但是配合 React 使用的话能实现服务器端渲染等高级功能。  
以下是常用的 Roof 资源：

 - [Roof 使用文档](http://si.alipay.im/roof/roof-book/)
 - [Roof Demo](http://gitlab.alipay-inc.com/roof/roof-demo/tree/master)
 - [Roof Dev Tool](http://gitlab.alipay-inc.com/roof/roof-dev-tool/tree/master)



## 开发文档

 - [设计概览](https://docs.google.com/document/d/1lGEA_hwCrRqnnMVbNLT318IYO68u35-uUdU2X7cxCDs/edit?usp=sharing)
 - [技术架构概览](https://docs.google.com/document/d/1vJy815sliqTGTTKUPs6zapi5MsdKni81GAeIIpDlSas/edit?usp=sharing)
 - [浏览器端对象状态实现](https://docs.google.com/document/d/1jH1OIxtbyv_39GjsIa1fc5yWb3d4WId8FZndSvpnsH8/edit?usp=sharing)
 - [浏览器端对象集合设计](https://docs.google.com/document/d/1IGVabrlpGDul-vLjpr5r599kDhlbfyc4Bi58VhaNZGw/edit?usp=sharing)
 - [应用实现中的问题和解决方案](https://docs.google.com/document/d/1fsc5JZCSopnL1UoWHK0b4Nrp2zmdGEZl6wPqtWAmviY/edit?usp=sharing)
 - [React Mixin 实现](https://docs.google.com/document/d/1L7m8h4o8d1f2g_tcKFC8oKRnt0Csbv_tnazVka8p0TU/edit?usp=sharing)
 - [事件系统设计](https://docs.google.com/document/d/1UW9Lci7KpvPNXLG7n5v_SIEQQOQzIwtHIos44Fl020s/edit?usp=sharing)

## 进度规划

 - [ ] 事件代理类开发 (12)
   - [x] 模块功能梳理，代码小范围重构 (3)
   - [x] waitFor 选项 (1)
   - [x] blockFor 选项 (1)
   - [x] 无 module 模式 (1)
   - [ ] 服务器端支持 generator (2)
   - [ ] 将调用栈记录功能移到时间代理类外 (2)
   - [x] 内存泄露检测 (2)
 - [x] 与 前端 结合 (2)
   - [x] 通过打包程序自动构造数据源 (1)
   - [x] 通过打包程序自动构造事件源 (1)
 - [x] 开发工具
   - [x] 实时记录事件流，详细设计见[文档](https://docs.google.com/document/d/1Mui2n5_Ei50JwnBK8bLrAXHT_KNZQXL_69eF0z0WoQ0/edit?usp=sharing)
 - [ ] 与 chair 结合 (8)
   - [ ] 后端基于事件的模块化 (3)
   - [ ] 前端事件与后端事件调用合流 (1)
   - [ ] 增加开发模式，可导出调用栈，支持调试工具 (1)
   - [ ] 与权限中心结合 (1)
   - [ ] 前后端统一的可插拔模块化，自动支持一套代码，通过配置项调配模块 (2)
 - [ ] 开发实践 (1)
