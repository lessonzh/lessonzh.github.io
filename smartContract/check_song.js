"use strict";

var SongItem = function(text) {
	if (text) {
		var obj = JSON.parse(text);
		this.melody = obj.melody;
		this.singer = obj.singer;
		this.author = obj.author;
	}
};

SongItem.prototype = {
	toString: function () {
		return JSON.stringify(this);
	}
};

var MelodyMap = function () {
	LocalContractStorage.defineMapProperty(this, "melodyMap", {
		parse: function(text) {
			return new SongItem(text);
		},
		stringify: function(obj) {
			return obj.toString();
		}
	})
};

MelodyMap.prototype = {
	init: function() {},
	save: function(melody, singer) {
		melody = melody.trim();
		singer = singer.trim();
		// motto = motto.trim();
		if (melody === "" || singer === ""){
        throw new Error("empty melody / singer!");
    }
    if (melody.length > 64 || singer.length > 64){
        throw new Error("melody / singer  exceed limit length!");
    }
    var author = Blockchain.transaction.from;
    var songItem = this.melodyMap.get(melody);
    if (songItem) {
    	throw new Error("melody has been occupied!");
    }
    songItem = new SongItem();
    songItem.melody = melody;
    songItem.singer = singer;
    songItem.author = author;

    this.melodyMap.put(melody, songItem);
	},
	get: function(mapName, value) {
		mapName = mapName.trim();
		value = value.trim();
		if (mapName === "" || value === "") {
			throw new Error("empty mapName / value!");
		}
		return this[mapName].get(value);
	}
};
module.exports = MelodyMap;
