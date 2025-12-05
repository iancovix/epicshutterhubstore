// Detect which page
let page = document.body.getAttribute('data-page');

let sliderContent = {
    cameras: [
        { img: "/canoneosr6mark2.webp", title: "Canon R6 Mark II – New Arrival" },
        { img: "/sonyar7.webp", title: "Sony Ar 7 – Full Frame Beast" },
        { img: "/fuji-x100v.jpg", title: "Fujifilm X100V – Iconic" }
    ],
    lenses: [
        { img: "/sonygm24-70.webp", title: "24–70mm f2.8 – Perfect All-rounder" },
        { img: "/canonrf50.webp", title: "50mm f1.8 – Portrait King" },
        { img: "/tamron28-75.webp", title: "70–200mm – Pro Telephoto" }
    ],
    lighting: [
        { img: "/godoxsl60w.webp", title: "Softbox 120cm – Studio Essential" },
        { img: "/godoxad6600bm.webp", title: "Godox LED Panel – CRI 96+" },
        { img: "/godoxled500c.webp", title: "Ring Light – For Beauty Shots" }
    ]
};

// Insert slides
let slidesContainer = document.querySelector('.slides');

sliderContent[page].forEach(item => {
    let slide = document.createElement('div');
    slide.classList.add('slide');
    slide.style.backgroundImage = `url(${item.img})`;
    slide.innerHTML = `<h2>${item.title}</h2>`;
    slidesContainer.appendChild(slide);
});

// Slider Logic
let index = 0;

document.querySelector('.next').onclick = () => {
    index = (index + 1) % sliderContent[page].length;
    slidesContainer.style.transform = `translateX(-${index * 100}%)`;
};

document.querySelector('.prev').onclick = () => {
    index = (index - 1 + sliderContent[page].length) % sliderContent[page].length;
    slidesContainer.style.transform = `translateX(-${index * 100}%)`;
};
