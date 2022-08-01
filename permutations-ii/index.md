# Permutations II



Leetcode 47
[https://leetcode-cn.com/problems/permutations-ii/](https://leetcode-cn.com/problems/permutations-ii/)
> Given a collection of numbers, nums, that might contain duplicates, return all possible unique permutations in any order.
> Example 1:
> Input: nums = [1,1,2]
> Output:
> [[1,1,2],
>  [1,2,1],
>  [2,1,1]]
> 
> Example 2:
> Input: nums = [1,2,3]
> Output: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
>  
> Constraints:
> 1 <= nums.length <= 8
> -10 <= nums[i] <= 10



```java
class Solution {
    List<List<Integer>> result = new ArrayList<>();
    LinkedList<Integer> list = new LinkedList<>();

    public List<List<Integer>> permuteUnique(int[] nums) {
        Arrays.sort(nums);
        int [] used = new int[nums.length];
        backTracking(nums, used);
        return result;
    }
    public void backTracking(int nums[], int[] used){
        if(list.size() == nums.length){ 
            result.add(new ArrayList<>(list));
            return;
        }
       
        for(int i = 0; i < nums.length; i++){
            if(i > 0 && nums[i] == nums[i - 1] && used[i - 1] == 0){ // cut
                continue;
            }
            if(used[i] == 0){
                list.add(nums[i]); 
                used[i] = 1;       
                backTracking(nums, used);
                list.removeLast();
                used[i] = 0;
            }      
        }
    }
}
```
假设当前到达了元素 b ，那么前一个元素 a 一定是已经处理过了的，它的 used[a]==true 理应成立。但如果 used[a]==false 说明什么？？说明 nums[a] 已经被从当前组合集合中撤销掉了！！
既然现在 nums[a] 被撤销，而 nums[b] 被选择，也就是说：现在 nums[b] 被顶替在了之前 nums[a] 的位置上。如果 nums[a]==nums[b] ，那么当前组合结果和之前不撤销nums[a]的那个组合有什么区别？是没有区别的，这样就导致两个组合是重复的！这也就是我们需要剪枝去重的情况！

