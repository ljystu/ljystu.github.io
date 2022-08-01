# Compare Tree


leetcode 100
[https://leetcode-cn.com/problems/same-tree/](https://leetcode-cn.com/problems/same-tree/)
```bash
//DFS
/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode() {}
 *     TreeNode(int val) { this.val = val; }
 *     TreeNode(int val, TreeNode left, TreeNode right) {
 *         this.val = val;
 *         this.left = left;
 *         this.right = right;
 *     }
 * }
 */
class Solution {
    public boolean isSameTree(TreeNode p, TreeNode q) {
        return compare(p, q);
    }
    public boolean compare(TreeNode p, TreeNode q){
        if(p == null && q != null){
            return false;
        }
        else if(p != null && q == null){
            return false;
        }
        else if(p == null && q == null){
            return true;
        }
        else if(p.val != q.val){
            return false;
        }
       
        boolean left = compare(p.left, q.left);
        boolean right = compare(p.right, q.right);
        return left & right; 
    }
}
```

