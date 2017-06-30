
var tree = '';

function head(){
	tree = '<ul class="demo">';
	tree += '<li> ' + document.body.tagName + '</li>';
	for(var i = 0; i < document.body.children.length; i++){
		tree += '<ul>';
		headChild(document.body.children, i);
		tree += '</ul>';
	}
	tree += '</ul>';
	document.getElementById("head").innerHTML = tree;
	//document.write(tree);
}

function headChild(tag, i)
{
    if(tag[i].children.length >= 0){
    	tree += '<il> ' + tag[i].tagName + '</li>';
    }
	for(var j = 0; j < tag[i].children.length; j++) {
		tree += '<ul>';	
		headChild(tag[i].children, j);
		tree += '</ul>';
	}
     
}