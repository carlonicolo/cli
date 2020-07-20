var myArgs = process.argv.slice(2);

cmd = "";
for(i=0; i <myArgs.length;i++){
    cmd += myArgs[i] + " ";
} 

const arr_regex = [/^(--foo )$/g, /^(--foo )\w+( )$/g, /^(--number )\d+( )$/g, /^((--foo ))((--)\w+)( \w+)( --number )\d+( )$/g];


// Format in the right way to accomplish the Task 6
// is -2 because the last character is a space
if(cmd.charAt(0) === "[" && cmd.charAt(cmd.length - 2) === "]"){
    //console.log("Right formatted, array input");
    cmd = cmd.substring(1);
    cmd = cmd.substring(0, cmd.length - 2);
    if(cmd === "--foo"){
        cmd += " "; 
    }
}

// if the command have more than 5 components, then if
// the array.lenght is > of 5 we can directly check for task 5
// multiple values for the same flag. To do that and handle the 6 task
// trying to supporting an array input we convert the "clean" string to an array
// and then execute produce the json
if(cmd.split(' ').length > 5){
    x = cmd.split(' ');

    // delete the last element ' ' from the cmd array in order
    // to have the same structure and length of myArgs array
    // in this way we didn't need other code or functions for dealing with an array input
    x.pop();
    myArgs = x;
}

// #### For task 5 ###
// Task 5 - handle multiple values for the same flag
num_flags = checkMultipleFlag(myArgs);

is_right_formatted = isRightFormat(num_flags, myArgs);

arr_multiple_flag = createArrayMultipleFlag(num_flags, myArgs);
// ###

if(checkRegex(cmd, arr_regex[0])){
    // --foo
    // create array from command string
    var arr_task1 = cmd.split(' ');
    myObj = new Object();

    // Use clean function to delete -- in front the flag
    foo = cleanFlags(arr_task1[0]);
    myObj[foo] = true;
    res = JSON.stringify(myObj);
    console.log(res);
    
}else if(checkRegex(cmd, arr_regex[1])){
    // --foo bar
    // create array from command string
    var arr_task2 = cmd.split(' ');
    myObj = new Object();

    // Use clean function to delete -- in front the flag
    foo = cleanFlags(arr_task2[0]);
    myObj[foo] = arr_task2[1];
    res = JSON.stringify(myObj);
    console.log(res);

}else if(checkRegex(cmd, arr_regex[2])){
    // --number 1
    // create array from command string
    var arr_task3 = cmd.split(' ');
    myObj = new Object();
    number_flag = cleanFlags(arr_task3[0]);
    myObj[number_flag] = parseInt(arr_task3[1]);
    console.log(JSON.stringify(myObj));

}else if(checkRegex(cmd, arr_regex[3])){
    // --foo --bar baz --number 1
    // create array from command string
    var arr_task4 = cmd.split(' ');
    myObj = new Object();
    foo_flag = cleanFlags(arr_task4[0]);
    bar_flag = cleanFlags(arr_task4[1]);
    number_flag = cleanFlags(arr_task4[3]);
    
    myObj[bar_flag] = arr_task4[2];
    myObj[foo_flag] = true;
    myObj[number_flag] = parseInt(arr_task4[4]);
    console.log(JSON.stringify(myObj));
}//else if(checkRegex(cmd, arr_regex[4])){
//     // --foo --bar baz --bar zab --number 1
//     var arr_task5 = cmd.split(' ');
//     console.log(arr_task5);
//     console.log("arr_task5 lenght: ", arr_task5.length);
//     console.log("Task 5");}
else if(myArgs[0] == "--foo" && myArgs[1] == "--bar" && num_flags.length > 1 && myArgs[myArgs.length - 2] == "--number"){
    if( parseInt(myArgs[myArgs.length - 1]) && is_right_formatted){
        // Create the bar array inside json
        //console.log("Here");
        myObj = new Object();
        myObj.bar = arr_multiple_flag;
        myObj.foo = true;
        myObj.number = parseInt(myArgs[myArgs.length - 1]);
        x = JSON.stringify(myObj);
        console.log(x);
    }
}
else{
    console.log("No match");
}


function formatArrayInput(arr){
    // Delete the first character "["
    arr[0] = arr[0].substring(1);

    //Delete the last character "]"
    myArgs.pop();
}

function checkRegex(cmd, arr_regex){
    // [--foo]
    regex = arr_regex;
    command_to_check = cmd;
    found = command_to_check.match(regex);
    if(found){
        return true;
    }else{
        return false;
    }
}

// Format the flag in the right way in order to be used as key for JSON
function cleanFlags(flag){
    flag = flag.replace(/^(--)/,"");
    return flag;
}


function createArrayMultipleFlag(flag_index, command_to_parse){
    // The value of the strings written after the flag command in 
    // the case of multiple values for the same flag, evaluated for --bar 
    var string_values = []; 
    for(i =0; i < flag_index.length; i++){
        string_values.push(command_to_parse[flag_index[i]+1]);
    }
    return string_values;
}

/**
 * Checks if after the --bar command there is a string instead of another flag
 * @param {*} numflags 
 * @param {*} command_to_parse 
 */
function isRightFormat(numflags, command_to_parse){
    // --something pass all words that start with -- 
    const regex = /^(--)\w+$/g;
    for(i=0; i < numflags.length; i++){
        var string_to_check = command_to_parse[numflags[i]+1];
        var found = string_to_check.match(regex);
        if(found){
            return false;
        }
    }
    return true;
}

/**
 * Check if there are multiple flags and return an array that contains
 * the indexes of these flags
 * @param {*} arr 
 */
function checkMultipleFlag(arr){
    // Take the index of 
    var count = 0;
    var index_same_flags = [];
    for(i=0; i < arr.length; i++){
        if(arr[i] == "--bar"){
            count++;
            index_same_flags.push(i);
        }
     }
    return index_same_flags;
}