# 旅行行程網頁製作專家規範與萬用 Prompt 手冊 (Travel Itinerary Web App Expert MD)

本文件整理自實戰打磨的「現代化旅遊指南 PWA 網頁應用程式」標準規範。日後規劃任何新旅程（日本、歐美、東南亞或國內旅遊），可直接引用本規範或啟動 `travel-itinerary-webapp` 技能。

---

## 一、核心設計與開發規範（10 大標準）

| 編號 | 模組／規範 | 標準實作規格 |
| :---: | :--- | :--- |
| **1** | **完整渲染保證** | 嚴禁 `<!-- 其他天數以此類推 -->` 等任何省略；所有天數、時段、景點、備註、3 選 1 餐廳／購物子方案、拍照指南 100% 轉化為互動卡片。 |
| **2** | **資料與視圖分離** | 將飯店 `HOTEL`、行程 `ITINERARY_DATA`、憑證 `VOUCHERS_DATA`、7 大分類清單 `PACKING_DATA`、求助句 `PHRASES` 集中於頂部 JS 常數，動態渲染至 DOM。 |
| **3** | **台灣慣用繁體中文** | 全站採用台灣慣用詞彙：`台灣桃園國際機場`、`託運行李`、`公尺`、`高 CP 值好物`、`貼心提醒`、`盒玩／扭蛋`、`二手挖寶`、`後背包`、`捕捉／拍下`、`應用程式圖示`。 |
| **4** | **日系簡潔可愛風＋單欄置中** | 奶油米白底色（`#FFFDF8`）＋圓潤大卡片（`rounded-3xl`）＋珊瑚紅主色（`#FF6B6B`），**不需深色模式**；全站 `max-w-3xl mx-auto` 單欄置中，手機版底部導航列、平板／電腦版頂部橫向固定導航列。 |
| **5** | **手機重點優先＋摺疊詳細敘述** | 手機版（`< 768px`）預設將詳細敘述（地址、營業時間、行程攻略、拍照建議、外部導航）摺疊收合；**卡片外層只給核心重點（時間、分類、中日文名稱、交通／費用精煉標籤列、🚕 司機卡快捷鈕與 `▾ 詳細敘述` 狀態膠囊）**；天氣票券末班車、憑證備註、行李分類清單亦支援點擊展開/收合；電腦版（`>= 768px`）預設展開，全站字級全面放大且按鈕維持觸控安全高度。 |
| **6** | **全螢幕黑體司機卡＋語音發音** | 載入 `Noto Sans TC`、`Zen Maru Gothic` 與微軟正黑體備援；**司機卡（`#driverModal`）強制使用無襯線黑體（`font-sans`）**，並內建 `🔊 播放語音（給司機聽）` 按鈕（Web Speech API 自動以 `ja-JP`／`zh-TW` 朗讀禮貌問候＋地名＋地址）。 |
| **7** | **真實地址＆三件套按鈕** | 查證真實當地地址與官網；每張卡片配置 `🌐 官方網站`、`📍 景點定位`、`🚗 導航前往`（強制加上 `target="_blank" rel="noopener noreferrer"`）與右下角 `🏨 回飯店` 浮動按鈕。 |
| **8** | **自動即時匯率＋分帳同步** | 開啟時自動串接免金鑰公開匯率 API（`open.er-api.com` ＋ `currency-api` 雙備援）取得最新對台幣匯率，附 `🔄 即時匯率` 手動刷新鈕；支援自訂匯率記憶、多人分帳應收應付結算與 Base64 旅伴同步碼。 |
| **9** | **7 大分類詳細清單＋憑證** | 提供約 50–60 項的 **7 大分類詳細清單**（行前預約 Timeline、證件金融、3C 充電、季節穿搭、常備藥與兒童藥、保濕盥洗、隨身收納），顯示總進度條與各分類完成數（`X/Y`）。 |
| **10** | **PWA 離線快取＋自動化實測** | 內建 `manifest.json`、`sw.js`（連同跨網域 CDN 一併快取）、`_redirects`；交付前透過 Playwright 於 `375px`、`430px`、`820px`、`1280px` 四種尺寸實測 0 溢出、0 錯誤。 |

---

## 二、萬用啟動 Prompt 範本（複製即可用於下一趟旅程）

日後有新的旅遊行程時，只需對 Agent 說：

```markdown
請啟用 `travel-itinerary-webapp` 技能，根據下方我提供的「旅遊行程內容」，為我們製作一個支援手機與電腦版、可離線快取（PWA）、準備部署到 Netlify 的旅遊指南 Web App：

1. 視覺採「日系簡潔可愛風（奶油米白底、圓潤大卡片、柔和粉彩標籤）」，僅需明亮淺色版（不需要深色模式）。
2. 版面採用「單欄置中（`max-w-3xl`）＋左側時間軸連線＋頂部/底部橫向選單」，全站字體與卡片間距全面放大。
3. 全站文字嚴格使用「繁體中文台灣慣用詞彙」（如：台灣桃園國際機場、託運行李、公尺、高 CP 值好物、貼心提醒）。
4. 司機卡一律使用高對比無襯線黑體（`Noto Sans TC` / `Zen Maru Gothic` / `Microsoft JhengHei`），內建「🔊 語音發音功能（Web Speech API 朗讀禮貌問路語＋地名＋地址）」，並查證各景點與飯店的真實當地地址與官方網站。
5. 匯率計算器需具備「自動抓取最新市場即時匯率 API ＋ 手動刷新鈕 ＋ 離線記憶」，分帳工具支援同行成員與公費結算。
6. 行前待辦與行李清單請採用「7 大分類詳細清單（50–60 項）」，並顯示各分類完成進度。
7. 完成後請在本地伺服器以 Playwright 實測手機、平板、電腦版與離線模式。

【以下貼上行程內容】
```

---

## 三、已安裝的 Skill 檔案位置

本專家技能已同步安裝至您的**專案工作區**與**全域設定目錄**，未來在任何資料夾皆可自動喚醒使用：

1. **專案 Skill**：[.agents/skills/travel-itinerary-webapp/SKILL.md](file:///c:/Users/jerry/OneDrive/文件/Antigravity/Travel/.agents/skills/travel-itinerary-webapp/SKILL.md)
2. **專案資料結構與詳細清單範本**：[.agents/skills/travel-itinerary-webapp/references/data-schema-and-checklist.md](file:///c:/Users/jerry/OneDrive/文件/Antigravity/Travel/.agents/skills/travel-itinerary-webapp/references/data-schema-and-checklist.md)
3. **全域 Skill（所有專案通用）**：[SKILL.md](file:///C:/Users/jerry/.gemini/config/skills/travel-itinerary-webapp/SKILL.md)
4. **全域資料結構與詳細清單範本**：[data-schema-and-checklist.md](file:///C:/Users/jerry/.gemini/config/skills/travel-itinerary-webapp/references/data-schema-and-checklist.md)
