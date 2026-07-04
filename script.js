/* =========================================================
   HAPPY BIRTHDAY WEBSITE
   Version 1.0
========================================================= */

/* ============================
   CONFIG
============================ */

const PHOTO_COUNT = 10;
const PASSWORD = "07/07/26";

/* ============================
   PHOTO ARRAY
============================ */

const photos = [];

for (let i = 1; i <= PHOTO_COUNT; i++) {
    photos.push(`assets/photos/${i}.jpg`);
}

/* ============================
   DOM
============================ */

const landing = document.getElementById("landing");
const password = document.getElementById("password");
const memory = document.getElementById("memory");
const gift = document.getElementById("gift");
const jar = document.getElementById("jar");
const fireworksList = document.getElementById("fireworks");
const ending = document.getElementById("ending");

const startBtn = document.getElementById("startBtn");
const passwordBtn = document.getElementById("passwordBtn");
const passwordInput = document.getElementById("passwordInput");

const bgMusic = document.getElementById("bgMusic");

const leftColumn = document.getElementById("leftColumn");
const middleColumn = document.getElementById("middleColumn");
const rightColumn = document.getElementById("rightColumn");

/* ============================
   SCREEN MANAGER
============================ */

function hideAllScreens() {

    document
        .querySelectorAll(".screen")
        .forEach(screen => {

            screen.classList.remove("active");

        });

}

function showScreen(id) {

    hideAllScreens();

    document
        .getElementById(id)
        .classList.add("active");

}

/* ============================
   MUSIC
============================ */

let musicStarted = false;

function startMusic() {

    if (musicStarted) return;

    musicStarted = true;

    bgMusic.volume = 0.5;

    bgMusic.play().catch(() => {});

}

/* ============================
   RANDOM NUMBER
============================ */

function random(min, max) {

    return Math.random() * (max - min) + min;

}

/* =========================================================
   PHOTO WALL GENERATOR
========================================================= */

function createPhotoCard(src) {

    const card = document.createElement("div");
    card.className = "photo";

    const img = document.createElement("img");

    img.src = src;

    img.loading = "lazy";

    img.onerror = function () {

        this.src =
            "https://placehold.co/600x900/8d5cff/ffffff?text=❤️";

    };

    card.appendChild(img);

    return card;

}

function populateColumn(column) {

    for (let i = 0; i < photos.length; i++) {

        column.appendChild(createPhotoCard(photos[i]));

    }

    // Duplicate for seamless infinite scrolling

    for (let i = 0; i < photos.length; i++) {

        column.appendChild(createPhotoCard(photos[i]));

    }

}

populateColumn(leftColumn);

populateColumn(middleColumn);

populateColumn(rightColumn);


/* =========================================================
   STARS
========================================================= */

const stars = document.getElementById("stars");

for (let i = 0; i < 120; i++) {

    const star = document.createElement("div");

    star.className = "star";

    star.style.left = random(0, 100) + "%";

    star.style.top = random(0, 100) + "%";

    star.style.width = random(1, 4) + "px";

    star.style.height = star.style.width;

    star.style.animationDelay = random(0, 8) + "s";

    star.style.animationDuration = random(2, 5) + "s";

    stars.appendChild(star);

}


/* =========================================================
   FAIRY PARTICLES
========================================================= */

const particles = document.getElementById("particles");

for (let i = 0; i < 70; i++) {

    const p = document.createElement("span");

    p.className = "particle";

    p.style.left = random(0, 100) + "%";

    p.style.top = random(0, 100) + "%";

    p.style.width = random(2, 7) + "px";

    p.style.height = p.style.width;

    p.style.animationDuration = random(6, 16) + "s";

    p.style.animationDelay = random(0, 10) + "s";

    particles.appendChild(p);

}


/* =========================================================
   OPEN BUTTON
========================================================= */

startBtn.addEventListener("click", () => {

    startMusic();

    document.body.classList.add("blurBackground");

    leftColumn.classList.add("slowColumn");

    middleColumn.classList.add("slowColumn");

    rightColumn.classList.add("slowColumn");

    startBtn.disabled = true;

    setTimeout(() => {

        showScreen("password");

    }, 2200);

});


