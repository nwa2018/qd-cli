# qd-cmli

> qd-cmli支持生成种子项目，开发，与输出生产环境的代码

### 安装
```
npm i qd-cmli -g
```
如果你不想全局安装的话
```
git clone git@github.com:nwa2018/qd-cli.git
cd qd-cli
npm i
npm link
```
### 使用
```
qd -v  输出版本号
qd     命令集
qd i   生成种子文件
qd d   开发
qd b   构建
```
### 特性
- qd-cmli内置了vue,vuex,vue-router,axios,jsonp,ramda,jquery,无需二次安装
- 支持es6语法，支持async,await,支持装饰器
- eslint采用standard规范
- 支持pug语法，stylus, scss
- 生产环境图片会自动压缩
- 支持单页应用，多页应用，支持项目集结构
- 支持少量的配置项
- 生产环境支持代码分割，懒加载，打哈希串

### issue
- 抽取出的css哈希串会跟js的一样，不利于浏览器做缓存


### 使用
- git clone git@github.com:nwa2018/qd-cli.git
- cd qd-cli
- npm i or yarn

种子文件：
```
git clone git@github.com:nwa2018/qd-vue-seed.git
```
目录的话随意，只要保证当前目录下有xxx.art跟对应的src目录的同名xxx.js即可

### 支持命令
进到种子文件里面
qd d 本地开发
qd b 构建

### 待补充？
dll打包
vue的css module支持
react支持
transform-vue-jsx vue jsx支持
transform-decorators-legacy es6装饰器支持
