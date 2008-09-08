Array.prototype.cdr = function() {
	return self.slice(1);
};
Array.prototype.car = function() {
	return this[0];
}
var PolkaHero = Class.create({
	initialize: function(element, options) {
		this.element = element;
		this.squeezeboxes = element.select('.squeezebox');
		this.squeezeboxes.each(function(sb) {
			sb.para = sb.select('div.sbody')[0];
			sb.sel = sb.select('h1')[0];
			sb.img = sb.select('h1 img')[0];
			
			sb.hidden = true;
			sb.ph_hide = function() {
				if (sb.hidden) return;
				Effect.BlindUp(sb.para, options.animation);
				sb.hidden = true;
				sb.img.src = options.hidden_image;
			};
			sb.ph_show = function() {
				if (!sb.hidden) return;
				Effect.BlindDown(sb.para, options.animation);
				sb.hidden = false;
				sb.img.src = options.shown_image;
			};
		})
		
		this.first_cycle();
	},
	first_cycle: function() {
		var sbs = this.squeezeboxes;
		var count = sbs.length;
		var i = 0;
		var myself = this;
		
		sbs.car().ph_show();
		
		new PeriodicalExecuter(function(pe) {
			var hide_me = i;
			var show_me = (i+1) % count;
			if (i == count) {
				pe.stop();
				myself.bind_events();
				return;
			}
			sbs[hide_me].ph_hide();
			sbs[show_me].ph_show();
			i++;
		}, 1);
	},
	bind_events: function() {
		var sbs = this.squeezeboxes;
		
		for(var i = 0; i < sbs.length; i++) {
			var clicking = sbs[i].sel;
			clicking._hides_these = sbs.without(sbs[i]);
			clicking._shows_this = sbs[i];
			
			var like_this = function(event) {
				var e = event.element();
				if (e.tagName == 'IMG') {
					e = e.parentNode;
				}
				e._hides_these.invoke('ph_hide');
				e._shows_this.ph_show();
			}
			
			clicking.observe('click', like_this);
		}
	}
});