/* =========================================================
   PASSWORD
========================================================= */

passwordBtn.addEventListener("click", checkPassword);

passwordInput.addEventListener("keypress", function (e) {

    if (e.key === "Enter") {

        checkPassword();

    }

});

function checkPassword() {

    if (passwordInput.value.trim() === PASSWORD) {

        passwordInput.style.borderColor = "#6dff92";

        passwordInput.style.boxShadow =
            "0 0 25px rgba(109,255,146,.8)";

        

        setTimeout(() => {

            showScreen("memory");

        }, 2400);

    }

    else {

        passwordInput.style.borderColor = "#ff4f6d";

        passwordInput.style.boxShadow =
            "0 0 20px rgba(255,79,109,.8)";

        passwordInput.value = "";

        passwordInput.placeholder = "Wrong Password ❤️";

    }

}

/* =========================================================
                    MEMORY SLIDER
========================================================= */

const memorySlider = document.getElementById("memorySlider");
const sliderDots = document.getElementById("sliderDots");

let currentSlide = 0;

const slides = [];


/* ===========================
      CREATE SLIDES
=========================== */

function createMemorySlides(){

    memorySlider.innerHTML = "";
    sliderDots.innerHTML = "";

    for(let i=0;i<PHOTO_COUNT;i++){

        const slide = document.createElement("div");

        slide.className = "memorySlide";

        const img = document.createElement("img");

        img.src = photos[i];

        img.loading = "lazy";

        img.onerror = ()=>{

            img.src =
            "https://placehold.co/900x1200/8d5cff/ffffff?text=Memory+"+(i+1);

        };

        slide.appendChild(img);

        memorySlider.appendChild(slide);

        slides.push(slide);


        const dot=document.createElement("div");

        dot.className="dot";

        dot.onclick=()=>{

            goToSlide(i);

        };

        sliderDots.appendChild(dot);

    }


    /* LAST SLIDE */

    const giftSlide=document.createElement("div");

    giftSlide.className="memorySlide giftPreview";

    giftSlide.innerHTML=`

        <div class="giftPreviewBox">

            🎁

        </div>

        <h2>

            OPEN

        </h2>

    `;

    memorySlider.appendChild(giftSlide);

    slides.push(giftSlide);


    const dot=document.createElement("div");

    dot.className="dot";

    sliderDots.appendChild(dot);

}


createMemorySlides();



/* ===========================
        SHOW SLIDE
=========================== */

function updateSlides(){

    slides.forEach((slide,index)=>{

        slide.style.display="none";

    });

    slides[currentSlide].style.display="flex";


    const dots=document.querySelectorAll(".dot");

    dots.forEach(dot=>{

        dot.classList.remove("active");

    });

    dots[currentSlide].classList.add("active");

}


updateSlides();



/* ===========================
      NEXT PREVIOUS
=========================== */

function nextSlide(){

    currentSlide++;

    if(currentSlide>=slides.length){

        currentSlide=slides.length-1;

    }

    updateSlides();

}


function previousSlide(){

    currentSlide--;

    if(currentSlide<0){

        currentSlide=0;

    }

    updateSlides();

}



/* ===========================
      KEYBOARD
=========================== */

document.addEventListener("keydown",(e)=>{

    if(!memory.classList.contains("active")) return;

    if(e.key==="ArrowRight"){

        nextSlide();

    }

    if(e.key==="ArrowLeft"){

        previousSlide();

    }

});



/* ===========================
      TOUCH SWIPE
=========================== */

let touchStartX=0;

let touchEndX=0;

memorySlider.addEventListener("touchstart",(e)=>{

    touchStartX=e.changedTouches[0].screenX;

});

memorySlider.addEventListener("touchend",(e)=>{

    touchEndX=e.changedTouches[0].screenX;

    if(touchStartX-touchEndX>60){

        nextSlide();

    }

    if(touchEndX-touchStartX>60){

        previousSlide();

    }

});



/* ===========================
        DRAG
=========================== */

let dragStart=0;

let dragging=false;

