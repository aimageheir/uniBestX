<p align="center">
  <a href="https://github.com/cq112233/unibestX">
    <img width="140" src="static/logo-rounded.png" alt="unibestX logo">
  </a>
</p>

<h1 align="center">unibestX</h1>

<p align="center">
  面向 <strong>uni-app X</strong> 的现代开发模板<br>
  Vue 3 · UTS · Vite 5 · Tailwind CSS · Vapor / VDOM
</p>

<p align="center">
  <a href="https://github.com/cq112233/unibestX/stargazers"><img src="https://img.shields.io/github/stars/cq112233/unibestX?style=flat-square" alt="Stars"></a>
  <a href="https://github.com/cq112233/unibestX/network/members"><img src="https://img.shields.io/github/forks/cq112233/unibestX?style=flat-square" alt="Forks"></a>
  <a href="https://github.com/cq112233/unibestX/blob/main/LICENSE"><img src="https://img.shields.io/github/license/cq112233/unibestX?style=flat-square" alt="License"></a>
  <img src="https://img.shields.io/badge/Node.js-%3E%3D22.22.2-green?style=flat-square" alt="Node.js">
  <img src="https://img.shields.io/badge/pnpm-%3E%3D10.0.0-orange?style=flat-square" alt="pnpm">
  <img src="https://img.shields.io/badge/HBuilderX-%3E%3D5.26-blue?style=flat-square" alt="HBuilderX">
</p>

<p align="center">
  <a href="https://cq112233.github.io/unibestX/">在线演示</a> ·
  <a href="https://cq112233.github.io/unibestX/docs/">在线文档</a> ·
  <a href="https://github.com/cq112233/unibestX">GitHub</a> ·
  <a href="https://gitee.com/htwoO-cq/uni-best-x">Gitee</a> ·
  <a href="https://github.com/cq112233/unibestX/issues">问题反馈</a>
</p>

## 为什么要有这个项目？

### 「不是已经有 AI 了吗？」

现在各类 AI 编程助手与 Agent 已经非常强大，往往几句提示词就能刷刷生成出代码和页面。但真正用在实际业务中时，大家普遍会发现一个致命痛点：

> **AI 虽能帮你迅速生成代码，但它缺乏全局的「工程化」概念，生成出来的代码可维护性会差很多。**

- **缺乏全局架构思维**：AI 擅长局部单函数或单个组件片段的输出，但它无法自发为你设计清晰的目录分层、路由守卫体系、统一网络拦截层、状态流转以及跨端环境兼容；任由 AI 随意生成，各页面各自为政，逻辑重复散落。
- **“一次性代码”难以长期维护**：缺乏工程规范约束的 AI 代码，充斥着硬编码假数据、随意的全局状态、隐式类型推导以及缺失的边界异常处理。Demo 跑通看似很快，但一旦业务迭代、接口联调或多人协作，重构和维护成本极高。
- **uni-app X 严苛底层对工程化要求极高**：uni-app X 采用严格的 UTS 静态编译与原生多端渲染（Android Kotlin · iOS Swift · 鸿蒙 ArkTS），对强类型契约、零 `interface`、显式类型推导有着严苛的底线要求。没有系统级规范沉淀，AI 生成的代码极易在多端编译期触发各种转译深坑。

---

### unibestX 的使命：为 AI 与开发者构筑「工程化底座与轨道护栏」

**unibestX 为抹平痛点、重塑工业级跨端体验而生：**

- 🧱 **完备的企业级工程基建**：内置成熟的脚手架、`route-bestX` 业务守卫、`request-bestX` 网络请求与异步缓存、Vapor / VDOM 双引擎自适应与 5 种 TabBar 运行时深度集成，开箱即是规范的工程底座。
- 🛡️ **让 AI 生成具备高可维护性的健壮代码**：
  - **独创的 Skill 规范知识库体系**：内置结构化 `unibestX-skill`（**1 个顶层入口 + 11 个领域专业分册**），全方位涵盖 UTS 语法、Tailwind 样式、跨端运行时报错、API 契约冻结、路由编排与前端美学设计；
  - **精细的 Agent 规则与代码门禁**：结合自研 `eslint-plugin-uts` 与项目底线规则（Always On），给 AI 戴上“工程化护栏”，让 AI 从“放飞自我瞎写”变成“严格按照生产级规范输出代码”，从源头杜绝屎山代码与编译报错；
  - **极致的 Token 控制与 Vibe Coding 体验**：通过精确分册索引与任务复杂度分级门槛，杜绝 AI 盲目全量扫描上百万行依赖文件，大幅缩短往返纠错时间并节约 Token。
- 🧠 **抹平前端开发者心智负担**：全面沿用 Web 工程师最熟悉的 Vue 3 组合式 API 开发体验。底层提前踩平对象字面量赋值、隐式类型转换、鸿蒙 ArkTS 模板解析异常等数百个底层转译深坑，让前端开发者零障碍迈入原生跨端时代。

## 特性

