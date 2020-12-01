const $ = (function () {
    let Constructor = function (el, n) {

        if (!el) return;

        this.el = document.querySelectorAll(el);
        this.n = n;



        this.text = (tx) => {

            if (tx) {
                for (let i = 0; i < this.el.length; i++) {

                    if ((this.n || this.n === 0) && this.n !== i) continue;
                    this.el[i].innerHTML = tx;
                }

                return this;
            }

            return this.el[0].innerHTML;
        };



        this.putClass = (cl) => {

            if (cl && !cl.trim()) return this; // can't trim empty space
            cl = cl.trim().split(' ');
            this.el.forEach((item, index) => { // arrow functions don't have own 'this', ha!

                for (let j = 0; j < cl.length; j++) {
                    if ((this.n || this.n === 0) && this.n !== index) continue;
                    item.classList.add(cl[j]);
                }
            });
            return this;
        };


        this.takeClass = (cl) => {

            if (cl && !cl.trim()) return this; // can't trim empty space
            cl = cl.trim().split(' ');
            this.el.forEach(function (item,index) {
                for (let j = 0; j < cl.length; j++) {
                    if ((this.n || this.n === 0) && this.n !== index) continue;

                    item.classList.remove(cl[j]);
                }
            },this);// pass 'this' to .forEach loop
            return this;
        };



        this.togClass = (cl) => {

            if (cl && !cl.trim()) return this; // can't trim empty space
            cl = cl.trim().split(' ');
            this.el.forEach(function (item, index) {
                for (let j = 0; j < cl.length; j++) {
                    if ((this.n || this.n === 0) && this.n !== index) continue;
                    item.classList.toggle(cl[j]);
                }
            },this);
            return this;
        };




        this.attribute = (att, str) => {
            if (str) {
                this.el.forEach(function (item, index) {
                    item.setAttribute(att, str);
                });
                return this;
            }
            return this.el[0].getAttribute(att);

        };




        this.val = (v) => {

            if (v) {
                this.el.forEach(function (item) {
                    item.value = v;
                });
                return this;
            }
            return this.el[0].value;

        };



        this.focus = () => {
            this.el[0].focus();
            return this;
        };
        
        this.eq = (n) => {
            this.n=n;
            return this;
        };


        this.scrollToView = (bool) => {
            this.el[0].scrollIntoView(bool);
            return this;
        };



        this.hasClass = (cl) => {
            return this.el[0].classList.contains(cl);
        };

        this.fuckOff = () => {
            this.el.forEach(function (item) {
                item.remove();
            });
        };



        this.on = (event, callback) => {
            this.el.forEach(function (item) {
                item.addEventListener(event, callback, false);
            });
            return this;
        };

    };

    /**
     * Instantiate a new constructor
     */
    let instantiate = function (...args) {
        return new Constructor(...args);
    };

    /**
     * Return the constructor instantiation
     */
    return instantiate;

})();
