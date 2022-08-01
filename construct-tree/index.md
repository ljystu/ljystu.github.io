# Construct Tree


Leetcode 106 105
[https://leetcode-cn.com/problems/construct-binary-tree-from-inorder-and-postorder-traversal/](https://leetcode-cn.com/problems/construct-binary-tree-from-inorder-and-postorder-traversal/)

> Example 1:
> Input: inorder = [9,3,15,20,7], postorder = [9,15,7,20,3]
> Output: [3,9,20,null,null,15,7]
> 
> Example 2:
> Input: inorder = [-1], postorder = [-1]
> Output: [-1]


```java
//Recursion 106
class Solution {
    public TreeNode buildTree(int[] inorder, int[] postorder) {
        return Traverse(inorder, 0, inorder.length, postorder, 0, postorder.length);
    }
    public TreeNode Traverse(int[] inorder, int inLeft, int inRight, int[] postorder, int postLeft, int postRight){
        if(inRight - inLeft < 1){
            return null;
        }
        if(inRight - inLeft == 1){
            return new TreeNode(inorder[inLeft]);
        }
        //postorder last node as root
        int rootVal = postorder[postRight - 1];
        TreeNode root = new TreeNode(rootVal);
        int rootIndex = 0;

        for(int i = inLeft; i < inRight; i++){
            if(inorder[i] == rootVal){
                rootIndex = i;
                break;
            }
        }

        root.left = Traverse(inorder, inLeft, rootIndex, postorder, postLeft, postLeft + rootIndex - inLeft);
        root.right = Traverse(inorder, rootIndex + 1, inRight, postorder, postLeft + rootIndex - inLeft, postRight - 1);

        return root;
    }
}
```
```java
//105
class Solution {
    public TreeNode buildTree(int[] preorder, int[] inorder) {
        return helper(preorder, 0, preorder.length - 1, inorder, 0, inorder.length - 1);
    }

    public TreeNode helper(int[] preorder, int preLeft, int preRight,
                           int[] inorder, int inLeft, int inRight) {
        // 递归终止条件
        if (inLeft > inRight || preLeft > preRight) return null;

        // val 为前序遍历第一个的值，也即是根节点的值
        // idx 为根据根节点的值来找中序遍历的下标
        int idx = inLeft, val = preorder[preLeft];
        TreeNode root = new TreeNode(val);
        for (int i = inLeft; i <= inRight; i++) {
            if (inorder[i] == val) {
                idx = i;
                break;
            }
        }

        // 根据 idx 来递归找左右子树
        root.left = helper(preorder, preLeft + 1, preLeft + (idx - inLeft),
                         inorder, inLeft, idx - 1);
        root.right = helper(preorder, preLeft + (idx - inLeft) + 1, preRight,
                         inorder, idx + 1, inRight);
        return root;
    }
}
```