- 一套代码运行到 Android、iOS、鸿蒙、H5、微信小程序和支付宝小程序。
- 5 种 TabBar 运行模式、2 种 UI 形态，并支持原生液态玻璃。
- 内置 `route-bestX` 路由守卫与 `request-bestX` 请求、缓存和异步状态 hooks。
- Pinia / `x-pinia-s` 双模式状态管理，按运行环境自动切换。
- 自动文件路由、OpenAPI 接口生成、多语言、主题、上传下载与 SSE 流式请求。
- 内置 ESLint、Stylelint、TypeScript、Vitest、Husky 和 GitHub Actions。
- 自带 `unibestX-skill`，让 AI Agent 按项目规范生成和检查代码。

## 快速开始

### 环境要求

- Node.js `>= 22.22.2`
- pnpm `>= 10.0.0`
- HBuilderX `>= 5.26`
- Android：JDK 17 + Android SDK
- iOS：macOS + Xcode
- 鸿蒙：DevEco Studio

### 创建项目

```bash
# 交互式脚手架（推荐）
pnpm create unibestx my-app

# Gitee 镜像克隆（国内推荐）
git clone https://gitee.com/htwoO-cq/uni-best-x.git my-app

# 无 UI 库基线
npx degit cq112233/unibestX my-app

# Rice UI 分支
npx degit cq112233/unibestX#uniX-rice-ui my-app
```

### 安装与运行

```bash
cd my-app
pnpm install
pnpm dev:web
```

> App 与小程序编译依赖本机已启动的 HBuilderX。完整环境说明见[快速开始](https://cq112233.github.io/unibestX/docs/guide/getting-started)。

## 文档

| 文档 | 内容 |
| :--- | :--- |
| [介绍](https://cq112233.github.io/unibestX/docs/guide/introduction) | 技术栈、能力与分支说明 |
| [快速开始](https://cq112233.github.io/unibestX/docs/guide/getting-started) | 创建项目、安装依赖与运行 |
| [TabBar 专题](https://cq112233.github.io/unibestX/docs/guide/tabbar) | 模式、配置、UI 形态与 hooks |
| [路由篇](https://cq112233.github.io/unibestX/docs/guide/route) | 路由跳转、参数读取、守卫与错误码 |
| [请求篇](https://cq112233.github.io/unibestX/docs/guide/request) | 请求实例、异步 hooks、缓存、上传下载 |
| [自动生成接口](https://cq112233.github.io/unibestX/docs/guide/api-generator) | Apifox / OpenAPI 生成 UTS 类型 |
| [CLI 开发指南](https://cq112233.github.io/unibestX/docs/guide/cli) | 各平台运行与构建命令 |

完整目录见[在线文档](https://cq112233.github.io/unibestX/docs/)。

## 常用命令

| 命令 | 说明 |
| :--- | :--- |
| `pnpm dev:web` | 运行到 H5 |
| `pnpm dev:app-android` | 运行到 Android |
| `pnpm dev:app-ios` | 运行到 iOS 模拟器 |
| `pnpm dev:app-harmony` | 运行到鸿蒙 |
| `pnpm dev:mp-weixin` | 运行到微信小程序 |
| `pnpm build:h5` | 构建 H5 |
| `pnpm build:test` / `pnpm build:prod` | 按环境构建 H5 |
| `pnpm api:gen` | 生成强类型接口 |
| `pnpm manifest` | 同步 `manifest.json` |
| `pnpm docs:dev` | 启动本地文档站 |
| `pnpm typecheck` | TypeScript 类型检查 |
| `pnpm lint:all` | ESLint + Stylelint |
| `pnpm test` | 运行单元测试 |
| `pnpm health` | 项目健康检查 |
| `pnpm clean:demo` | 清理演示页面与入口 |

## 项目结构

```text
unibestX/
├── docs/                 # VitePress 文档
├── plugins/              # Vite 构建插件
├── scripts/              # 开发、构建与发布脚本
├── src/
│   ├── api/              # 业务接口层
│   ├── components/       # 公共组件
│   ├── http/             # 业务请求实例
│   ├── pages/            # 主包页面
│   ├── router/           # 路由与守卫
│   ├── store/            # 状态管理
│   ├── sub/              # 分包页面
│   ├── tabbar/           # TabBar 配置与运行时
│   ├── theme/            # 主题与设计令牌
│   └── utils/            # 通用工具
├── uni_modules/          # 跨端插件
├── pages.config.json     # 页面配置源
├── manifest.config.ts    # manifest 配置源
└── theme.json            # 亮色 / 暗色配色源
```

## 贡献

提交前请运行 `pnpm health`、`pnpm typecheck`、`pnpm lint:all` 和 `pnpm test`。页面、接口与路由代码请遵循 [AGENTS.md](AGENTS.md) 和 `unibestX-skill` 中的项目规范。

## 联系与交流

- 微信：`cq_81894`（添加请备注来意）
- QQ 技术交流群：`983313908`

<p align="center">
  <img src="https://i.ibb.co/fdkLsmTv/qq-uni-Best-X.png" width="220" alt="QQ 技术交流群">
</p>

## 支持项目

如果这个项目对你有帮助，欢迎点一个 Star。也可以请作者喝杯咖啡：

<p align="center">
  <img src="https://i.ibb.co/rKHkpcHP/wx.jpg" height="300" alt="微信赞赏码">
</p>

## License

[MIT](LICENSE) © 2026 HTwoO
