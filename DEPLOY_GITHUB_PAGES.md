# 发布到 GitHub Pages

本网站是纯静态 HTML/CSS/JavaScript，无需安装依赖或执行构建命令。

## 当前结构

- `index.html`：主页内容与项目卡片
- `assets/css/styles.css`：视觉样式与移动端适配
- `assets/js/main.js`：导航、滚动动画和视频播放控制
- `assets/posters/`：视频封面
- 仓库根目录下的五个 `.mp4`：项目视频

## 推荐发布方式

1. 在 GitHub 新建一个空的公开仓库，名称设为 `<你的用户名>.github.io`，不要勾选自动创建 README、License 或 `.gitignore`。
2. 进入已经整理好的独立网站目录并初始化新仓库：

   ```bash
   cd portfolio-site
   git init -b main
   git remote add origin https://github.com/<你的用户名>/<你的用户名>.github.io.git
   ```

3. 使用命令行提交网站和视频（GitHub 网页上传单文件只支持到 25 MiB，不能用浏览器上传这些视频）：

   ```bash
   git add .
   git commit -m "Add robotics portfolio website"
   git push -u origin main
   ```

4. 打开仓库 `Settings → Pages`。
5. 在 `Build and deployment` 中选择 `Deploy from a branch`。
6. 分支选择 `main`，目录选择 `/(root)`，点击 `Save`。
7. 等待约 1–3 分钟后访问 `https://<你的用户名>.github.io/`。

> 请只在 `portfolio-site/` 中初始化和推送。它是独立发布包，不包含上级目录中的简历、照片、字体或 LaTeX 文件。

## 添加新视频

1. 将 H.264 编码的 MP4 文件放到仓库根目录。GitHub 会对超过 50 MiB 的文件给出警告，并阻止超过 100 MiB 的文件；现有五段视频均未超过硬限制。
2. 使用 FFmpeg 生成 WebP 封面：

   ```bash
   ffmpeg -ss 5 -i your-video.mp4 -frames:v 1 \
     -vf "scale=1280:720:force_original_aspect_ratio=increase,crop=1280:720" \
     -c:v libwebp -quality 82 assets/posters/your-video.webp
   ```

3. 在 `index.html` 中复制一个 `.project-card`，修改标题、简介、封面和视频地址：

   ```html
   <video controls playsinline preload="none" poster="assets/posters/your-video.webp">
     <source src="your-video.mp4" type="video/mp4">
   </video>
   ```

4. 提交并推送，GitHub Pages 会自动更新。

## 视频压缩建议

如视频接近 100 MB，建议压缩为网页版本，保留原始文件在本地：

```bash
ffmpeg -i input.mp4 -c:v libx264 -crf 26 -preset slow \
  -movflags +faststart -c:a aac -b:a 128k output-web.mp4
```

`-movflags +faststart` 可以把 MP4 索引移到文件开头，改善网页端开始播放的速度。
