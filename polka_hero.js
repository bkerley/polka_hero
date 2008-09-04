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
var ph_animation_options = {duration: 0.4, queue: {position: 'end', scope: 'polka_hero'}};
var PolkaHero = Class.create({
	initialize: function(element) {
		this.element = element;
		this.squeezeboxes = element.select('.squeezebox');
		this.paragraphs = element.select('p');
	},
	first_cycle: function() {
		this.paragraphs.cdr().each(function(p) {
			p.hide();
		});
		
		var delta = 1; //time between shifts
		var paras = this.paragraphs;
		var count = paras.length;
		var i = 0;
		new PeriodicalExecuter(function(pe) {
			var hide_me = i;
			var show_me = (i+1) % count;
			Effect.BlindDown(paras[hide_me], {duration: 0.4});
			Effect.BlindUp(paras[show_me], {duration: 0.4});
			i++;
			if (i == count) {
				pe.stop();
			}
		}, 2);
	}
});