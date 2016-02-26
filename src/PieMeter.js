module.exports = function(){
  return {
    attach: function(tagId, options){
      return new PieMeterObject(tagId, options);
    }
  };
};

function PieMeterObject(tagId, options){
  var percent = 0;
  var ctx = null;
  var label = null;

  init(tagId);

  function init(tagId){
    var targetElement = document.getElementById(tagId);
    if(!targetElement) throw "Element specified not found : " + tagId;
    var canvasId = "piemeter_canvas_" + tagId;
    var labelId = "piemeter_label_" + tagId;

    if(document.getElementById(canvasId)) throw "PieMeter already attached to " + tagId;

    targetElement.style.position = 'relative';
    
    // create canvas
    var canvas = document.createElement("CANVAS");
    canvas.id = canvasId;
    setCanvasStyle(canvas);
    targetElement.appendChild(canvas);

    // create label
    label = document.createElement("DIV");
    label.id = labelId;
    setLabelStyle(label);
    targetElement.appendChild(label);

    ctx = canvas.getContext("2d");
    draw();
  }

  function setLabelStyle(label){
    label.style.textAlign = 'center';
  	label.style.width = '150px';
  	label.style.position = 'absolute';
  	label.style.top = '60px';
  	label.style.fontSize = 'xx-large';
  	label.style.fontFamily = 'sans-serif';
  	label.style.color ='white';
  	label.style.textShadow = 'green 2px 2px';
  }

  function setCanvasStyle(canvas){
    canvas.width="150";
    canvas.height="150";
    canvas.style.border = '1px solid #d3d3d3';
  }

  function draw(){
    ctx.fillStyle="#83AA91";
    ctx.fillRect(0,0,300,150);

    ctx.beginPath();
    ctx.arc(75, 75, 60, 0, 2 * Math.PI);
    ctx.lineTo(75, 75);
    ctx.fillStyle="#FFFFFF";
    ctx.fill();

    ctx.beginPath();
    ctx.arc(75, 75, 55,- Math.PI/2 , 2 * Math.PI * percent * 0.01 - Math.PI/2);
    ctx.lineTo(75, 75);
    ctx.fillStyle="#5E9986";
    ctx.fill();

    label.innerHTML = percent;
  }

  this.refresh = function(){
    draw();
  };

  this.setValue = function(val, refresh){
    if(isNaN(val) || val < 0 || val > 100)
      throw "Invalid value " + val + " must be between 0 and 100";
    percent = val;
    refresh && this.refresh();
  };
}
