var work, shortBreak, sessions, longBreak;
var errorBox = document.querySelector("#errorBox");

function start() {
    ok = true;
    for(const i of document.querySelectorAll("#setup p input")){
        ok = i.checkValidity();
        if(!ok){
            break;
        }
    }
    if(ok){
        work = document.querySelector("#work").value;
        shortBreak = document.querySelector("#shortBreak").value;
        sessions = document.querySelector("#sessions").value;
        longBreak = document.querySelector("#longBreak").value;
        document.querySelector("#setup").style.transform = "translateY(-130%) scale(0)";
        setTimeout(()=>{
            document.querySelector("#setup").style.display = "none";
            document.querySelector("#running").style.display = "flex";
        },1000);
        setTimeout(()=>{
            document.querySelector("#running").style.transform = "translateY(0) scale(1)";
        },1100);
    }else{
        errorBox.style.opacity="1";
        errorBox.style.top="100%";
        setTimeout(()=>{errorBox.style.opacity="0";errorBox.style.top="80%";},3000)
    }
    
}

const p = document.querySelector("#setup p");
p.addEventListener("keyup",validate,true);

const startBtn = document.querySelector("#start");
startBtn.addEventListener("click",start)