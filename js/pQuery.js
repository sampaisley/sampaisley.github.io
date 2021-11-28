function $(selector, indx) {
  'use strict';


  let el;



  let els = Array.from(document.querySelectorAll(selector));

  if (indx >= 0 && indx <= els.length) {

    el = [els[indx]];

  } else {
    indx = null;
    el = els;
  }



  return {
    el,


    indx,


    eq(eq, amount = 1) {

      el = Array.from(els); // re-set el
      if (eq >= 0 && eq <= el.length && eq !== null) {
        indx = eq;
        //el = [els[indx]];
        el = (el.splice(indx, amount));

      }
      return this;
    },



    text(newText) {

      if (newText || newText === 0) {
        for (let i = 0; i < el.length; i++) {

          el[i].innerHTML = newText;
        }

        return this;
      }

      return el[0].innerHTML;
    },



    putClass(cl) {
      if (cl && !cl.trim()) return this; // can't trim empty space

      cl = cl.trim().split(' ');

      el.forEach((item) => {

        item.classList.add(...cl);

      });
      return this;
    },





    takeClass(cl) {
      if (cl && !cl.trim()) return this;

      cl = cl.trim().split(' ');

      el.forEach((item) => {

        item.classList.remove(...cl);

      });
      return this;
    },



    togClass(cl) {

      if (cl && !cl.trim()) return this;
      cl = cl.trim().split(' ');


      for (let j = 0; j < el.length; j++) {
        for (let k = 0; k < cl.length; k++) {
          el[j].classList.toggle(cl[k]);
        }

      }

      return this;
    },



    attribute(att, str) {
      if (str) {
        for (let i = 0; i < el.length; i++) {

          el[i].setAttribute(att, str);
        }
        return this;
      }
      return el[0].getAttribute(att);

    },



    //    style(str, val) {
    //
    //      if (val) {
    //
    //        el.forEach(function (item) {
    //          item.style.cssText = item.style.cssText + `${str}:${val}`;
    //
    //        });
    //        return this;
    //      }
    //
    //
    //      // this.str = str;
    //      let compStyles = window.getComputedStyle(el[0]);
    //      let returnStyle = compStyles.getPropertyValue(str);
    //
    //
    //      return returnStyle;
    //
    //    },



    /* //////////////// CSS USEAGE \\\\\\\\\\\\\\\\\\\\\\

     .css({"margin-left":"200px", "font-size":"4em"})

    ///////////////////////////////////////////////////// */
    css(propertyObject) {
      el.forEach(function (item) {

        for (let property in propertyObject) {
          item.style[property] = propertyObject[property];
        }


      });
      return this;
    },





    style(st, va) {

      if (va) {

        el.forEach(function (item) {
          item.style.setProperty(st, va);

        });
        return this;
      }

      return el[0].style.getPropertyValue(st);

    },






    removeAtt(att) {

      for (let i = 0; i < el.length; i++) {

        el[i].removeAttribute(att);

      }
      return this;

    },



    selectedIndex(i) {

      if (i || i === 0) {
        el[0].options.selectedIndex = i;
        return this;
      }

      return el[0].selectedIndex;

    },




    radioVal(name) {


      let val = "no value";
      document.getElementsByName(name).forEach((item, index) => {
        if (item.getAttribute("type") != 'radio') return;

        if (item.checked)
          val = item.value;

      });
      return val;
    },




    getRadioIndex(name) {


      let val = 'no index';
      document.getElementsByName(name).forEach((item, index) => {
        if (item.getAttribute("type") != 'radio') return;

        if (item.checked)
          val = index;

      });
      return val;
    },
    
    
     setRadioIndex(name, n) {

      document.getElementsByName(name).forEach((item, index) => {
        if (item.getAttribute("type") != 'radio') return;

        if (index == n)
          item.checked = true;

      });
      return this;
    },







    placeholder(t) {

      if (t) {
        for (let i = 0; i < el.length; i++) {

          el[i].placeholder = t;
        }
        return this;
      }
      return el[0].placeholder;

    },



    val(v) {

      if (v || v === '') {
        el.forEach(function (item) {
          item.value = v;
        });
        return this;
      }
      return el[0].value;

    },



    focus() {
      el[0].focus();
      return this;
    },

    select() {
      el[0].select();
      return this;
    },


    blur() {

      el.forEach(function (item) {
        item.blur();
      });
      return this;
    },



    reset() {
      if (el[0].nodeName !== "FORM") return;
      el.forEach(function (item) {

        item.reset();
      });
      return this;

    },


    submit() {
      if (el[0].nodeName !== "FORM") return;
      el.forEach(function (item) {

        item.submit();
      });
      return this;

    },


    play() {

      el.forEach(function (item) {
        item.play();
      });
      return this;
    },




    pause() {

      el.forEach(function (item) {
        item.pause();
      });
      return this;
    },

    paused() {
      let paused = '';
      el.forEach(function (item) {
        paused = item.paused;

      });
      return paused;
    },


    readyState() {
      return el[0].readyState;
    },


    duration() {
      return el[0].duration;
    },

    currentTime(n) {
      if (n) {
        el[0].currentTime = n;
      }
      return el[0].currentTime;
    },

    getRect() {
      return el[0].getBoundingClientRect();
    },


    //    each(func) {
    ////
    //      el.forEach(function (item) {
    //        func(item);
    //      });
    //      return this;
    //    },





    scrollToView(bool) {
      el[0].scrollIntoView(bool);
      return this;
    },
    
    
    

    hasClass(cl) {
      return el[0].classList.contains(cl);
    },




    fuckOff() {
      el.forEach(function (item) {
        item.remove();
      });
    },


    isChecked(b) {
      if (b === true || b === false) {

        el.forEach(function (item) {
          item.checked = b;
        });
      } else {
        return el[0].checked;
      }
      return this;
    },





    fade(t = 50, del = true, func = null) {

      el.forEach((item) => {

        let fadeEffect = setInterval(function () {
          if (!item.style.opacity) {
            item.style.opacity = 1;
          }
          if (item.style.opacity > 0) {
            item.style.opacity -= 0.02;
          } else {
            clearInterval(fadeEffect);
            if (del) {
              item.remove();
            }
            if (func) {
              func();
            }

          }
        }, t / 50);

      });
      return this;

    },


    fadeUp(t = 50, func = null) {


      el.forEach((item) => {
        item.style.opacity = 0;
        let i = 0;
        let fadeEffect = setInterval(function () {

          if (item.style.opacity < 1) {
            item.style.opacity = i;
            i += 0.02;

          } else {
            clearInterval(fadeEffect);
            if (func) {
              func();
            }

          }
        }, t / 50);

      });

      return this;

    },


    clic(callback) {

      el.forEach(function (item) {
        item.addEventListener("click", callback, false);


      });

      return this;
    },







    on(event, callback) {

      el.forEach(function (item) {
        item.addEventListener(event, callback, false);


      });

      return this;
    },


    off(event, callback) {

      el.forEach(function (item) {
        item.removeEventListener(event, callback, false);


      });

      return this;
    },

     
    
    
    
    
    
  /*  //////////////// WINDOW USEAGE \\\\\\\\\\\\\\\\\\\\\\

      $().window("click", function(){ 
          console.log('click ' );
       }

    ///////////////////////////////////////////////////////  */
    window(event, callback) {


      window.addEventListener(event, callback, false);


      return this;
    },









    jaxPost(url, data, call) {
      let r = new XMLHttpRequest();

      r.open("POST", url, true);
      r.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      r.onreadystatechange = function () {

        if (r.readyState != 4 || r.status != 200) return;
        if (call)
          call(this);
      };

      r.send(data);

      return this;

    },


    jaxGet(url, call) {
      let r = new XMLHttpRequest();

      r.open("GET", url, true);
      r.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      r.onreadystatechange = function () {

        if (r.readyState != 4 || r.status != 200) return;
        call(this);
      };

      r.send();

      return this;

    },


  };
}
