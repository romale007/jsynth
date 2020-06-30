"use strict";
 
let context = new AudioContext (); // обращаемся к глобальному аудио контексту

class Sound {                                     // Создаём класс , который каждый раз будет обращаться к глобальному контексту    
    constructor(context) {
        this.context = context;  
     
    }
    init() {                                          // создаём фунцию, которая будет каждое нажатие создавать цепь осцилятор-усилитель-выход      
        this.oscillator = context.createOscillator(); // создаём в контексте: узел осцилятора 
        this.gainNode = context.createGain();         // создаём в контексте: узел усилителя

        this.oscillator.connect(this.gainNode);          // втыкаем осцилятор в усилитель
        this.gainNode.connect(this.context.destination); // втыкаем усилитель в устройство вывода

        this.oscillator.type = 'sine';                   // задаём форму осцилятора (синус самый мягкий по звучанию)
        this.gainNode.gain.setValueAtTime(0.1, this.context.currentTime); // задаём уровень громкости (50%) и время запуска (сразу)
    }
    play(freq) {                                        //создаём функцию, которая будет запускать осцилятор, два параметра - частота и время запуска
        this.init();                                    // создаёт цепь  "осцилятор-усилитель-выход" и форму осцилятора 
        this.oscillator.frequency.value = freq;           // присваивает свойству oscillator.frequency.freq значение переменной freq  
        this.oscillator.start();                          // запускаем
    }
    stop() {                                            // останавливаем 
        
        this.oscillator.stop ();
         
    }

}

// создаём класс Нота, свойство - частота (Гц)

class Note {
    constructor(freq) {
        this.freq = freq;
    }
}
// создаём объекты - Ноты


const C4 = new Note(261.63);
const Db4 = new Note(277.18);
const D4 = new Note(293.66);
const Eb4 = new Note(311.13);
const E4 = new Note(329.63);
const F4 = new Note(349.23);
const Gb4 = new Note(369.99);
const G4 = new Note(392.00);
const Ab4 = new Note(415.30);
const A4 = new Note(440.00);
const Bb4 = new Note(466.16);
const B4 = new Note(493.88);



// let now = context.currentTime; - пока не буду использовать временные метки, всё вопроизводится сразу (по умолчанию)

// Создаём массив с частотами нот

let whiteNotesFrequencies = [C4.freq, D4.freq, E4.freq, F4.freq, G4.freq, A4.freq, B4.freq];

let blackNotesFrequencies = [Db4.freq, Eb4.freq, 0, Gb4.freq, Ab4.freq, Bb4.freq];


//рисуем клавиши c помощью цикла

function draw() {                    
    let html = "";
    let box = document.querySelector('#box');
    for (let i = 0; i < whiteNotesFrequencies.length; i++) {
        
        let flag = true;
        let note = whiteNotesFrequencies[i];

        if (note == 329.63 || note == 493.88) 
        flag = false;
        // через dataset назначаем клавишам-нотам их частоты из массивов     
        html +=`<div  class = "whitenotes" data-note='${whiteNotesFrequencies[i]}'>`;                
        
        if (flag) {
        html +=`<div  class = "blacknotes" data-note='${blackNotesFrequencies[i]}'></div>`;
    }

        html +='</div>';
    }
    box.innerHTML = html;
      
    document.querySelectorAll('.whitenotes').forEach(function(element) {
        element.onmousedown = playNow;
        element.onmouseup = stopNow; 
         
    });

      document.querySelectorAll('.blacknotes').forEach(function(element) {
        element.onmousedown = playNow;  
        element.onmouseup = stopNow;  
        
    });
  }

  let Play = new Sound(context); // создаём объект

    /*
    let doNota = document.querySelector(`.whitenotes[data="${C4.freq}"]`);

    

      document.addEventListener('keypress', function(event){
       
        if (event.code == 'KeyQ')
        console.log(1);
        
     });
      document.addEventListener('keyup', function(event){
        Play.stop();
      });
*/



function playNow(){
    
    let x = this.dataset.note;
    Play.play(x);
    event.stopPropagation();
    localStorage.setItem(`currentFreq`, `${this.dataset.note}`);
}

function stopNow(){
    Play.stop();
}


    //тест - кнопка
    btn.onmousedown = function () {  //
    Play.play(Gb4.freq);
    }
    btn.onmouseup = function () {
    Play.stop();
    }


    
function playDo() {
    
    let x = this.dataset.note;
    
    console.log(x);
}

draw(); 


//function noteDown(elem){
 //   let currentNote = elem.dataset.note;
 //   alert(currentNote);
//}


//здесь пока всё играет

















