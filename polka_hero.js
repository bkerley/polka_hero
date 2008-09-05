Array.prototype.cdr = function() {
	return self.slice(1);
};
Array.prototype.car = function() {
	return this[0];
}
var ph_animation_options = {duration: 0.4};
var PolkaHero = Class.create({
	initialize: function(element) {
		this.element = element;
		this.squeezeboxes = element.select('.squeezebox');
		this.paragraphs = element.select('div.sbody');
		this.selectors = element.select('h1');
		
		this.first_cycle();
		this.bind_events();
	},
	first_cycle: function() {
		Effect.BlindDown(this.paragraphs.car(), ph_animation_options);
		
		var paras = this.paragraphs;
		var count = paras.length;
		var i = 0;
		new PeriodicalExecuter(function(pe) {
			var hide_me = i;
			var show_me = (i+1) % count;
			Effect.BlindUp(paras[hide_me], ph_animation_options);
			Effect.BlindDown(paras[show_me], ph_animation_options);
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
			
			var like_this = function(event) {
				var e = event.element();
				e._hides_these.invoke('hide');
				e._shows_this.show();
			}
			
			clicking.observe('click', like_this);
		}
	}
});