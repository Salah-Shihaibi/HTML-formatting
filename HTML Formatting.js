var format = document.getElementById('format');
var content = document.getElementById('content');
var display = document.getElementById('display');

// Form submit event
format.addEventListener('click', Formatting);
var demo = '<div class="row"><div class="col-md-6"><h1>MESSY HTML</h1><textarea class="form-control" rows="30" id="content" placeholder="Enter Your HTML here"></textarea></div> <div class="col-md-6"> <h1>FORMATTED HTML</h1> <textarea class="form-control" rows="30" id="display" placeholder="RECEIVE FORMATTED HTML" readonly></textarea></div></div>'
content.innerHTML = demo

function Formatting(){
    var html = content.value;
    display.innerHTML = indent(html);
}

const indent = (source) => {
    if(!source) return '' // Check if the string is empty 
    source = source.replace(/\n/g,' ').replace(/&space;/g,' '); 
    let str = '',  arr = [];
    for(let i = 0; i < source.length; i++){ //split the tags from the strings and store them in an array
      if(source[i] === '<'){
        arr.push(str)
        str = '<'
      }
      else if(source[i] === '>'){
        str += '>'
        arr.push(str)
        str = ''
      }
      else{
        str += source[i]
      }  
    }
    arr.push(str)
    for(let i = 0; i<arr.length;i++){ //if '<br />' comes after a string attach '<br />' to the string
      if(arr[i] == '<br />' && arr[i-1][0] !== '<'){
        arr[i-1] = arr[i-1].trim() + '<br />'
        arr[i] = ''
      } 
    }
    arr = arr.map(x => x.trim()).filter(x => x !== '') //remove unneccessery whitespace and empty values
    arr = arr.map(x => x[0] == '<' ? x : x.replace(/\s+/g,' '))//remove unneccessery whitespace in strings only
    
    let str1 = arr[0];
    let space1 = ''
    for(let i = 1; i<arr.length;i++){ // add spacing following the rules given by the problem
      if(arr[i][1] == '/' && space1 !== ''){
       space1 = space1.substring(0, space1.length-2) // remove two spaces
      } 
      if(arr[i-1][0] == '<' && arr[i-1][arr[i-1].length-2] !== '/' && arr[i-1][1] !== '/'){
        space1 = space1 +  '  ' //add two spaces
      }  
      str1 = str1 + '\n'+ space1 + arr[i] // reproduce the formatted HTML
    }
    str1+= '\n'
    if(!source) return '' // Check if any HTML was found 
    return str1;
}