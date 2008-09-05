Array.prototype.cdr = function() {
	return self.slice(1);
};
Array.prototype.car = function() {
	return this[0];
}
var ph_animation_options = {duration: 0.4};
var shown_image = '/images/colintalk-23x32.png';
var hidden_image= '/images/colin-23x32.png';
var PolkaHero = Class.create({
	initialize: function(element) {
		this.element = element;
		this.squeezeboxes = element.select('.squeezebox');
		this.squeezeboxes.each(function(sb) {
			sb.para = sb.select('div.sbody')[0];
			sb.sel = sb.select('h1')[0];
			sb.img = sb.select('h1 img')[0];
		})
		this.paragraphs.each(function(pp) {
			pp.hidden = true;
			pp.image = pp.select("h1 img")[0];
			pp.ph_hide = function() {
				if (pp.hidden) return;
				Effect.BlindUp(pp, ph_animation_options);
				pp.hidden = true;
				pp.image.src = hidden_image;
			};
			pp.ph_show = function() {
				if (!pp.hidden) return;
				Effect.BlindDown(pp, ph_animation_options);
				pp.hidden = false;
				pp.image.src = shown_image;
			};
			new Effect.Highlight(pp);
		});
		
		this.first_cycle();
		this.bind_events();
	},
	first_cycle: function() {
		var paras = this.paragraphs;
		var count = paras.length;
		var i = 0;
		
		paras.car().ph_show();
		
		new PeriodicalExecuter(function(pe) {
			var hide_me = i;
			var show_me = (i+1) % count;
			paras[hide_me].ph_hide();
			paras[show_me].ph_show();
			i++;
			if (i == count) {
				pe.stop();
			}
		}, 2);
	},
	bind_events: function() {
		var seles = this.selectors;
		var paras = this.paragraphs;
		
		for(var i = 0; i < seles.length; i++) {
			var clicking = seles[i];
			clicking._hides_these = paras.without(paras[i]);
			clicking._shows_this = paras[i];
			clicking._image_on = clicking.select('img')[0];
			clicking._image_off = seles.without(clicking).select
			
			var like_this = function(event) {
				var e = event.element();
				e._hides_these.invoke('ph_hide');
				e._shows_this.ph_show();
			}
			
			clicking.observe('click', like_this);
		}
	}
});