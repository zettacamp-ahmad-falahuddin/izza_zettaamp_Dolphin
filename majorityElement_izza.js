/**
 * write a function that returns the majority element.
 * The majority element is the element that appears more than other element.
 * READ EXAMPLE BELOW!

console.log(majorityElement([3, 2, 3])); // Output: 3 
console.log(majorityElement([2, 2, 1, 1, 1, 2, 2])); // Output: 2 

 * You may assume that the majority element always exists in the array.

 * Returns the majority element from the input array of integers.

 * @param {number[]} nums - The input array of integers.
 * @return {number} Returns the majority element.
 */
function majorityElement(nums) {
    const snums = nums.sort();
    const elements = [];
    for (let i = 0; i < snums.length; i++) {
        let count = 0;
        for (let j = i+1; j < snums.length; j++) {
            if (snums[i] === snums[j]) {
                count++;
                i = j;
            }
        }
        elements.push({ element: snums[i], count: count+1});
    }

    const counter = elements.map((e) => e.count)
    const number = elements.map((e) => e.element);
    return number[counter.indexOf(Math.max(...counter))];
}

console.log(majorityElement([3, 2, 3])); // Output: 3 
console.log(majorityElement([2, 2, 1, 1, 1, 2, 2])); // Output: 2 
console.log(majorityElement([1, 1, 2, 2, 2, 3, 3, 5, 5, 5, 5])); // Output: 3 