memorySlider.addEventListener("mousedown",(e)=>{

    dragging=true;

    dragStart=e.clientX;

});

document.addEventListener("mouseup",(e)=>{

    if(!dragging) return;

    dragging=false;

    let diff=e.clientX-dragStart;

    if(diff>80){

        previousSlide();

    }

    if(diff<-80){

        nextSlide();

    }

});





/* =========================================================
                    GIFT BOX
========================================================= */

const giftContainer = document.getElementById("giftContainer");

let giftOpened = false;


/* ==============================
        CREATE GIFT
============================== */

function createGift(){

    giftContainer.innerHTML = `

        <div id="giftScene">

            <div id="giftGlow"></div>

            <div id="giftBox3D">

                <div id="giftLid"></div>

                <div id="giftBody"></div>

                <div id="giftRibbonV"></div>

                <div id="giftRibbonH"></div>

            </div>

            <h2 id="giftText">

                OPEN

            </h2>

        </div>

    `;

}

createGift();



/* ==============================
        OPEN GIFT
============================== */

giftContainer.addEventListener("click",()=>{

    if(!gift.classList.contains("active")) return;

    if(giftOpened) return;

    giftOpened=true;

    const box=document.getElementById("giftBox3D");

    box.classList.add("openGift");

    document.getElementById("giftText").innerHTML="Opening... ❤️";



    setTimeout(()=>{

        riseJar();

    },2500);

});



/* ==============================
    MEMORY → GIFT
============================== */

memorySlider.addEventListener("click",()=>{

    if(currentSlide!==slides.length-1) return;

    showScreen("gift");

});



/* ==============================
      GLOW ANIMATION
============================== */

let glow=0;

setInterval(()=>{

    if(!gift.classList.contains("active")) return;

    glow+=0.03;

    const g=document.getElementById("giftGlow");

    if(g){

        g.style.transform=

        `scale(${1+Math.sin(glow)*0.05})`;

    }

},16);



/* ==============================
      FLOATING BOX
============================== */

let floatValue=0;

setInterval(()=>{

    if(!gift.classList.contains("active")) return;

    floatValue+=0.02;

    const box=document.getElementById("giftBox3D");

    if(box){

        box.style.transform=

        `translateY(${Math.sin(floatValue)*10}px)`;

    }

},16);



/* ==============================
      SMALL SPARKLES
============================== */

setInterval(()=>{

    if(!gift.classList.contains("active")) return;

    const s=document.createElement("div");

    s.className="giftSparkle";

    s.style.left=Math.random()*100+"%";

    s.style.top=Math.random()*100+"%";

    giftContainer.appendChild(s);

    setTimeout(()=>{

        s.remove();

    },2000);

},180);

/* =========================================================
                    JAR ENGINE
========================================================= */

const jarContainer = document.getElementById("jarContainer");

const HEART_COUNT = 40;
const MESSAGE_COUNT = 40;

let openedHearts = 0;

const heartMessages = [

"You're my favourite person ❤️",

"You make every day brighter ☀️",

"I still smile thinking about you 😊",

"I love your laugh ❤️",

"I'm lucky to have you 💖",

"You are my home 🏡",

"I miss you even when we just talked 🥺",

"Thank you for loving me ❤️",

"I hope we celebrate many birthdays together 🎂",

"You are beautiful 🌸",

"You're my peace 🤍",

"I'll always choose you ❤️"

];

/* ==========================
      GOTO SLIDE
========================== */

function goToSlide(index){

    if(index<0) return;

    if(index>=slides.length) return;

    currentSlide=index;

    updateSlides();

}

/* ==========================
      RISE JAR
========================== */

function riseJar(){

    showScreen("jar");

    createJar();

}

/* ==========================
      CREATE JAR
========================== */

function createJar(){

    jarContainer.innerHTML="";

    const scene=document.createElement("div");

    scene.id="jarScene";

    scene.innerHTML=`

        <div id="glassJar">

            <div id="jarLid"></div>

            <div id="jarBody">

                <div id="heartArea"></div>

            </div>

        </div>

        <h2 id="jarTitle">

            Tap every heart ❤️

        </h2>

        <div id="heartCounter">

            0 / ${HEART_COUNT}

        </div>

    `;

    jarContainer.appendChild(scene);

    createHearts();

}

