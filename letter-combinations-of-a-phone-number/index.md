# Letter combination of a phone number


Leetcode 17
[https://leetcode-cn.com/problems/letter-combinations-of-a-phone-number/](https://leetcode-cn.com/problems/letter-combinations-of-a-phone-number/)

> Given a string containing digits from 2-9 inclusive, return all possible letter combinations that the number could represent. Return the answer in any order.
> A mapping of digit to letters (just like on the telephone buttons) is given below. Note that 1 does not map to any letters.
> 
> Example 1:
> 
> Input: digits = "23"
> Output: ["ad","ae","af","bd","be","bf","cd","ce","cf"]
> Example 2:
> 
> Input: digits = ""
> Output: []
> Example 3:
> 
> Input: digits = "2"
> Output: ["a","b","c"]
>  
> Constraints:
> 0 <= digits.length <= 4
> digits[i] is a digit in the range ['2', '9'].

```java
class Solution {
    List<String> result = new LinkedList<>();
    HashMap<Integer, String> map = new HashMap<>();
    public List<String> letterCombinations(String digits) { 
        if(digits.length() == 0){
            return result;
        }
        map.put(2, "abc");
        map.put(3, "def");
        map.put(4, "ghi");
        map.put(5, "jkl");
        map.put(6, "mno");
        map.put(7, "pqrs");
        map.put(8, "tuv");
        map.put(9, "wxyz");
        
        letterCombinationHelper(digits, new StringBuilder(), 0);
        return result;
    }
    
    public void letterCombinationHelper(String digits, StringBuilder sb, int index){
        
        if(sb.toString().length() == digits.length()){
            result.add(sb.toString());
            return;
        }
        if(index >= digits.length()){
            return;
        }
        int startIndex = digits.charAt(index) - '0';
        // for loop(horizontal:a b c)
        for(int i = 0; i < map.get(startIndex).length(); i++){
            sb.append(map.get(startIndex).charAt(i));
            letterCombinationHelper(digits, sb, index + 1); // vertical 2 3
            sb.deleteCharAt(sb.length() - 1);
        }
    }
}
```

