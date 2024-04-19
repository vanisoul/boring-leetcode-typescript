# boring-leetCode

這是一個利用業餘時間解決 LeetCode 題目的專案，使用 TypeScript
進行編程。專案的主要目的是為了提升個人算法技能並保持編程的熱情。當我感到無聊時，就會解一些題目並將解題代碼上傳到這個專案中。

## 專案結構

所有的解題文件都放在 `lib/` 目錄下，每個題目的解答都對應一個獨立的文件，例如
`index1.ts`、`index2.ts` 等。

## 如何使用

### 環境設置

首先確保你的系統中安裝了 [Bun](https://bun.sh/)，這是一個快速的 JavaScript
運行時和包管理器。你可以通過以下命令安裝 Bun：

```bash
curl https://bun.sh/install | bash
```

### 運行解題代碼

你可以使用以下命令來運行特定的解題代碼：

```bash
bun run start N
```

### 代碼結構

每個 `lib/indexN.ts` 文件包含一個解答函數，並可能包含一個 default
方法用於執行和展示解答函數的結果。這樣設計可以靈活地展示函數如何工作，也方便直接運行看到結果。例如：

```typescript
// 解答函數
function solve() {
  // 解題邏輯
  return "解題結果";
}

// 預設導出的方法用於執行和展示
export default function run() {
  console.log("運行 solve 函數的結果:", solve());
}
```
