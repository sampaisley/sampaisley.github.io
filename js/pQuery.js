function $(selector, n) {
	const el = document.querySelectorAll(selector);
	
	if (!el) return;

	if (n >= 0) {
		n = n;
	} else {
		n = null;
	}
	


	return {
		el,
		n,


		eq(eq) {
			n = eq;
			return this;
		},



		text(newText) {

			if (newText) {
				for (let i = 0; i < el.length; i++) {

					if ((n || n === 0) && n !== i) continue;
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
					if ((n || n === 0) && n !== index) continue;
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
					if ((n || n === 0) && n !== index) continue;

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
					if ((n || n === 0) && n !== index) continue;
					item.classList.toggle(cl[j]);
				}
			});
			return this;
		},



		attribute(att, str) {
			if (str) {
				for (let i = 0; i < el.length; i++) {
					if ((n || n === 0) && n !== i) continue;
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


	};
}
