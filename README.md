#  B站消息中心背景更改 (BiliMsg BG)

> 专为Bilibili消息中心 `message.bilibili.com` 设计的轻量级油猴脚本。注入纯净背景，无亚克力/模糊/透明效果，完美兼容 BewlyBewly。

## 📄 许可证

本项目遵循 [GNU General Public License v3.0](https://www.gnu.org/licenses/gpl-3.0.html) 协议开源。  

您可**自由运行、研究、修改**及**分发**本软件；但任何基于本项目的衍生作品或修改版本，在分发时也**必须以相同的 GPL-3.0 协议开源**，并**向用户提供完整的对应源代码**。

## ✨ 特性

- 🎨 **纯净实色渲染**：无毛玻璃、无半透明遮罩、无 `backdrop-filter` 模糊，背景图 100% 原始清晰度显示
- 🛡️ **高优先级覆盖**：特异性选择器 + `body::before` 伪元素兜底 + 延迟注入，有效抵抗 BewlyBewly 的样式覆盖
- 🔄 **SPA 路由自适应**：内置 `history API` 监听与动态样式重应用，消息中心内切换页面自动恢复背景，无需手动刷新
- ⚡ **零运行时开销**：仅注入纯 CSS，脚本执行后无内存占用，不影响页面性能与滚动流畅度
- 📦 **开箱即用**：默认使用 B 站官方图片，安装保存即可生效

## 📦 前置要求

- 浏览器扩展：[Tampermonkey](https://www.tampermonkey.net/) / [Violentmonkey](https://violentmonkey.github.io/)
- 支持现代浏览器：`Chrome` / `Edge` / `Firefox` / `Safari`

## ⚙️ 自定义配置

脚本头部及 CSS 块已预留修改入口，按需调整即可：

| 需求 | 修改位置 | 示例 |
|---|---|---|
| 🔗 更换背景图 | `const IMAGE_URL = '...'` | 替换为任意 `.jpg/.png/.webp` 直链 |
| 📜 背景随滚动 | 删除 `background-attachment: fixed !important;` | 保持页面滚动时背景跟随 |
| 🖼️ 图片平铺模式 | 替换 `background-size: cover` | 改为 `background-size: auto; background-repeat: repeat;` |
| 🌙 暗色模式适配 | 修改 `@media (prefers-color-scheme: dark)` 块 | 调整 `filter` 参数或注释掉整段 |

## 🛡️ 兼容性说明

| 插件/环境 | 兼容状态 | 备注 |
|---|---|---|
| **BewlyBewly** | ✅ 完美兼容 | 内置对抗逻辑，2.5s 延迟注入确保样式优先级 |
| **Bilibili Evolved** | ⚠️ 可能冲突 | 建议在 Evolved 设置中关闭「背景美化」相关功能 |
| **浏览器暗色模式** | ✅ 自动适配 | 默认保留原图，不强制调暗或加遮罩 |
| **移动端浏览器** | ✅ 响应式 | 使用 `100vw/100vh` 适配，无白边/错位 |

## 🐛 常见问题 (FAQ)

- <details>
<summary><b>Q: 背景闪一下后又变回原样/被覆盖？</b></summary>
A：将脚本头部的 <code>setTimeout</code> 延迟从 <code>2500</code> 调整至 <code>3500</code> 或 <code>4000</code>，确保晚于 BewlyBewly 初始化完成。
</details>

- <details>
<summary><b>Q: 部分区域仍有白色背景或毛玻璃效果？</b></summary>
A：按 <code>F12</code> → <code>Elements</code> 检查该区域的 <code>class</code>，在脚本 CSS 的「清除干扰」区块追加对应选择器，例如：<code>.new-container { background: transparent !important; backdrop-filter: none !important; }</code>
</details>

- <details>
<summary><b>Q: 图片加载失败/显示破碎？</b></summary>
A：① 确认图片链接为直链（新标签页可直接打开）<br>② 避免使用防盗链严格的图床，推荐 <code>GitHub</code> / <code>B站官方图床</code><br>③ 检查浏览器控制台 <code>Network</code> 面板是否返回 <code>403</code>
</details>

## 🙏 致谢

- [Tampermonkey](https://www.tampermonkey.net/) 提供强大的用户脚本运行环境

- [BewlyBewly](https://github.com/hakadao/bewlybewly) 优秀的 B 站美化方案（本脚本针对其样式注入逻辑进行兼容适配）

- 所有贡献 `Issue`与反馈的用户

## 🖥️ 浏览次数

  <img src="https://count.getloli.com/@Minecraft_365871?name=Minecraft_365871&theme=rule34&padding=16&offset=0&align=top&scale=2&pixelated=1&darkmode=auto"/>