#!/bin/bash

# 部署脚本 - 构建前端并部署到Vercel

echo "🚀 开始部署流程..."

echo "📦 构建前端应用..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ 前端构建成功"
    echo "🌐 部署到Vercel..."
    vercel --prod
else
    echo "❌ 前端构建失败，停止部署"
    exit 1
fi

echo "🎉 部署完成！"