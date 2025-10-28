# Vercel 部署指南

## 配置说明

本项目已配置为在Vercel部署时自动构建前端React应用并将其放置在后端的`public`目录中。

### 配置文件说明

1. **vercel.json**: 配置了Vercel的构建和路由规则
   - 自动执行`npm run build`构建前端
   - 配置路由：`/api/*` 路径转发到后端，其他路径访问前端静态文件

2. **vite.config.js**: 前端构建配置
   - 输出目录设置为`../phonebook_backend/public`
   - 构建时会清空目标目录

3. **package.json**: 添加了构建和部署脚本
   - `build`: 构建前端应用
   - `deploy`: 构建并部署到Vercel

## 部署方法

### 方法一：使用npm脚本
```bash
cd phonebook_backend
npm run deploy
```

### 方法二：使用部署脚本
```bash
cd phonebook_backend
./deploy.sh
```

### 方法三：手动部署
```bash
cd phonebook_backend
npm run build  # 构建前端
vercel --prod   # 部署到Vercel
```

## 路由说明

部署后的访问路径：
- `/` - 前端React应用
- `/api/*` - 后端API接口
- `/health` - 健康检查接口

## 注意事项

1. 确保已安装并配置Vercel CLI
2. 首次部署需要运行`vercel`进行项目初始化
3. 构建的前端文件会自动放在`public`目录，无需手动复制
4. 构建的文件已在`.gitignore`中忽略，不会提交到git仓库