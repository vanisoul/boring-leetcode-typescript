// 透過第一個參數 N 決定 執行 ./lib/indexN.ts

// 使用動態載入
const moduleToLoad = `./lib/index${process.argv[2]}`;
import(moduleToLoad).then((module) => {
  module.default();
}).catch((err) => {
  console.error("Error loading the module:", err);
});
