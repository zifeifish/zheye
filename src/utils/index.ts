/** 数组元素未被排过序 */
export function bubbleSort1 (arry: number[]): number[] {
  for (let i = 0; i <= arry.length - 1; i++) { // 排序比较的轮数 n-1次
    for (let j = 0; j < arry.length - 1 - i; j++) { // 两两比较的元素范围
      if (arry[j] > arry[j + 1]) {
        const temp = arry[j]
        arry[j] = arry[j + 1]
        arry[j + 1] = temp
      }
    }
  }
  return arry
}

/**
 * 排序的中间发现数组已经排好序了,
 * 那么后面几轮的排序是不需要继续的
 * 此时就可以结束比较了
 */
export function bubbleSort2 (arry: number[]): number[] {
  if (arry.length < 2 || !arry) {
    return []
  }
  for (let i = 0; i <= arry.length - 1; i++) { // 排序比较的轮数 n-1次
    // 有序标识,每轮比较开始前先默认有序
    let isSorted = true
    for (let j = 0; j < arry.length - 1 - i; j++) { // 两两比较的元素范围
      if (arry[j] > arry[j + 1]) {
        // 元素交换,说明不是有序的,改变标识状态
        isSorted = false
        const temp = arry[j]
        arry[j] = arry[j + 1]
        arry[j + 1] = temp
      }
    }
    if (isSorted) {
      // 一轮比较下来发现没有元素交换, 直接跳出大循环
      break
    }
  }
  return arry
}

/**
 * 前半部无序,后半部有序
 * 每轮排序的中间发现数组有部分元素已经排好序了,
 * 那么在每轮的排序中，有序的元素部分两两比较是没有意义的
 * 在每轮的有序的元素部分比较就可以跳过
 */
export function bubbleSort3 (arry: number[]): number[] {
  if (arry.length < 2 || !arry) {
    return []
  }

  // 最后一次元素交换的位置
  let lastExchangeIndex = 0
  // 无需元素比较的边界,每次比较到这里就可以了
  let sortBorder = arry.length - 1
  for (let i = 0; i <= arry.length - 1; i++) { // 排序比较的轮数 n-1次
    // 有序标识,每轮比较开始前先默认有序
    let isSorted = true
    for (let j = 0; j < sortBorder; j++) { // 两两比较的元素范围
      if (arry[j] > arry[j + 1]) {
        // 元素交换,说明不是有序的,改变标识状态
        isSorted = false
        const temp = arry[j]
        arry[j] = arry[j + 1]
        arry[j + 1] = temp
        lastExchangeIndex = j
      }
    }
    // 每轮元素最后交换的位置,作为下次比较的边界
    sortBorder = lastExchangeIndex
    if (isSorted) {
      // 一轮比较下来发现没有元素交换, 直接跳出大循环
      break
    }
  }
  return arry
}
