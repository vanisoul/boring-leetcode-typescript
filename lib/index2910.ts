/**
 * 計算將編號的球按規則分配到最少數量的盒子中所需要的盒子數。
 * 每個盒子中的球必須編號相同，但同一編號的球可以分到不同盒子。
 * 最大的盒子與最小的盒子的球數差不能超過一個。
 * @param balls 球的編號陣列。
 * @returns 返回符合條件的最少盒子數。
 */
function minGroupsForValidAssignment(balls: number[]): number {
  //   [1, 3, 3, 1, 2, 1, 3, 1, 1, 2, 3, 2, 1, 2];
  log("balls", balls);

  // 建立一個記錄每個編號球出現次數的字典
  const ballCountPerNumber: Record<number, number> = {};
  balls.forEach((number) => {
    ballCountPerNumber[number] = (ballCountPerNumber[number] || 0) + 1;
  });
  log("ballCountPerNumber", ballCountPerNumber);

  // 取出所有編號的球出現次數並進行排序
  const sortedCounts = Object.values(ballCountPerNumber).sort((a, b) => a - b);
  log("sortedCounts", sortedCounts);

  // 獲得排序後的數組長度
  const totalCounts = sortedCounts.length;
  log("totalCounts", totalCounts);

  // 初始化最小盒子的球數
  let minBoxCount = sortedCounts[0];
  let currentIndex = 0; // 迭代器初始化
  let totalBoxesNeeded = 0; // 計數器，計算最少盒子數
  while (currentIndex < totalCounts) {
    const currentBallCount = sortedCounts[currentIndex]; // 當前處理的球數
    log("while info init", {
      currentIndex,
      minBoxCount,
      currentBallCount,
    });
    // 計算當前編號球數需要的盒子數，並保證最大盒子與最小盒子的球數差不超過一個，可能未裝滿
    const boxesNeeded = Math.ceil(currentBallCount / (minBoxCount + 1));
    // 需要盒數裝滿 - 真實球數
    const leftoverBalls = boxesNeeded * (minBoxCount + 1) -
      currentBallCount;

    // 累加需要的盒子數
    totalBoxesNeeded += boxesNeeded;
    currentIndex++;

    log("while info", {
      boxesNeeded,
      leftoverBalls,
      totalBoxesNeeded,
    });

    // 如果剩餘球數超過一個盒子能裝的，則需要調整最小盒子的大小
    if (leftoverBalls > boxesNeeded) {
      minBoxCount--;
      currentIndex = 0;
      totalBoxesNeeded = 0;
      log("reset", {});
      continue;
    }
  }

  log("end", totalBoxesNeeded);

  return totalBoxesNeeded; // 返回最少需要的盒子數
}

function log(name: string, any: any) {
  // console.log("===========================");
  console.log(`${name} : ${JSON.stringify(any)}`);
  // console.log("===========================");
}

export default function main() {
  const balls1 = [3, 2, 3, 2, 3]; // 2
  const balls2 = [10, 10, 10, 3, 1, 1]; // 4
  const balls3 = [2, 2, 2, 2, 2, 1, 2]; // 4
  const balls4 = [1, 1, 3, 1, 1, 3]; // 3
  const balls5 = [2, 1, 1, 2, 2, 3, 1, 3, 1, 1, 1, 1, 2]; // 6
  // 2-4 1-7 3-2

  const balls6 = [1, 3, 3, 1, 2, 1, 3, 1, 1, 2, 3, 2, 1, 2]; // 4

  const balls7 = [1, 1, 1, 3, 1, 1, 1, 1, 2, 3, 1, 3, 2, 1, 2, 3]; // 5
  const balls8 = [1, 1, 3, 3, 2, 3, 1, 1, 2, 3, 3, 3, 3, 2, 3, 1]; // 6

  // log("balls1", minGroupsForValidAssignment(balls1));
  // log("balls2", minGroupsForValidAssignment(balls2));
  // log("balls3", minGroupsForValidAssignment(balls3));
  // log("balls4", minGroupsForValidAssignment(balls4));
  // log("balls5", minGroupsForValidAssignment(balls5));
  // log("balls6", minGroupsForValidAssignment(balls6));
  // log("balls7", minGroupsForValidAssignment(balls7));
  log("balls8", minGroupsForValidAssignment(balls8));
}
