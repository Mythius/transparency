const canvas = obj('canvas');
const ctx = canvas.getContext('2d');
var IMAGE;

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
	if(IMAGE || confirm('Did you want to Replace current Progress?')){
		IMAGE = image;
		drawCanvas();
	}
});

function drawCanvas(){
	ctx.clearRect(-2,-2,canvas.width+2,canvas.height+2);
	canvas.width = IMAGE.width;
	canvas.height = IMAGE.height;
	ctx.drawImage(IMAGE,0,0);
}

obj('#chooseImage').on('click',e=>{obj('#fu').click()});