var work, shortBreak, sessions, sessionCounter=1, longBreak;
var time, timer;
var working = true;
var errorBox = document.querySelector("#errorBox");
var s = false
var ended = false
var pausing = false

function setTime(seconds) {
    let s = ""+(seconds-Math.floor(seconds/60)*60);
    if (s.length<2) {
        s=""+"0"+s;
    }
    if (s.length<2) {
        s=""+"0"+s;
    }
    let m = ""+Math.floor(seconds/60);
    if (m.length<2) {
        m="0"+m;
    }
    if (m.length<2) {
        m="0"+m;
    }
    return m+":"+s;
}
update = ()=>{
    document.querySelector("#pause").innerHTML = (pausing)?"resume":"pause";
    document.querySelector("#skip").innerHTML = (s)?"next":"skip";
}
clock = ()=>{
    document.querySelector("#time").textContent = setTime(time);
    if(time>0) {
        time-=(!pausing)?1:0;   
    }else{
        if (!s && !ended) {
            s = true
            ended = true
            update()
            document.querySelector("audio").play()
        }
        if (!s && ended) {
            document.querySelector("audio").pause()
            document.querySelector("audio").currentTime = 0
            ended = false
        }
        if(!s){
            if (working) {
                working=false
                if (sessionCounter<sessions || sessions == 1) {
                    if (sessions!=1 && longBreak!=0) {
                        sessionCounter+=1   
                    }
                    time = shortBreak
                    document.querySelector("#sessionType").textContent="short break";
                }else{
                    document.querySelector("#sessionType").textContent="long break";
                    sessionCounter=1
                    time = longBreak
                }
            }else{
                if (sessions!=1 && longBreak!=0) {
                    document.querySelector("#sessionType").innerHTML=`work ${sessionCounter}/${sessions}`;
                }else{
                    document.querySelector("#sessionType").innerHTML=`work`;
                }
                
                working=true
                time = work
            }
        }
    }
}
function run() {
    timer = setInterval(clock,1000)
}

function start() {
    //This part validates the user's input
    ok = true;
    for(const i of document.querySelectorAll("#setup p input")){
        ok = i.checkValidity();
        if(!ok){
            break;
        }
    }// If everything is OK, the user's input is then stored in variables. Next, transition to the timer.
    if(ok){
        work = document.querySelector("#work").value * 60;
        shortBreak = document.querySelector("#shortBreak").value * 60;
        sessions = document.querySelector("#sessions").value;
        longBreak = document.querySelector("#longBreak").value * 60;
        document.querySelector("#setup").style.transform = "translateY(-130%) scale(0)";
        setTimeout(()=>{
            document.querySelector("#setup").style.display = "none";
            document.querySelector("#running").style.display = "flex";
        },1000);
        setTimeout(()=>{
            document.querySelector("#running").style.transform = "translateY(0) scale(1)";
        },1100);
        time = work;
        if (sessions!=1 && longBreak!=0) {
            document.querySelector("#sessionType").innerHTML=`work ${sessionCounter}/${sessions}`;
        }else{
            document.querySelector("#sessionType").innerHTML=`work`;
        }
        run();
    }else{// If everything isn't ok, display an error message.
        errorBox.style.opacity="1";
        errorBox.style.top="100%";
        setTimeout(()=>{errorBox.style.opacity="0";errorBox.style.top="80%";},3000)
    }
    
}

const p = document.querySelector("#setup p");
p.addEventListener("keyup",validate,true);

const startBtn = document.querySelector("#start");
startBtn.addEventListener("click",start)