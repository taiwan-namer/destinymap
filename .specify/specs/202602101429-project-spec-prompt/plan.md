# DestinyMap 技術實施計畫 (v1.0)

## 技術堆棧 (Tech Stack)

| 組件 | 技術選擇 | 理由 |
|------|----------|------|
| 框架 | Next.js 14 (App Router) | Spec 要求，支援 Server Actions 和 API Routes |
| 語言 | TypeScript (Strict Mode) | Spec 要求，型別安全 |
| 樣式 | Tailwind CSS | Spec 要求，快速 UI 開發 |
| AI 服務 | DeepSeek API | Spec 要求，透過 Server Actions 呼叫 |
| 部署 | Vercel | Spec 要求，原生支援 Next.js |
| 快取/限流 | Vercel KV (Upstash Redis) | Spec v2.0 決議，無伺服器 Redis |
| 分析 | Vercel Analytics | Spec v2.0 決議，簡單整合 |

## 架構概覽 (Architecture)

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   使用者介面     │    │   Next.js 14    │    │   外部服務      │
│  (Traditional   │◄──►│   App Router    │◄──►│                 │
│    Chinese)     │    │                 │    │  • DeepSeek API │
└─────────────────┘    │  • Server       │    │  • Klook 聯盟   │
                       │    Components   │    │  • Vercel KV    │
┌─────────────────┐    │  • Server       │    └─────────────────┘
│   資料流程       │    │    Actions     │
│                 │    │  • API Routes   │
│  輸入 → 驗證     │    └─────────────────┘
│  → AI 分析       │           │
│  → 聯盟匹配      │           ▼
│  → 結果顯示      │    ┌─────────────────┐
└─────────────────┘    │    環境變數      │
                       │                 │
                       │  • DEEPSEEK_API │
                       │  • KV_URL       │
                       │  • AFFILIATE_ID │
                       └─────────────────┘
