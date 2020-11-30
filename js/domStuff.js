const $ = (function () {
    let Constructor = function (el) {

        if (!el) return;

        this.el = document.querySelectorAll(el);


        this.text = (tx) => {

            if (tx) {
                this.el.forEach(function (item) {
                    item.innerHTML = tx;
                });
                return this;
            }
            return this.el[0].innerHTML;
        };



        this.putClass = (cl) => {

            if (cl && !cl.trim()) return this; // can't trim empty space
            cl = cl.trim().split(' ');
            this.el.forEach(function (item) {
                for (let j = 0; j < cl.length; j++) {
                    item.classList.add(cl[j]);
                }
            });
            return this;
        };


        this.takeClass = (cl) => {

            if (cl && !cl.trim()) return this; // can't trim empty space
            cl = cl.trim().split(' ');
            this.el.forEach(function (item) {
                for (let j = 0; j < cl.length; j++) {
                    item.classList.remove(cl[j]);
                }
            });
            return this;
        };



        this.togClass = (cl) => {

            if (cl && !cl.trim()) return this; // can't trim empty space
            cl = cl.trim().split(' ');
            this.el.forEach(function (item) {
                for (let j = 0; j < cl.length; j++) {
                    item.classList.toggle(cl[j]);
                }
            });
            return this;
        };




        this.attribute = (att, str) => {
            if (str) {
                this.el.forEach(function (item) {
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
    let instantiate = function (selector) {
        return new Constructor(selector);
    };

    /**
     * Return the constructor instantiation
     */
    return instantiate;

})();
