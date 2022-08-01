# Increasing Subsequence



Leetcode 491
[https://leetcode-cn.com/problems/increasing-subsequences/](https://leetcode-cn.com/problems/increasing-subsequences/)
> Given an integer array nums, return all the different possible increasing subsequences of the given array with at least two elements. You may return the answer in any order.
> The given array may contain duplicates, and two equal integers should also be considered a special case of increasing sequence.
> 
> Example 1:
> Input: nums = [4,6,7,7]
> Output: [[4,6],[4,6,7],[4,6,7,7],[4,7],[4,7,7],[6,7],[6,7,7],[7,7]]
> 
> Example 2:
> Input: nums = [4,4,3,2,1]
> Output: [[4,4]]
>  
> Constraints:
> 1 <= nums.length <= 15
> -100 <= nums[i] <= 100

```java
class Solution {
    List<List<Integer>> result = new ArrayList<>();
    LinkedList<Integer> list = new LinkedList<>();
    public List<List<Integer>> findSubsequences(int[] nums) {
        backTracking(nums, 0);
        return result;
    }
    public void backTracking(int nums[], int index){
        if(list.size() > 1){ 
            result.add(new ArrayList<>(list));
        }
        HashMap<Integer, Integer> map = new HashMap<>(); //使用map进行去重
        for(int i = index; i < nums.length; i++){
            if(list.size() > 0 && nums[i] < list.getLast()){
                continue;
            }
            //change from nums[i] i-1 to map
            if(map.getOrDefault(nums[i], 0) >= 1){
                continue;
            }
            map.put(nums[i], map.getOrDefault(nums[i], 0) + 1);
            list.add(nums[i]);
            backTracking(nums, i + 1);
            list.removeLast();
        }
    }
}
```

