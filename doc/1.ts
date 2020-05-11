var moveZeroes = function(nums) {
    var i = 0;
    for(var j = 0 ;j < nums.length ;j++) {
        if( i != j ){
            if(nums[i] == 0) {
                let temp = nums[i]
                nums[i] = nums[j];
                nums[i] = temp;
                i++
            }
        }
    }
};