```

## 實施計畫 (Implementation Plan)

### 階段 1: 專案初始化與設定 (Day 1-2)

#### R1.1: 建立 Next.js 專案
- [ ] 使用 `create-next-app@latest` 建立 TypeScript 專案
- [ ] 設定 Tailwind CSS
- [ ] 建立基本檔案結構
- **Spec Reference**: Part 1.1 Tech Stack

#### R1.2: 環境變數設定
- [ ] 建立 `.env.local` 範本
- [ ] 設定 `DEEPSEEK_API_KEY`
- [ ] 設定 `KV_REST_API_URL` 和 `KV_REST_API_TOKEN`
- [ ] 設定 `AFFILIATE_ID`
- **Spec Reference**: Spec v2.0 4.1 Security

#### R1.3: Vercel KV 設定
- [ ] 安裝 `@vercel/kv` 套件
- [ ] 建立 KV 連線工具
- [ ] 測試連線
- **Spec Reference**: Spec v2.0 3. Architecture & Rate Limiting

### 階段 2: 核心資料結構與工具 (Day 2-3)

#### US1.1: 建立目的地資料庫
- [ ] 建立 `/lib/destinations.json`
- [ ] 包含至少 20 個熱門旅遊城市
- [ ] 每個項目包含: city, country, keywords, affiliate_url
- **Spec Reference**: Spec v2.0 2. Affiliate Data Structure

#### US1.2: 建立工具函式庫
- [ ] `/lib/utils.ts` - 通用工具函式
- [ ] `/lib/validation.ts` - 輸入驗證
- [ ] `/lib/cache.ts` - 快取管理 (Vercel KV)
- [ ] `/lib/rate-limit.ts` - 限流邏輯
- **Spec Reference**: Spec v2.0 3. Rate Limiting Resolution

#### US1.3: 建立型別定義
- [ ] `/types/index.ts` - 主要型別定義
- [ ] 定義: `UserInput`, `DeepSeekResponse`, `TravelRecommendation`
- **Spec Reference**: Spec v2.0 1. AI Prompt Engineering

### 階段 3: AI 整合層 (Day 3-4)

#### US1.4: DeepSeek API 整合
- [ ] 建立 `/lib/deepseek.ts`
- [ ] 實作嚴格提示詞模板 (Spec v2.0 1.)
- [ ] 實作 JSON 解析與驗證
- [ ] 設定 20 秒超時
- **Spec Reference**: Spec v2.0 1. AI Prompt Engineering

#### US1.5: 聯盟連結匹配邏輯
- [ ] 建立 `/lib/affiliate-matcher.ts`
- [ ] 實作精確匹配演算法
- [ ] 實作動態回退 URL 生成
- [ ] 加入追蹤參數 (UTM)
- **Spec Reference**: Spec v2.0 2. Affiliate Data Structure

### 階段 4: 使用者介面 (Day 4-6)

#### US1.6: 主頁面 (`/app/page.tsx`)
- [ ] 建立 Traditional Chinese UI
- [ ] 實作輸入表單:
  - 姓名 (文字輸入)
  - 出生日期 (日期選擇器)
  - 出生時間 (時間選擇器 + "不知道" 核取方塊)
- [ ] 前端驗證 (日期不能是未來)
- **Spec Reference**: Spec v2.0 5. Acceptance Criteria

#### US1.7: 結果頁面 (`/app/result/page.tsx`)
- [ ] 建立 URL 參數解析 (Base64 解碼)
- [ ] 實作載入狀態 ("Divining..." 動畫)
- [ ] 顯示 AI 分析結果
- [ ] 顯示 3 個旅遊推薦卡片
- [ ] 每個卡片包含 "立即預訂" 按鈕 (聯盟連結)
- **Spec Reference**: Spec v2.0 4. URL Sharing & Encoding

#### US1.8: 錯誤處理 UI
- [ ] API 失敗: "星星被雲遮住了，請稍後再試"
- [ ] 未來日期: "無法讀取未出生者的未來"
- [ ] 限流: "今日運勢已算盡，請明日再來"
- **Spec Reference**: Spec v2.0 5. Error Handling

### 階段 5: 後端邏輯 (Day 6-7)

#### US1.9: Server Action (`/app/actions.ts`)
- [ ] 建立 `analyzeDestiny` Server Action
- [ ] 整合: 輸入驗證 → 限流檢查 → AI 呼叫 → 快取儲存
- [ ] 回傳分析結果和聯盟連結
- **Spec Reference**: Part 1.2 Core Logic

#### US1.10: 限流與快取實作
- [ ] 實作 IP 基礎限流 (5 次/小時)
- [ ] 實作 AI 回應快取 (24 小時)
- [ ] 使用雜湊鍵值: `Hash(姓名+日期+時間)`
- **Spec Reference**: Spec v2.0 3. Rate Limiting Resolution

### 階段 6: 分析與追蹤 (Day 7)

#### R1.3: 分析整合
- [ ] 設定 Vercel Analytics
- [ ] 追蹤事件: `form_submit`, `affiliate_click`
- [ ] 聯盟連結點擊追蹤
- **Spec Reference**: Spec v2.0 2. Analytics

#### R1.4: 聯盟揭露
- [ ] 在頁腳加入 "聯盟連結揭露"
- [ ] 在旅遊卡片標示 "聯盟連結"
- **Spec Reference**: Clarifying Questions 9. Affiliate Disclosure

### 階段 7: 測試與部署 (Day 8)

#### R1.5: 測試實作
- [ ] 單元測試: 輸入驗證邏輯
- [ ] 整合測試: 模擬 DeepSeek 回應
- [ ] 測試聯盟連結匹配
- **Spec Reference**: Spec v2.0 5. Testing Standard

#### R1.6: 部署準備
- [ ] Vercel 專案設定
- [ ] 環境變數設定
- [ ] 網域設定 (如需要)
- [ ] 最終測試
- **Spec Reference**: Part 1.1 Deployment

## 檔案結構

```
destinymap/
├── app/
│   ├── actions.ts              # Server Actions
│   ├── layout.tsx             # 根佈局
│   ├── page.tsx               # 主頁面 (輸入表單)
│   ├── result/
│   │   └── page.tsx           # 結果頁面
│   └── api/                   # (保留，如有需要)
├── components/
│   ├── ui/                    # 可重用 UI 元件
│   ├── FormInput.tsx          # 輸入表單元件
│   ├── ResultCard.tsx         # 旅遊卡片元件
│   └── LoadingSpinner.tsx     # 載入動畫
├── lib/
│   ├── destinations.json      # 目的地資料庫
│   ├── deepseek.ts           # DeepSeek API 整合
│   ├── affiliate-matcher.ts  # 聯盟連結匹配
│   ├── cache.ts              # 快取管理
│   ├── rate-limit.ts         # 限流邏輯
│   ├── validation.ts         # 輸入驗證
│   └── utils.ts              # 工具函式
├── types/
│   └── index.ts              # TypeScript 型別定義
├── tests/                    # 測試檔案
├── public/                   # 靜態資源
└── package.json
```

## 關鍵決策與限制

1. **無資料庫**: 嚴格遵守 Spec，不儲存 PII，僅使用 Vercel KV 做暫存
2. **Traditional Chinese Only**: 所有 UI 和 AI 輸出必須是繁體中文
3. **嚴格 JSON 結構**: DeepSeek 回應必須符合指定格式
4. **3 個推薦**: AI 必須回傳恰好 3 個旅遊推薦
5. **聯盟揭露**: 所有聯盟連結必須明確標示

## 風險與緩解

| 風險 | 影響 | 緩解措施 |
|------|------|----------|
| DeepSeek API 不穩定 | 服務中斷 | 設定 20 秒超時，顯示友好錯誤訊息 |
| 聯盟連結失效 | 收入損失 | 定期檢查 destinations.json，動態回退機制 |
| Vercel KV 成本 | 預算超支 | 監控使用量，設定用量警報 |
| 限流繞過 | 成本增加 | IP 雜湊，請求簽名驗證 |

## 成功標準

1. ✅ 使用者能輸入出生資料並取得紫微斗數分析
2. ✅ AI 回應為繁體中文且符合 JSON 格式
3. ✅ 顯示 3 個旅遊推薦含聯盟連結
4. ✅ 點擊追蹤正常運作
5. ✅ 限流機制有效 (5 次/小時/IP)
6. ✅ 結果能透過 URL 分享

---

**憲法遵守確認**: 本計畫嚴格遵守 DestinyMap 憲法，所有實作對應 Spec 條目，未新增未定義功能。