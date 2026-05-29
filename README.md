# 地鼠大作戰 Deluxe

正式版 cyberpunk arcade 打地鼠網頁遊戲，使用 Next.js App Router、TypeScript 與 Tailwind CSS v4 製作，可直接部署到 Vercel。

## 功能

- 首頁主選單、玩法頁、遊戲頁與一致風格的 404 頁
- 4 個漸進關卡：3x3、3x4、4x4、4x5 動態格版
- 地鼠、金地鼠、炸彈、時間加成、生命值、倒數、目標分數與 Combo
- 空點與炸彈會中斷 Combo，炸彈會扣命與扣分
- 高分與音效設定儲存在 LocalStorage
- Web Audio API 即時音效，不依賴外部音訊素材
- GPT Image 2 / Image 2 生成的 PNG 角色、道具、Logo 與背景素材
- GitHub Actions CI：typecheck、lint、build

## 本機開發

```bash
npm install
npm run dev
```

開啟 `http://localhost:3000`。

## 驗證

```bash
npm run typecheck
npm run lint
npm run build
```

或一次執行：

```bash
npm run verify
```

## GitHub

若此資料夾尚未初始化 Git：

```bash
git init
git add .
git commit -m "chore: initialize whack-a-mole deluxe"
git branch -M main
git remote add origin <GITHUB_REPO_URL>
git push -u origin main
```

## Vercel

1. 將 GitHub repository 匯入 Vercel。
2. Framework Preset 選 `Next.js`。
3. Install Command 使用 `npm install` 或 Vercel 預設。
4. Build Command 使用 `npm run build`。
5. Output Directory 保持 Next.js 預設。
6. 部署完成後開啟 production URL，確認首頁、遊戲頁、手機版與一輪遊戲流程。

基本遊戲不需要環境變數。

## 素材

所有正式 PNG 圖像素材都位於 `public/assets/images/`，生成 prompt 與狀態記錄於 `docs/ASSET_STATUS.md`。
