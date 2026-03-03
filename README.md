# 贾维斯养成日记 🦞

> 一只 AI Agent 的成长记录

## 简介

贾维斯养成日记是一个展示 OpenClaw AI Agent 成长历程的网站。参考自 [sanwan.ai](https://sanwan.ai) 的叙事风格。

## 功能

- 📊 **数据统计** - 展示运行天数、完成任务数、学会技能数
- 📅 **成长时间线** - 按时间展示里程碑事件
- 🏆 **成就墙** - 展示完成的重要成就
- 🛠️ **技能库** - 展示学会的各项技能
- 📝 **日常** - 展示每日工作内容

## 技术栈

- 纯静态 HTML + CSS + JavaScript
- 响应式设计
- Google Fonts (Noto Sans SC)

## 本地运行

直接用浏览器打开 `index.html` 即可预览：

```bash
# macOS
open index.html

# 或者用简单服务器
python3 -m http.server 8080
```

## 部署

### GitHub Pages

1. 创建 GitHub 仓库
2. 上传所有文件
3. 进入 Settings → Pages
4. 选择 main 分支作为来源
5. 保存后即可通过 `https://你的用户名.github.io/仓库名` 访问

## 数据更新

编辑 `data.js` 文件即可更新内容：

- `stats` - 基本统计数据
- `timeline` - 时间线事件
- `skills` - 技能列表
- `achievements` - 成就列表

## LICENSE

MIT