/* ==========================
      HEARTS
========================== */

function createHearts(){

    const area=document.getElementById("heartArea");

    area.innerHTML="";

    for(let i=0;i<HEART_COUNT;i++){

        const heart=document.createElement("div");

        heart.className="heart";

        heart.innerHTML="❤️";

        heart.style.left=random(10,90)+"%";

        heart.style.top=random(10,90)+"%";

        heart.style.fontSize=random(20,38)+"px";

        heart.onclick=()=>{

            openHeart(heart);

        };

        area.appendChild(heart);

    }

}

/* ==========================
      OPEN HEART
========================== */

function openHeart(heart){

    if(heart.classList.contains("done")) return;

    heart.classList.add("done");

    openedHearts++;

    document.getElementById("heartCounter").innerHTML=

    `${openedHearts} / ${HEART_COUNT}`;

    heart.style.pointerEvents="none";

    heart.style.transform="scale(1.8)";

    heart.style.opacity="0";

    showHeartMessage();

    if(openedHearts===HEART_COUNT){

        setTimeout(finishJar,2000);

    }

}

/* ==========================
      HEART MESSAGE
========================== */

function showHeartMessage(){

    const msg=document.createElement("div");

    msg.className="heartMessage";

    msg.innerHTML=

    heartMessages[

        Math.floor(

            Math.random()*heartMessages.length

        )

    ];

    document.body.appendChild(msg);

    setTimeout(()=>{

        msg.classList.add("show");

    },20);

    setTimeout(()=>{

        msg.classList.remove("show");

    },1800);

    setTimeout(()=>{

        msg.remove();

    },2400);

}

/* ==========================
      FINISH
========================== */

function finishJar(){

    const done=document.createElement("div");

    done.className="finishOverlay";

    done.innerHTML=`

        <h1>

        Aww...

        </h1>

        <h2>

        You finished the jar? ❤️

        </h2>

    `;

    document.body.appendChild(done);

    setTimeout(()=>{

        done.classList.add("show");

    },50);

    setTimeout(()=>{

        done.remove();

        startFireworks();

    },3500);

}

/* =========================================================
                    FIREWORK ENGINE
========================================================= */

const fireCanvas = document.getElementById("fireCanvas");

const fireCtx = fireCanvas.getContext("2d");

let fireworksRunning = false;

let fireworkList = [];

let particlesFire = [];

/* ==========================
        RESIZE
========================== */

function resizeFireCanvas(){

    fireCanvas.width = window.innerWidth;

    fireCanvas.height = window.innerHeight;

}

resizeFireCanvas();

window.addEventListener("resize",resizeFireCanvas);


/* ==========================
        FIREWORK CLASS
========================== */

class Firework{

    constructor(){

        this.x=random(100,fireCanvas.width-100);

        this.y=fireCanvas.height;

        this.targetY=random(80,fireCanvas.height/2);

        this.speed=random(7,11);

        this.color=`hsl(${random(0,360)},100%,65%)`;

    }

    update(){

        this.y-=this.speed;

        if(this.y<=this.targetY){

            this.explode();

            return false;

        }

        return true;

    }

    draw(){

        fireCtx.beginPath();

        fireCtx.arc(this.x,this.y,3,0,Math.PI*2);

        fireCtx.fillStyle=this.color;

        fireCtx.fill();

    }

    explode(){

        for(let i=0;i<70;i++){

            particlesFire.push(

                new Spark(

                    this.x,

                    this.y,

                    this.color

                )

            );

        }

    }

}


/* ==========================
        SPARK
========================== */

class Spark{

    constructor(x,y,color){

        this.x=x;

        this.y=y;

        this.color=color;

        this.life=100;

        this.vx=random(-5,5);

        this.vy=random(-5,5);

    }

    update(){

        this.x+=this.vx;

        this.y+=this.vy;

        this.vy+=0.05;

        this.life--;

        return this.life>0;

    }

