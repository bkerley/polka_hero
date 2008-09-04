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
var PolkaHero = Class.create({
	initialize: function(element) {
		Effect.Queues.get('polka_hero').interval = 100;
		this.animation_options = {duration: .5, queue: {position: 'end', scope: 'polka_hero'}};
		this.element = element;
		this.squeezeboxes = element.select('.squeezebox');
		this.paragraphs = element.select('p');
	},
	first_cycle: function() {
		this.paragraphs.without(this.paragraphs.first()).each(function(p) {
			Effect.BlindUp(p, this.animation_options);
		});
		
	}
})