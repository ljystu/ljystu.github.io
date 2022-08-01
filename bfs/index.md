# BFS



Leetcode 102
[https://leetcode-cn.com/problems/binary-tree-level-order-traversal/](https://leetcode-cn.com/problems/binary-tree-level-order-traversal/)
Given the root of a binary tree, return the level order traversal of its nodes' values. (i.e., from left to right, level by level).

> Example 1:
> Input: root = [3,9,20,null,null,15,7]
> Output: [[3],[9,20],[15,7]]
> 
> Example 2:
> Input: root = [1]
> Output: [[1]]
> 
> Example 3:
> Input: root = []
> Output: []
>  
> Constraints:
> The number of nodes in the tree is in the range [0, 2000].
> -1000 <= Node.val <= 1000


```java
//DFS method
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
    List<List<Integer>> result = new LinkedList<>();
    public List<List<Integer>> levelOrder(TreeNode root) {
        int depth = 0;
        DFS(root,0);
        return result;
    }
    public void DFS(TreeNode node, int depth){
        if(node == null){
            return;
        }
        depth++;
        if(depth > result.size()){
            List<Integer> layer = new LinkedList<>();
            result.add(layer);
        }
        result.get(depth - 1).add(node.val);

        DFS(node.left, depth);
        DFS(node.right, depth);

    }
}
```
```java
// Queue
class Solution {
    public List<List<Integer>> levelOrder(TreeNode root) {
        Deque<TreeNode> queue = new LinkedList<>();
        if(root != null){
            queue.add(root);
        }
        List<List<Integer>> result = new LinkedList<>();

        while(queue.size() != 0){
            int size = queue.size();
            List<Integer> layers = new LinkedList<>();
            for(int i = 0; i < size; i++){
                TreeNode node = queue.pollFirst();
                layers.add(node.val);
                if(node.left != null){
                    queue.offerLast(node.left);
                }
                if(node.right != null){
                    queue.offerLast(node.right);
                }     
            }
            result.add(layers);
        }
        return result;
    }
}
```
Similar problems:
Leetcode 107
```java
class Solution {
    public List<List<Integer>> levelOrderBottom(TreeNode root) {
        LinkedList<List<Integer>> result = new LinkedList<>();
        Deque<TreeNode> queue = new LinkedList<>();
        if(root != null){
            queue.offerLast(root);
        }
        while(!queue.isEmpty()){
            int size = queue.size();
            List<Integer> list = new LinkedList<>();
            for(int i =0; i < size; i++){
                TreeNode node = queue.pollFirst();
                if(node.left != null){
                    queue.offerLast(node.left);
                }
                if(node.right != null){
                    queue.offerLast(node.right);
                }
                list.add(node.val);
            }
            result.addFirst(list);
        }
        return result;

    }

}

//DFS
class Solution {
    LinkedList<List<Integer>> result = new LinkedList<>();
    public List<List<Integer>> levelOrderBottom(TreeNode root) {
        level(root,0);
        Collections.reverse(result);
        return result;
    }
    public void level(TreeNode node, int depth){
        if(node == null){
            return;
        }
        depth++;
        if(result.size() < depth){
            List<Integer> list = new LinkedList<>();
            result.add(list);
        }
        result.get(depth-1).add(node.val);
        level(node.left, depth);
        level(node.right, depth);

    }

}
```
Leetcode 199
```java
//DFS
class Solution {
    List<Integer> result = new LinkedList<>();
    public List<Integer> rightSideView(TreeNode root) {
        level(root,0);
        return result;
    }
    public void level(TreeNode node, int depth){
        if(node == null){
            return;
        }
        depth++;
        if(result.size() < depth){
            result.add(0);
        }
        result.set(depth-1, node.val);
        level(node.left, depth);
        level(node.right, depth);
    }
}

//BFS
class Solution {
    public List<Integer> rightSideView(TreeNode root) {
        Deque<TreeNode> queue = new LinkedList<>();
        List<Integer> list = new LinkedList<>();
        if(root != null){
            queue.offerLast(root);
        }
        while(!queue.isEmpty()){
            int size = queue.size();
            for(int i =0; i < size; i++){
                TreeNode node = queue.pollFirst();
                if(node.left != null){
                    queue.offerLast(node.left);
                }
                if(node.right != null){
                    queue.offerLast(node.right);
                }
                if(i == size - 1){
                    list.add(node.val);
                }        
            }
        }
        return list;
    }
}
```

