Array.prototype.cdr = function() {
	var cdr_out = new Array();
	if (this.length < 2) {
		return null;
	}
  for (var i = 1, length = this.length; i < length; i++)
    cdr_out[i-1] = this[i];
	
	return cdr_out;
};
Array.prototype.car = function() {
	if (this.length < 1) {
		return null;
	}
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
		var paras
		for(var i = 0; i < seles.length; i++) {
			var hide_these = paras.without(paras[i]);
			var show_this = seles[i];
		}
	}
});