    draw(){

        fireCtx.globalAlpha=this.life/100;

        fireCtx.beginPath();

        fireCtx.arc(this.x,this.y,2,0,Math.PI*2);

        fireCtx.fillStyle=this.color;

        fireCtx.fill();

        fireCtx.globalAlpha=1;

    }

}


/* ==========================
      START FIREWORKS
========================== */

function startFireworks(){

    console.log("Fireworks Started");

    showScreen("fireworks");

    fireworksRunning = true;

    for(let i=0;i<15;i++){

        fireworkList.push(new Firework());

    }

}


/* ==========================
      LOOP
========================== */

function fireLoop(){

    requestAnimationFrame(fireLoop);

    if(!fireworksRunning) return;

    fireCtx.clearRect(

        0,

        0,

        fireCanvas.width,

        fireCanvas.height

    );

    if(Math.random()<0.08){

        fireworkList.push(new Firework());

    }

    fireworkList = fireworkList.filter(f => {

        f.draw();

        return f.update();

    });

    particlesFire=particlesFire.filter(p=>{

        p.draw();

        return p.update();

    });

}

fireLoop();


/* ==========================
      AUTO FINISH
========================== */

function finishFireworks(){

    fireworksRunning=false;

    showScreen("ending");

}

setInterval(()=>{

    if(!fireworksRunning) return;

    finishFireworks();

},18000);

/* =========================================================
                    FINAL POLISH
========================================================= */

/* ==========================
      MESSAGE OVERLAY
========================== */

function showOverlayMessage(title, subtitle, duration = 1800) {

    const overlay = document.createElement("div");

    overlay.className = "overlayMessage";

    overlay.innerHTML = `
        <div class="overlayCard">
            <h1>${title}</h1>
            ${subtitle ? `<p>${subtitle}</p>` : ""}
        </div>
    `;

    document.body.appendChild(overlay);

    requestAnimationFrame(() => {
        overlay.classList.add("show");
    });

    setTimeout(() => {

        overlay.classList.remove("show");

        setTimeout(() => {

            overlay.remove();

        }, 600);

    }, duration);

}

/* ==========================
      BETTER PASSWORD FLOW
========================== */

function passwordSuccessFlow(){

    showOverlayMessage(
        "Good Girl ❤️",
        ""
    );

    setTimeout(()=>{

        showOverlayMessage(
            "Here's a recap ❤️",
            ""
        );

    },2200);

    setTimeout(()=>{

        showScreen("memory");

    },4600);

}

/* ==========================
      REPLACE PASSWORD BUTTON
========================== */

passwordBtn.removeEventListener("click",checkPassword);

passwordBtn.addEventListener("click",()=>{

    if(passwordInput.value.trim()===PASSWORD){

        passwordSuccessFlow();

    }

    else{

        passwordInput.style.borderColor="#ff4f6d";

        passwordInput.style.boxShadow=
        "0 0 25px rgba(255,79,109,.7)";

        passwordInput.value="";

        passwordInput.placeholder="Wrong Password ❤️";

    }

});

passwordInput.addEventListener("keydown",(e)=>{

    if(e.key!=="Enter") return;

    passwordBtn.click();

});

/* ==========================
      MUSIC FADE
========================== */

function fadeMusic(volume,time=2000){

    const start=bgMusic.volume;

    const step=(start-volume)/40;

    let current=start;

    const fade=setInterval(()=>{

        current-=step;

        bgMusic.volume=Math.max(volume,current);

        if(
            (step>0 && current<=volume) ||
            (step<0 && current>=volume)
        ){

            bgMusic.volume=volume;

            clearInterval(fade);

        }

    },time/40);

}

/* ==========================
      ENDING EFFECT
========================== */

const endingObserver=new MutationObserver(()=>{

    if(!ending.classList.contains("active")) return;

    fadeMusic(.25,5000);

});

endingObserver.observe(
    ending,
    {
        attributes:true
    }
);

/* ==========================
      INITIAL STATE
========================== */

showScreen("landing");

console.log(
`
======================================
 Happy Birthday Website Loaded ❤️
======================================

Photo Count : ${PHOTO_COUNT}

Password : ${PASSWORD}

Everything initialized successfully.

`
);