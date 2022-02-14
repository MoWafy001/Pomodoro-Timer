var work, shortBreak, sessions, sessionCounter=1, longBreak;
var time, timer;
var working = true;
var errorBox = document.querySelector("#errorBox");
var s = false
var ended = false
var pausing = false
var po = false
var hidS = true
var dateSet = false;
var d, st;

function setTime(seconds) {
    let s = ""+Math.floor((seconds-Math.floor(seconds/60)*60));
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
    document.querySelector("audio").pause()
    document.querySelector("audio").currentTime = 0
}
clock = ()=>{
    if (!dateSet & !pausing && !s) {
        dateSet=true
        console.log(1);
        d = new Date();
        st = time
    }
    timeText = setTime(time)
    document.title = timeText;
    document.querySelector("#time").textContent = timeText;
    if(time>0) {
        if (!pausing) {
            time = st-((new Date())-d)/1000;
        }else{
            dateSet = false
        }
        time = (time<0)?0:time;
    }else{
        dateSet = false
        if (!s && !ended) {
            s = true
            ended = true
            update()
            document.querySelector("audio").play()
        }
        if (!s && ended) {
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
    if (document.hidden && hidS) {
        hidS = false
        clearInterval(timer);
        timer = setInterval(clock,100)
    }
    if (!document.hidden && !hidS) {
        hidS = true
        clearInterval(timer);
        timer = setInterval(clock,10)
    }
}
function run() {
    timer = setInterval(clock,10)
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
