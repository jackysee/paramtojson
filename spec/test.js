/*global describe, it */
'use strict';

(function () {

	describe("paramToJson", function() {

		it("should be defined", function() {
			expect(ParamToJson).toBeDefined();
		});

		function expectParam(param){
			return expect(ParamToJson.convert(param));
		}

		it("can handle {a:1}", function() {
			expectParam({a:1, b:2}).toEqual({a:1, b:2});
		});

		it("can handle 'a.b.c'", function() {
			expectParam({'a.b.c':1}).toEqual({a:{b:{c:1}}});
		});

		it("can handle a[2]:3", function() {
			expectParam({'a[2]':3}).toEqual({a:[undefined, undefined, 3]});
		});

		it("can handle a[2].b:1", function() {
			expectParam({'a[2].b':1}).toEqual({a:[undefined, undefined, {b:1}]});
		});

		it("can handle a[2][2]:1", function() {
			expectParam({'a[2][2]':1}).toEqual({
				a: [undefined, undefined, [undefined, undefined, 1]]
			})
		});

		it("can handle a.b[1].c[2]:4", function() {
		  	expectParam({'a.b[1].c[2]':4}).toEqual({
				a: {b: [undefined, {
					c:[undefined, undefined, 4 ]
				}]}
			})
		});

		it("can handle a.b:1, a.c:2", function() {
			expectParam({'a.b':1, 'a.c':2}).toEqual({a: {b:1, c:2}});
		});

		it("can handle a[1].b:1, a[1].c:2", function() {
			expectParam({'a[1].b':1, 'a[1].c':2}).toEqual({
				a: [ undefined, {b:1, c:2} ]
			});
		  
		});

	});



})();
