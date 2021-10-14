predict1="";
predict2="";
camera=document.getElementById("cam");
Webcam.attach(camera)
Webcam.set({
    width:350,
    height:300,
    image_format : 'png',
    png_quality:90
  });
function Click(){
    Webcam.snap(function (data_uri){
        document.getElementById("pic").innerHTML="<img id='imgOutput' src='"+data_uri+"'>"});
}
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/wd95RTVOE/model.json',modelLoaded);
function modelLoaded() {
    console.log("blablabla model is loaded as you probably know");
}
function predict() {
    img=document.getElementById("imgOutput");
    classifier.classify(img,gotResult);
}
function gotResult(error,results) {
    if (error) {
        console.error(error);
    }
    else{
        console.log(results)
        document.getElementById("emoji-name1").innerHTML=results[0].label;
        document.getElementById("emoji-name2").innerHTML=results[1].label;
        predict1=results[0].label;
        predict2=results[1].label;
        if (results[0].label=='Angry') {
            document.getElementById("emoji1").innerHTML='&#128545';
        }
        if (results[0].label=='Crazy') {
            document.getElementById("emoji1").innerHTML='&#x1f92a';
        }
        if (results[0].label=='Sad') {
            document.getElementById("emoji1").innerHTML='&#128532';
        }
        if (results[0].label=='Happy') {
            document.getElementById("emoji1").innerHTML='&#128522';
        }
        if (results[1].label=='Angry') {
            document.getElementById("emoji2").innerHTML='&#128545';
        }
        if (results[1].label=='Crazy') {
            document.getElementById("emoji2").innerHTML='&#x1f92a';
        }
        if (results[1].label=='Sad') {
            document.getElementById("emoji2").innerHTML='&#128532';
        }
        if (results[1].label=='Happy') {
            document.getElementById("emoji2").innerHTML='&#128522';
        }
        speak();
    }
}
function speak() {
    synth=window.speechSynthesis
    speechData="The first prediction is"+predict1+", and the second prediction is"+predict2+", and by the way my name is Bob";
    synthData=new SpeechSynthesisUtterance(speechData);
    synth.speak(synthData);
}