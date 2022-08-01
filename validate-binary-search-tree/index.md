# Validate Binary Search Tree



Leetcode 98
[https://leetcode-cn.com/problems/validate-binary-search-tree/](https://leetcode-cn.com/problems/validate-binary-search-tree/)

> Given the root of a binary tree, determine if it is a valid binary search tree (BST).
> 
> A valid BST is defined as follows:
> The left subtree of a node contains only nodes with keys less than the node's key.
> The right subtree of a node contains only nodes with keys greater than the node's key.
> Both the left and right subtrees must also be binary search trees.
>  
> Example 1:
> Input: root = [2,1,3]
> Output: true
> 
> Example 2:
> Input: root = [5,1,4,null,null,3,6]
> Output: false
> Explanation: The root node's value is 5 but its right child's value is 4.
>  
> Constraints:
> 
> The number of nodes in the tree is in the range [1, 104].
> -231 <= Node.val <= 231 - 1



```java
class Solution {
    // 递归
    TreeNode max;
    public boolean isValidBST(TreeNode root) {
        if (root == null) {
            return true;
        }
        // 左
        boolean left = isValidBST(root.left);
        if (!left) {
            return false;
        }
        // 中
        if (max != null && root.val <= max.val) {
            return false;
        }
        max = root;
        // 右
        boolean right = isValidBST(root.right);
        return right;
    }
}
```
```java
class Solution {
    // 迭代
    public boolean isValidBST(TreeNode root) {
        if (root == null) {
            return true;
        }
        Stack<TreeNode> stack = new Stack<>();
        TreeNode pre = null;
        while (root != null || !stack.isEmpty()) {
            while (root != null) {
                stack.push(root);
                root = root.left;// 左
            }
            // 中，处理
            TreeNode pop = stack.pop();
            if (pre != null && pop.val <= pre.val) {
                return false;
            }
            pre = pop;

            root = pop.right;// 右
        }
        return true;
    }
}
```

