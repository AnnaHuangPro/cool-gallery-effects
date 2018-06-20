
//canvas画图
var c=document.getElementById("add");
var cxt=c.getContext("2d");
cxt.fillStyle="white";
cxt.arc(280,130,20,0,Math.PI*2,true);
cxt.moveTo(280,110);
cxt.lineTo(280,150);
cxt.moveTo(260,130);
cxt.lineTo(300,130);
cxt.stroke();

function cnvs_getCoordinates(e)
{
    x=e.layerX;
    y=e.layerY;
    document.getElementById("xycoordinates").innerHTML=" (" + x + "," + y + ")";
}

function cnvs_clearCoordinates()
{
    document.getElementById("xycoordinates").innerHTML="";
}