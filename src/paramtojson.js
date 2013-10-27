var ParamToJson = {

	setObjValue: function(result, key, value) {
		var levels = this.parseLevels(key);
		var currentKey = levels? levels.first : key;
		var arr = this.parseArray(currentKey);
		// var target = arr? result[arr.key] : result[currentKey]
		var item = value;
		if(levels){
			item = arr
				? this.readArray(result[arr.key], arr.arrStr)
				: result[currentKey];
			item = item || {};
			this.setObjValue(item, levels.rest, value);
		}
		this.setItem(result, currentKey, arr, item);
	},

	setItem: function(result, currentKey, arr, item) {
		var key = arr? arr.key : currentKey;
		result[key]= arr
			? this.makeNestedArrays(this.getIndexes(arr.arrStr), item)
			: item;
	},

	readArray: function(result, arrStr) {
		if(!result) return;
		var indexes = this.getIndexes(arrStr);
		var item = result;
		indexes.forEach(function(i) {
			item = item[i];
		});
		return item;
	},

	getIndexes: function(arrStr) {
		return arrStr.replace(/^\[|\]$/g, '').split(/\]\[/).map(function(i){
			return parseInt(i, 10);
		});
	},

	makeNestedArrays: function(indexes, value){
		var arr = [];
		var first = indexes.pop();
		if(indexes.length){
			arr[first] = this.makeNestedArrays(indexes, value);
		}
		else{
			arr[first] = value;
		}
		return arr;
	},

	parseArray: function(key) {
		var m = key.match(/^([^\[\]]*)(\[.*\])$/);
		if(m){
			return {key: m[1], arrStr: m[2]};
		}
	},

	parseLevels: function(key) {
		var m = key.match(/^([^\.]*)\.(.*)$/);
		if(m){
			return { first: m[1], rest:m[2]	};
		}
	},

	convert: function(param) {

		var result = {};

		for(key in param){
			this.setObjValue(result, key, param[key]);
		}

		return result;
	}

};