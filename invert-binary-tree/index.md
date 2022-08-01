# Invert Binary Tree


[https://leetcode-cn.com/problems/invert-binary-tree/](https://leetcode-cn.com/problems/invert-binary-tree/)
Given the root of a binary tree, invert the tree, and return its root.

> Example 1:
> Input: root = [4,2,7,1,3,6,9]
> Output: [4,7,2,9,6,3,1]
> 
> Example 2:
> Input: root = [2,1,3]
> Output: [2,3,1]
> 
> Example 3:
> Input: root = []
> Output: []
>  
> Constraints:
> The number of nodes in the tree is in the range [0, 100].
> -100 <= Node.val <= 100


```java
//Iteration
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
    public TreeNode invertTree(TreeNode root) {
        Deque<TreeNode> stack = new LinkedList<>();
        if(root != null){
            stack.offerLast(root);
        }
        TreeNode node = root;
        while(!stack.isEmpty() ){               
            node = stack.pollLast();
            TreeNode temp = node.left;
            node.left = node.right;
            node.right = temp; 

            if(node.left != null){
                stack.offerLast(node.left);
            }
            if(node.right != null){
                stack.offerLast(node.right);
            }
            
        }

        return root;
    }
}
```
```java
//Recursion
class Solution {
    public TreeNode invertTree(TreeNode root) {
        InvertNode(root);
        return root;
    }
    public void InvertNode(TreeNode root){
        if(root == null){
            return;
        }
        TreeNode temp = root.left;
        root.left = root.right;
        root.right = temp;
        InvertNode(root.left);
        InvertNode(root.right);
    }
}
```

