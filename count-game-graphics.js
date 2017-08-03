(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.webFontTxtInst = {}; 
var loadedTypekitCount = 0;
var loadedGoogleCount = 0;
var gFontsUpdateCacheList = [];
var tFontsUpdateCacheList = [];
var rect; // used to reference frame bounds
lib.ssMetadata = [];



lib.updateListCache = function (cacheList) {		
	for(var i = 0; i < cacheList.length; i++) {		
		if(cacheList[i].cacheCanvas)		
			cacheList[i].updateCache();		
	}		
};		

lib.addElementsToCache = function (textInst, cacheList) {		
	var cur = textInst;		
	while(cur != null && cur != exportRoot) {		
		if(cacheList.indexOf(cur) != -1)		
			break;		
		cur = cur.parent;		
	}		
	if(cur != exportRoot) {		
		var cur2 = textInst;		
		var index = cacheList.indexOf(cur);		
		while(cur2 != null && cur2 != cur) {		
			cacheList.splice(index, 0, cur2);		
			cur2 = cur2.parent;		
			index++;		
		}		
	}		
	else {		
		cur = textInst;		
		while(cur != null && cur != exportRoot) {		
			cacheList.push(cur);		
			cur = cur.parent;		
		}		
	}		
};		

lib.gfontAvailable = function(family, totalGoogleCount) {		
	lib.properties.webfonts[family] = true;		
	var txtInst = lib.webFontTxtInst && lib.webFontTxtInst[family] || [];		
	for(var f = 0; f < txtInst.length; ++f)		
		lib.addElementsToCache(txtInst[f], gFontsUpdateCacheList);		

	loadedGoogleCount++;		
	if(loadedGoogleCount == totalGoogleCount) {		
		lib.updateListCache(gFontsUpdateCacheList);		
	}		
};		

lib.tfontAvailable = function(family, totalTypekitCount) {		
	lib.properties.webfonts[family] = true;		
	var txtInst = lib.webFontTxtInst && lib.webFontTxtInst[family] || [];		
	for(var f = 0; f < txtInst.length; ++f)		
		lib.addElementsToCache(txtInst[f], tFontsUpdateCacheList);		

	loadedTypekitCount++;		
	if(loadedTypekitCount == totalTypekitCount) {		
		lib.updateListCache(tFontsUpdateCacheList);		
	}		
};
// symbols:
// helper functions:

function mc_symbol_clone() {
	var clone = this._cloneProps(new this.constructor(this.mode, this.startPosition, this.loop));
	clone.gotoAndStop(this.currentFrame);
	clone.paused = this.paused;
	clone.framerate = this.framerate;
	return clone;
}

function getMCSymbolPrototype(symbol, nominalBounds, frameBounds) {
	var prototype = cjs.extend(symbol, cjs.MovieClip);
	prototype.clone = mc_symbol_clone;
	prototype.nominalBounds = nominalBounds;
	prototype.frameBounds = frameBounds;
	return prototype;
	}


(lib.replayButton = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.text = new cjs.Text("Replay?", "bold 24px 'Arial Black'");
	this.text.textAlign = "center";
	this.text.lineHeight = 36;
	this.text.lineWidth = 145;
	this.text.parent = this;
	this.text.setTransform(109.3,24.9);

	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(1,1,1).p("AwPm3MAgfAAAIAANvMggfAAAg");
	this.shape.setTransform(104,44);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#00BC14").s().p("AwPG4IAAtvMAgfAAAIAANvg");
	this.shape_1.setTransform(104,44);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#33FF00").s().p("AwPG4IAAtvMAgfAAAIAANvg");
	this.shape_2.setTransform(104,44);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FF0000").s().p("AwPG4IAAtvMAgfAAAIAANvg");
	this.shape_3.setTransform(104,44);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape},{t:this.text,p:{color:"#000000"}}]}).to({state:[{t:this.shape_2},{t:this.shape},{t:this.text,p:{color:"#000000"}}]},1).to({state:[{t:this.shape_3},{t:this.shape},{t:this.text,p:{color:"#FF0000"}}]},1).to({state:[{t:this.shape_1},{t:this.shape},{t:this.text,p:{color:"#000000"}}]},1).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = rect = new cjs.Rectangle(-1,-1,210,90);
p.frameBounds = [rect, rect, rect, rect];


(lib.numberedBox = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Text
	this.numberText = new cjs.Text("95", "bold 24px 'Arial Black'");
	this.numberText.name = "numberText";
	this.numberText.textAlign = "center";
	this.numberText.lineHeight = 36;
	this.numberText.lineWidth = 64;
	this.numberText.parent = this;
	this.numberText.setTransform(33.2,12.7);

	this.timeline.addTween(cjs.Tween.get(this.numberText).wait(1));

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(1,1,1).p("AlPkrIKfAAIAAJXIqfAAg");
	this.shape.setTransform(33.6,30);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.rf(["#FFFFFF","rgba(192,192,192,0.914)","rgba(190,190,190,0.914)","rgba(0,0,0,0.639)"],[0,0.29,0.667,1],0,0,0,0,0,45.1).s().p("AlPEsIAApXIKfAAIAAJXg");
	this.shape_1.setTransform(33.6,30);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

}).prototype = getMCSymbolPrototype(lib.numberedBox, rect = new cjs.Rectangle(-1,-1,69.2,62), [rect]);


