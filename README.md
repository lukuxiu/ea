# 北邮 801 通信原理历年真题刷题（跨浏览器同步版）

## 已有功能
- 451 道客观题卡片
- 选择题 / 填空题 / 判断题
- 年份、题型、题号筛选
- 随机题、上一题、下一题
- 显示/隐藏答案
- “掌握 / 不会”标记
- 原题 PDF 对照
- 手机端适配
- 未登录时 localStorage 本机保存
- **Supabase 邮箱账号登录后，刷题进度自动云同步，可跨 Chrome / Edge / 手机同步**

## 第一次配置云同步

### 1. 创建 Supabase 项目
打开 https://supabase.com/ 创建项目。

### 2. 创建数据库表
进入 Supabase Dashboard → SQL Editor，把本目录的 `supabase_setup.sql` 全部复制进去运行。

### 3. 开启邮箱登录
进入 Authentication → Providers → Email，开启 Email provider。

如果不想验证邮箱，可以在开发/个人使用阶段关闭 Confirm email；正式使用建议保留邮箱验证。

### 4. 填写网站配置
进入 Supabase Project Settings → API，找到项目 URL 和 publishable key（旧项目可能显示 anon key）。

编辑 `config.js`：

```js
window.SUPABASE_CONFIG = {
  url: "你的 Supabase Project URL",
  anonKey: "你的 publishable/anon key"
};
```

**不要把 service_role / secret key 放进网页。**

### 5. 部署 GitHub Pages
把以下文件上传到 GitHub 仓库根目录：

- `index.html`
- `questions.json`
- `config.js`
- `source.pdf`

`supabase_setup.sql` 可以留在仓库，也可以删除；它只是数据库初始化脚本。

GitHub → Settings → Pages → Deploy from a branch → main → `/ (root)`。

## 数据同步逻辑

- 没登录：继续使用本机 localStorage，网站仍可离线刷题。
- 登录后：从 Supabase 读取当前账号的进度。
- 如果本机有云端没有的旧进度，会自动上传。
- 云端已经存在的记录以云端为准。
- 点击“掌握 / 不会 / 取消标记”后立即写入云端。
- Supabase Auth 默认会持久化浏览器会话，因此同一浏览器再次打开网站通常不需要重新登录。

## 安全

刷题进度表开启 Row Level Security（RLS），每个账号只能读写自己的 `quiz_progress` 行。

题库 `questions.json` 和原题 PDF 是公开静态资源，不包含账号隐私。
