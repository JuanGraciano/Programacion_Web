
var tree = '';

function head(){
	tree = '<ul class="dad">';
	tree += '<li> ' + document.body.tagName + '</li>';
	for(var i = 0; i < document.body.children.length; i++){
		tree += '<ul class="root">';
		headChild(document.body.children, i);
		tree += '</ul>';
	}
	tree += '</ul>';
	document.getElementById("head").innerHTML = tree;
}

function headChild(tag, i)
{
    if(tag[i].children.length > 0){
    	tree += '<li> ' + tag[i].tagName + '</li>';
    }
    else if(tag[i].children.length == 0){
    	tree += '<li> ' + tag[i].tagName + '</li>';
    }
	for(var j = 0; j < tag[i].children.length; j++) {
		tree += '<ul class="pages">';	
		headChild(tag[i].children, j);
		tree += '</ul>';
	}
     
}