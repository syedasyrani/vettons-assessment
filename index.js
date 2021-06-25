// used to check for array shallow duplicates in example 2
function arrayEquals(a, b) {
  return (
    Array.isArray(a) &&
    Array.isArray(b) &&
    a.length === b.length &&
    a.every((v, i) => v === b[i])
  )
}

function findMatchNumbers(arr, number) {
  /* 
    array is sorted first to better find shallow duplicates.
    in case of example 2, reference for [1, 8, 3] != [8, 3 ,1],
    meaning although element of array is the same number theoretically,
    both arrays are different objects
  */
  const sortedArr = arr.sort((a, b) => a - b)
  let result = []

  function recurse(i = 0, sum = 0, numArr = []) {
    if (sum === number && !result.some((r) => arrayEquals(r, numArr))) {
      result.push(numArr)
      return
    }

    if (i === sortedArr.length) {
      return
    }

    // implement example 3, no single number in array if number is equal to sum
    if (sum + sortedArr[i] <= number && sortedArr[i] !== number) {
      recurse(i + 1, sum + sortedArr[i], numArr.concat(sortedArr[i]))
    }

    recurse(i + 1, sum, numArr)
  }

  recurse()

  return result
}

let arr
let total

// example 1:
arr = [5, 1, 10, 7]
total = 11

// example 2:
// arr = [1, 8, 9, 3, 10, 1]
// total = 12

// example 3:
// arr = [1, 3, 9]
// total = 3

console.log(findMatchNumbers(arr, total))
// example 1 returns [[1, 10]]
// example 2 returns [[1, 1, 10], [1, 3, 8], [3, 9]]
