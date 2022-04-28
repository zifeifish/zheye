/** 数组元素未被排过序 */
export function bubbleSort1 (arry: number[]): number[] {
  for (let i = 0; i < arry.length - 1; i++) { // 排序比较的轮数 n-1次
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
  for (let i = 0; i < arry.length - 1; i++) { // 排序比较的轮数 n-1次
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
  for (let i = 0; i < arry.length - 1; i++) { // 排序比较的轮数 n-1次
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

/** 双循环数组去重, 发现重复元素删除 */
export function noRepeat1 (arr: number[]): number[] {
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] === arr[j]) {
        arr.splice(i, 1)
        j--
      }
    }
  }
  return arr
}

/** 循环数组, 利用对象属性不能重复原理,将数组的每项作为对象属性,查询对象属性的值,没有就加进数组中去  */
export function noRepeat2 (arr: any[]): any[] {
  const obj = {} as any
  const newArr = [] as any
  for (let i = 0; i < arr.length; i++) {
    if (obj[arr[i]] === undefined) {
      newArr.push(i)
      obj[arr[i]] = 1
    } else {
      obj[arr[i]]++
    }
  }
  return newArr
}

/** 循环数组, 利用数组的includes()属性检测数组元素，没有就加进数组中去 */
export function noRepeat3 (arr: number[]): number[] {
  const newArr: number[] = []
  for (let i = 0; i < arr.length; i++) {
    if (!newArr.includes(arr[i])) {
      newArr.push(arr[i])
    }
  }
  return newArr
}

/** 循环数组, 利用数组的indexOf()属性检测数组元素的是否在新数组中，没有就加进数组中去 */
export function noRepeat4 (arr: number[]): number[] {
  const newArr: number[] = []
  for (let i = 0; i < arr.length; i++) {
    if (newArr.indexOf(arr[i]) === -1) {
      newArr.push(arr[i])
    }
  }
  return newArr
}

/** 循环数组, 利用数组的filter和indexOf()属性检测当前元素在的数组的位置和当前的下标是否一致，
 * 没有就加进数组中去
 * */
export function noRepeat5 (arr: number[]): number[] {
  return arr.filter((item, index, self) => self.indexOf(item) === index)
}

/** es6中的Set去重,Set数据的成员值都是唯一的, {}无法去重 */
export function noRepeat6 (arr: number[]): number[] {
  return Array.from(new Set(arr))
}

/** 数组sort()排序后,再遍历数据两两元素比较, NaN、{} 无法去重 */
export function noRepeat7 (arr: number[]): number[] {
  const newArr = [arr[0]]
  arr.sort()
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] !== arr[i - 1]) {
      newArr.push(arr[i])
    }
  }
  return newArr
}

/** reduce()去重 */
export function noRepeat8 (arr: number[]): number[] {
  return arr.reduce((prev, curr) => prev.includes(curr) ? prev : prev.concat(curr), [arr[0]])
}
