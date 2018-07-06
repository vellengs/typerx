![typerx](https://i.imgur.com/TA79x5U.png)

# typerx

一个轻量基于 typescript 注解接口的可延伸扩展的系统, 专注于自动的接口维护, 让前后端开发平滑无隙。

[English README](README.md)

# 项目缘由

近年来前端技术的野蛮发展，虽然促进了前端岗位的专业化，但逐渐的前后端的割裂也越发明显，这种沟隙不仅在后端产生也包括的系统的设计者。
如何填补好前端、后端以及系统设计者之间的鸿沟， 这便是typerx 努力的方向。

- typerx 希望帮助前端适当延展到后端, 主要是掌握接口标准化，能模拟后端接口，或者简单实现小型系统后端。
- typerx 希望帮助后端延展到前端，对于非高交互类（无需定制复杂组件，或者基础组件）使用现成的组件、页面复用进行系统生产。
- typerx 希望帮助设计人员，更好的迭代系统设计，保持模型、接口、代码以及文档的同步更新，更好的进行团队交流。


# 功能模块

### 系统管理
- 设置管理 
- 帐号管理  
- 菜单管理 
- 角色管理
- 字典管理
- 日志管理

### 简单的 CMS 模块
- 页面管理
- 文章管理
- 分类管理
- 媒体管理
- 小部件管理 

# 项目演示
  [typerx 演示](http://typerx.top) 
  使用 admin:888888  登录

### 快速开始

```bash
# clone our repo
# --depth 1 removes all but one .git commit history
$ git clone --depth 1 https://github.com/vellengs/typerx.git

# change directory to our repo
$ cd typerx

# import system default data
$ npm run import

# install the repo with npm
$ npm install

# start the server
$ npm start

```

### 测试

```
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

### 使用的技术栈

#### angular >= 5;

[angular](https://github.com/angular/angular)

#### ant design angular version zorro
[ng-zorro](https://github.com/NG-ZORRO/ng-zorro-antd)

#### ng-zorro-antd admin panel front-end framework
[ng-alain](https://github.com/cipchk/ng-alain)


