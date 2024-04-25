class Ball {
  constructor(
    public color: number, // A, B, C
    public count: number,
  ) {}
}

// 兩種計算方式
// 1. 用 min + 1 當 extractValue 去計算
// 2. 用 min 當 extractValue 去計算

// 回傳優先權為以下
// 1. extractValue 不小於 min 者, 如果一致則下一個規則
// 2. extractCount 較小者, 如果一致則下一個規則
function calculateExtractedValue(
  maxValue: number,
  minValue: number,
): { extractValue: number } {
  //   console.log("maxValue", maxValue);
  //   console.log("minValue", minValue);
  // 1. 用 min + 1 當 extractValue 去計算
  const extractValue1 = minValue + 1;
  const extractCount1 = maxValue % extractValue1 === 0
    ? Math.floor(maxValue / extractValue1) - 1
    : Math.floor(maxValue / extractValue1);
  const remain1 = maxValue - extractCount1 * extractValue1;

  // 如果 remain >= min，直接回傳，因為 extractCount 肯定比較小
  if (remain1 >= minValue) {
    // console.log("remain1");
    return { extractValue: extractValue1 };
  }

  // 2. 用 min 當 extractValue 去計算
  const extractValue2 = minValue;
  const extractCount2 = maxValue % extractValue2 === 0
    ? Math.floor(maxValue / extractValue2) - 1
    : Math.floor(maxValue / extractValue2);
  const remain2 = maxValue - extractCount2 * extractValue2;

  // 如果 remain >= min，直接回傳
  if (remain2 >= minValue) {
    // console.log("remain2");
    return { extractValue: extractValue2 };
  }

  // 如果雙方都會造成新低，則回傳 extractCount 較小者
  //   console.log(
  //     extractCount1 < extractCount2 ? "extractCount1" : "extractCount2",
  //   );
  return extractCount1 < extractCount2
    ? { extractValue: extractValue1 }
    : { extractValue: extractValue2 };
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

  //   debug("orig", ballArray);

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
    // debug("extract", { extractValue });

    maxBall.count -= extractValue;

    // 根據 extractValue push 新 ball class 進入 ballArray
    ballArray.push(new Ball(maxBall.color, extractValue));

    // debug("after", ballArray);

    // 重新取得最大值
    maxCount = Math.max(...ballArray.map((ball) => ball.count));
    // 重新取得最小值
    minCount = Math.min(...ballArray.map((ball) => ball.count));
    allowedLimit = minCount + 1;
  }

  //   debug("ok", ballArray);

  return ballArray.length;
}

function debug(name: string, any: any) {
  console.log("===========================");
  console.log(name);
  console.log("---------------------------");
  console.log(JSON.stringify(any));
  console.log("===========================");
}

export default function main() {
  const balls1 = [3, 2, 3, 2, 3]; // 2
  const balls2 = [10, 10, 10, 3, 1, 1]; // 4
  const balls3 = [2, 2, 2, 2, 2, 1, 2]; // 4
  const balls4 = [1, 1, 3, 1, 1, 3]; // 3
  const balls5 = [2, 1, 1, 2, 2, 3, 1, 3, 1, 1, 1, 1, 2]; // 6
  //   1/14 , 3/2, 2/4
  // 1/11 1/3 3/2, 2/4
  // 1/8

  debug("balls1", minGroupsForValidAssignment(balls1));
  debug("balls2", minGroupsForValidAssignment(balls2));
  debug("balls3", minGroupsForValidAssignment(balls3));
  debug("balls4", minGroupsForValidAssignment(balls4));
  debug("balls5", minGroupsForValidAssignment(balls5));
}
