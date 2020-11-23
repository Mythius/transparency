const canvas = obj('canvas');
const ctx = canvas.getContext('2d');
var IMAGE;

mouse.start(canvas);

document.on('keydown',e=>{
	if(e.key.toLowerCase() == 'z' && e.ctrlKey){
		undo();
		e.preventDefault();
	}
	if(e.key.toLowerCase() == 'y' && e.ctrlKey){
		redo();
		e.preventDefault();
	}
});


function undo(){
	if(EDIT_STACK.length == 0) return;
	let frame = EDIT_STACK.pop();
	ctx.putImageData(frame,0,0);
}

function saveToStack(){
	let imgdat = ctx.getImageData(0,0,canvas.width,canvas.height);
	EDIT_STACK.push(imgdat);
}


var EDIT_STACK = [];

function loadImage(inputtypefile,callback){
	inputtypefile.onchange = e =>{
		if(inputtypefile.files){
			let reader = new FileReader;
			reader.onload = load;
			reader.readAsDataURL(inputtypefile.files[0]);
		}
	};
	function load(e){
		let IMAGE = create('img');
		IMAGE.src = e.target.result;
		IMAGE.onload = e =>{
			callback(IMAGE);
		}
	}
}

loadImage(obj('#fu'),image=>{
	IMAGE = image;
	drawCanvas();
	EDIT_STACK = [];
});

function drawCanvas(){
	ctx.clearRect(-2,-2,canvas.width+2,canvas.height+2);
	canvas.width = IMAGE.width;
	canvas.height = IMAGE.height;
	ctx.drawImage(IMAGE,0,0);
}

obj('#chooseImage').on('click',e=>{obj('#fu').click()});

obj('#chooseURL').on('click',async e=>{
	let url = await ask('Enter URL');
	if(!url) return;
	let img = create('img');
	img.src = url;
	img.onload = e => {
		IMAGE = img;
		drawCanvas();
		EDIT_STACK = [];
	}
});

obj('#save').on('click',e=>{
	let url = canvas.toDataURL('img/png');
	download('unnamed.png',url);
});

function download(filename,src){
    var e=create('a');
    e.href=src;
    e.download=filename;
    e.style.display='none';
    document.body.appendChild(e);
    e.click();
    document.body.removeChild(e);
}

function within(n1,n2){
	let off = obj('#offset').value;
	return Math.abs(n1-n2) <= off;
}

contextmenu(canvas,(choice,event)=>{
	if(!IMAGE) return;
	let pos = mouse.transformPos(event);
	let color = ctx.getImageData(pos.x,pos.y,1,1).data;
	console.log(color);
	if(choice == 'Make Transparent'){
		saveToStack();
		console.log('Running Algorithm');
		let imgdat = ctx.getImageData(0,0,canvas.width,canvas.height);
		let dat = imgdat.data;
		for(let i=0;i<dat.length;i+=4){
			if(within(dat[i+0],color[0]) && within(dat[i+1],color[1]) && within(dat[i+2],color[2])){
				imgdat.data[i+3] = 1;
			}
		}
		ctx.putImageData(imgdat,0,0);
		console.log(imgdat);
	}
},'Make Transparent');