(lib.Background = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(1,1,1).p("A3f/XMAu/AAAMAAAA+vMgu/AAAg");
	this.shape.setTransform(150.4,200.8);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#002AE0").s().p("A3ffYMAAAg+vMAu/AAAMAAAA+vg");
	this.shape_1.setTransform(150.4,200.8);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

}).prototype = getMCSymbolPrototype(lib.Background, rect = new cjs.Rectangle(-1,-1,302.8,403.6), [rect]);


(lib.gameOverScreen = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// buttonlayer
	this.instance = new lib.replayButton();
	this.instance.parent = this;
	this.instance.setTransform(149.3,273.8,1,1,0,0,0,104,44);
	new cjs.ButtonHelper(this.instance, 0, 1, 2, false, new lib.replayButton(), 3);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// Text
	this.text = new cjs.Text("Congratulations! You won!", "bold 24px 'Arial Black'");
	this.text.textAlign = "center";
	this.text.lineHeight = 36;
	this.text.lineWidth = 271;
	this.text.parent = this;
	this.text.setTransform(154.5,56.7);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(1,1,1).p("A3b/PMAu3AAAMAAAA+fMgu3AAAg");
	this.shape.setTransform(150,200);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#002AE0").s().p("A3bfQMAAAg+fMAu3AAAMAAAA+fg");
	this.shape_1.setTransform(150,200);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

}).prototype = getMCSymbolPrototype(lib.gameOverScreen, rect = new cjs.Rectangle(-1,-1,302,402), [rect]);


// stage content:
(lib.Untitled1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.instance = new lib.gameOverScreen();
	this.instance.parent = this;
	this.instance.setTransform(150,200,1,1,0,0,0,150,200);

	this.instance_1 = new lib.Background();
	this.instance_1.parent = this;
	this.instance_1.setTransform(597.6,205,1,1,0,0,0,150.4,200.8);

	this.instance_2 = new lib.numberedBox();
	this.instance_2.parent = this;
	this.instance_2.setTransform(409.6,141.4,1,1,0,0,0,33.6,30);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = rect = new cjs.Rectangle(149.5,199.5,749,406.8);
p.frameBounds = [rect];
// library properties:
lib.properties = {
	id: 'F38750FDBCE8C54190041218CE03BD1C',
	width: 300,
	height: 400,
	fps: 24,
	color: "#FFFFFF",
	opacity: 1.00,
	webfonts: {},
	manifest: [],
	preloads: []
};



// bootstrap callback support:

(lib.Stage = function(canvas) {
	createjs.Stage.call(this, canvas);
}).prototype = p = new createjs.Stage();

p.setAutoPlay = function(autoPlay) {
	this.tickEnabled = autoPlay;
}
p.play = function() { this.tickEnabled = true; this.getChildAt(0).gotoAndPlay(this.getTimelinePosition()) }
p.stop = function(ms) { if(ms) this.seek(ms); this.tickEnabled = false; }
p.seek = function(ms) { this.tickEnabled = true; this.getChildAt(0).gotoAndStop(lib.properties.fps * ms / 1000); }
p.getDuration = function() { return this.getChildAt(0).totalFrames / lib.properties.fps * 1000; }

p.getTimelinePosition = function() { return this.getChildAt(0).currentFrame / lib.properties.fps * 1000; }

an.bootcompsLoaded = an.bootcompsLoaded || [];
if(!an.bootstrapListeners) {
	an.bootstrapListeners=[];
}

an.bootstrapCallback=function(fnCallback) {
	an.bootstrapListeners.push(fnCallback);
	if(an.bootcompsLoaded.length > 0) {
		for(var i=0; i<an.bootcompsLoaded.length; ++i) {
			fnCallback(an.bootcompsLoaded[i]);
		}
	}
};

an.compositions = an.compositions || {};
an.compositions['F38750FDBCE8C54190041218CE03BD1C'] = {
	getStage: function() { return exportRoot.getStage(); },
	getLibrary: function() { return lib; },
	getSpriteSheet: function() { return ss; },
	getImages: function() { return img; }
};

an.compositionLoaded = function(id) {
	an.bootcompsLoaded.push(id);
	for(var j=0; j<an.bootstrapListeners.length; j++) {
		an.bootstrapListeners[j](id);
	}
}

an.getComposition = function(id) {
	return an.compositions[id];
}



})(createjs = createjs||{}, AdobeAn = AdobeAn||{});
var createjs, AdobeAn;