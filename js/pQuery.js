function $(selector, indx) {

	
	let el;

	if (!selector) {
		el = {};
	}
	
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
			el.forEach((item, index) => {

				for (let j = 0; j < cl.length; j++) {

					item.classList.add(cl[j]);
				}

			});
			return this;
		},




		takeClass(cl) {

			if (cl && !cl.trim()) return this; // can't trim empty space
			cl = cl.trim().split(' ');
			el.forEach(function (item, index) {

				for (let j = 0; j < cl.length; j++) {

					item.classList.remove(cl[j]);
				}

			});
			return this;
		},



		togClass(cl) {

			if (cl && !cl.trim()) return this; // can't trim empty space
			cl = cl.trim().split(' ');
			el.forEach(function (item, index) {

				for (let j = 0; j < cl.length; j++) {
					item.classList.toggle(cl[j]);
				}

			});
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



		val(v) {

			if (v) {
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





		postJax(url, data, call) {
			let r = new XMLHttpRequest();

			r.open("POST", url, true);
			r.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
			r.onreadystatechange = function () {
				if (r.readyState != 4 || r.status != 200) return;
				call(this);
			};

			r.send(data);

			return this;

		},


	};
}
