$(function(){
    const model = {
        currentCat: null,
        cats: [
            {clickCount:0,
                name:'Tabby',
                imgSrc:'img/1.jpg'},
            {clickCount:0,
                name:'Tiger',
                imgSrc:'img/2.jpg'},
            {clickCount:0,
                name:'Scaredy',
                imgSrc:'img/3.jpg'},
            {clickCount:0,
                name:'Shadow',
                imgSrc:'img/4.jpg'}]
    };

    let octpus = {
        init: function() {
            model.currentCat = model.cats[0];
            catListView.init();
            catView.init();
            adminView.init();
        },

        getCurrentCat: function() {
            return model.currentCat;
        },

        getCats: function() {
            return model.cats;
        },

        setCurrentCat: function(cat) {
            model.currentCat = cat;
        },

        incrementCounter: function() {
            model.currentCat.clickCount++;
            catView.render();
        },

        saveCat: function(name, imgsrc, clickcount) {
            model.currentCat.name = name;
            model.currentCat.imgSrc = imgsrc;
            model.currentCat.clickCount = clickcount;
            catView.render();
        }

    };

    let catView = {
        init: function() {
            this.catElem = document.getElementById('cat');
            this.catNameElem  = document.getElementById('cat-name');
            this.countElem  = document.getElementById('cat-count');
            this.catImageElem  = document.getElementById('cat-img');

            this.catImageElem.addEventListener('click',function() {
                octpus.incrementCounter();
            });
            this.render();
        },

        render: function() {
            let currentCat = octpus.getCurrentCat();
            this.catNameElem.textContent = currentCat.name;
            this.catImageElem.src = currentCat.imgSrc;
            this.countElem.textContent = currentCat.clickCount;
        }
    };

    let catListView = {
        init: function() {
            this.catListElem = document.getElementById('cat-list');
            this.render();
        },

        render: function() {
            let elem;
            let cats = octpus.getCats();

            this.catListElem.innerHtml ='';
            cats.forEach(cat => {
                elem = document.createElement('li');
                elem.textContent = cat.name;
                elem.addEventListener('click', (function(catCopy) {
                    return function(){
                        octpus.setCurrentCat(catCopy);
                        catView.render();
                    };
                })(cat));
                this.catListElem.appendChild(elem);
            });
        }
    };

    let adminView = {
        init: function() {
            this.adminElem = document.getElementById('admin');
            
            this.render();
        },

        render: function() {
            let cancelElem, saveElem;
            let newCatName, newImgSrc, newClickCount;

            cancelElem = document.getElementById('cancel');
            saveElem = document.getElementById('save');

            saveElem.addEventListener('click', function(){
                newCatName = document.getElementById("name").value;
                newImgSrc = document.getElementById("imgsrc").value;
                newClickCount = document.getElementById("clickcnt").value;
                octpus.saveCat(newCatName, newImgSrc, newClickCount);
            });
        }
    };
    octpus.init();
}());
