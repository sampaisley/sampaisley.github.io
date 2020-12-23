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

      if (newText) {
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
        el[j].classList.toggle(cl[j]);
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

    checked() {


      return el[0].checked;

    },





    removeAtt(att) {

      for (let i = 0; i < el.length; i++) {

        el[i].removeAttribute(att);

      }
      return this;

    },



    selectedIndex(i) {

      if (i) {
        el[0].options.selectedIndex = i;
        return this;
      }

      return el[0].selectedIndex;

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



    on(event, callback) {
      el.forEach(function (item) {
        item.addEventListener(event, callback, false);
      });
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
