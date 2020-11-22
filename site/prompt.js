const ask = (question='') => new Promise((resolve,reject)=>{
	let div = create('div');
	let h4 = create('h4',question);
	let input = create('input');
	let button = create('button','ENTER');
	let cancel = create('button','CANCEL');
	div.appendChild(h4);
	div.appendChild(input);
	div.appendChild(button);
	div.appendChild(cancel);
	document.body.appendChild(div);
	div.style.position = 'fixed';
	div.style.left = '50%';
	div.style.top = '50%';
	div.style.transform = 'translateX(-50%) translateY(-50%)';
	div.style.backgroundColor = 'rgba(50,50,50,.5)';
	div.style.padding = '30px';
	div.style.textAlign = 'center';
	input.on('keydown',e=>{
		if(e.keyCode == 13){
			div.remove();
			resolve(input.value);
		}
	});
	button.on('click',e=>{
		div.remove();
		resolve(input.value);
	});
	cancel.on('click',e=>{
		div.remove();
		reject();
	});
});