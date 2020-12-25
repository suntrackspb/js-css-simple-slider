'use strict'
document.head.insertAdjacentHTML('beforeend', '<link rel="stylesheet" href="./slider/slider.css">')
document.head.insertAdjacentHTML('beforeend', '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css">')
document.head.insertAdjacentHTML('beforeend', '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css" integrity="sha512-+4zCK9k+qNFUR5X+cKL9EIR+ZOhtIloNl9GIKS57V1MyNsYpYcUrUeQc9vNfzsWfV28IaLL3i96P9sdNyeRssA==" crossorigin="anonymous" />')
let slider = document.querySelector('.slider');


let preLoader = document.createElement('i');
preLoader.classList.add('fas', 'fa-spinner', 'fa-spin');
slider.insertAdjacentElement("afterbegin", preLoader);

let leftArrow = document.createElement('i');
leftArrow.classList.add('fas', 'fa-chevron-circle-left', 'slider-leftArrow');
slider.insertAdjacentElement("afterbegin", leftArrow);

let rightArrow = document.createElement('i');
rightArrow.classList.add('fas', 'fa-chevron-circle-right', 'slider-rightArrow');
slider.insertAdjacentElement("afterbegin", rightArrow);

let dotSlide = document.createElement('ol');
dotSlide.classList.add('slider-dots')
slider.insertAdjacentElement("afterbegin", dotSlide);

function hidePreloader(preLoader){
    preLoader.style.display = 'none';
}

window.addEventListener('load', function(){
    hidePreloader(preLoader);
    images.init();

    leftArrow.addEventListener('click', function () {
        images.setNextLeftImage();
    });

    rightArrow.addEventListener('click', function () {
        images.setNextRightImage();
    });

    dotSlide.addEventListener('click', function (event) {
        if (event.target.id != ''){
            images.goToSlide(event.target.id);
        }
    })
})

function autoplay(){
    images.setNextRightImage();
}

class Slider {
    constructor(params) {
        this.width = params.width;
        this.height = params.height;
        this.urls = params.urls;
        this.autoplay = params.autoplay;
        this.interval = params.interval
    }

    loadImg() {
        if (this.width !== null && this.width !== '' && this.height !== null && this.height){
            slider.setAttribute('style', `width: ${this.width}; height: ${this.height};`)
        }
        
        this.urls.forEach(element => {
            slider.insertAdjacentHTML('beforeend', `
            <div class="slider-item slider-hidden">
                <img src="${element}" alt="">
            </div>
            `)
        });

        for(let i = this.urls.length-1; i >= 0 ; i--){
            let dot = document.createElement('li')
            dot.setAttribute('id', i)
            dotSlide.insertAdjacentElement("afterbegin", dot)
        }

        if (this.autoplay){
            let timerId = setInterval(() => autoplay(), this.interval);   
        }
    }
}

let images = {
    currIdx: 0,
    slides: [],
    init () {
        this.slides = document.querySelectorAll('.slider-item')
        this.showImgCurrIdx()
    },

    showImgCurrIdx() {
        this.slides[this.currIdx].classList.add('animate__animated', 'animate__fadeIn');
        dotSlide.children[this.currIdx].classList.add('slider-dot-active')
        this.slides[this.currIdx].classList.remove('slider-hidden')
    },
    
    hideVisibleImage(currIdx){
        this.slides[currIdx].classList.remove('animate__animated', 'animate__fadeIn')
        dotSlide.children[currIdx].classList.remove('slider-dot-active')
        this.slides[currIdx].classList.add('slider-hidden')
    },
    
    setNextLeftImage() {
        this.hideVisibleImage(this.currIdx);
        if (this.currIdx == 0) {
            this.currIdx = this.slides.length - 1;
        } else {
            this.currIdx--;
        }
        this.showImgCurrIdx();
    }, 

    setNextRightImage() {
        this.hideVisibleImage(this.currIdx);
        if (this.currIdx == this.slides.length - 1) {
            this.currIdx = 0;
        } else {

            this.currIdx++;
        }
        this.showImgCurrIdx();
    },

    goToSlide(index){
        this.hideVisibleImage(this.currIdx);
        this.currIdx = index;
        this.showImgCurrIdx();
    }
}
