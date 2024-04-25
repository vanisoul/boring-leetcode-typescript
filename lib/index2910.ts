type status = "development" | "production";
let env: status = "production";

class Ball {
  constructor(
    public color: number, // A, B, C
    public count: number,
  ) {}
}

// 三種計算方式
// 1. 用 min + 1 當 extractValue 去計算
// 2. 用 min 當 extractValue 去計算
// 3. 用 min - 1 當 extractValue 去計算

// 取得 extractValue 與 remain 都較大者
function calculateExtractedValue(
  maxValue: number,
  minValue: number,
): { extractValue: number } {
  log("calculateExtractedValue", { maxValue, minValue }, "development");

  // 1. 用 min + 1 當 extractValue 去計算
  const extractValue1 = minValue + 1;
  const remain1 = maxValue - extractValue1;
  const min1 = Math.min(extractValue1, remain1);

  // 2. 用 min 當 extractValue 去計算
  const extractValue2 = minValue;
  const remain2 = maxValue - extractValue2;
  const min2 = Math.min(extractValue2, remain2);

  // 回傳 minN 最大者 的相應 extractValueN 值
  const extractValue = Math.max(min1, min2);
  log("calculateExtractedValue return", extractValue, "development");
  return { extractValue };
}

function minGroupsForValidAssignment(balls: number[]): number {
  // balls 先分群 並 new 為 Ball Class Array
  const ballArray: Ball[] = balls.reduce((arr, ball) => {
    const hasColor = arr.find((b) => b.color === ball);
    if (hasColor) {
      hasColor.count++;
    } else {
      arr.push(new Ball(ball, 1));
    }
    return arr;
  }, [] as Ball[]);

  log("orig", ballArray, "development");

  // 取得最大值
  let maxCount = Math.max(...ballArray.map((ball) => ball.count));
  // 取得最小值
  let minCount = Math.min(...ballArray.map((ball) => ball.count));
  let allowedLimit = minCount + 1;
  // 重複 1 - 5，兩個盒子的大小相差不超過一
  while (maxCount > allowedLimit) {
    // 取得當前分群最大 Ball
    const maxBall = ballArray.find((ball) => ball.count === maxCount)!;

    // 根據規則確認提取值與個數
    const { extractValue } = calculateExtractedValue(
      maxBall.count,
      minCount,
    );

    maxBall.count -= extractValue;

    // 根據 extractValue push 新 ball class 進入 ballArray
    ballArray.push(new Ball(maxBall.color, extractValue));

    log("after", ballArray, "development");

    // 重新取得最大值
    maxCount = Math.max(...ballArray.map((ball) => ball.count));
    // 重新取得最小值
    minCount = Math.min(...ballArray.map((ball) => ball.count));
    allowedLimit = minCount + 1;
  }

  return ballArray.length;
}

function log(name: string, any: any, status: status = "production") {
  if (status !== "production" && env !== status) return;
  console.log("===========================");
  console.log(`${name} : ${JSON.stringify(any)}`);
  console.log("===========================");
}

export default function main() {
  const balls1 = [3, 2, 3, 2, 3]; // 2
  const balls2 = [10, 10, 10, 3, 1, 1]; // 4
  const balls3 = [2, 2, 2, 2, 2, 1, 2]; // 4
  const balls4 = [1, 1, 3, 1, 1, 3]; // 3
  const balls5 = [2, 1, 1, 2, 2, 3, 1, 3, 1, 1, 1, 1, 2]; // 6
  const balls6 = [1, 3, 3, 1, 2, 1, 3, 1, 1, 2, 3, 2, 1, 2]; // 4
  const balls7 = [1, 1, 1, 3, 1, 1, 1, 1, 2, 3, 1, 3, 2, 1, 2, 3]; // 5

  env = "development";
  //   env = "production";

  //   log("balls1", minGroupsForValidAssignment(balls1));
  //   log("balls2", minGroupsForValidAssignment(balls2));
  //   log("balls3", minGroupsForValidAssignment(balls3));
  //   log("balls4", minGroupsForValidAssignment(balls4));
  //   log("balls5", minGroupsForValidAssignment(balls5));
  //   log("balls6", minGroupsForValidAssignment(balls6));
  log("balls7", minGroupsForValidAssignment(balls7));
}
