steal("can/construct",'funcunit/qunit').then(function(){

module("can/construct",{
	setup : function(){
		var Animal = this.Animal = Can.Construct({
	        count: 0,
	        test: function() {
	            return this.match ? true : false
	        }
	    },
	    {
	        init: function() {
	            this.constructor.count++;
	            this.eyes = false;
	        }
	    });
		
		
		var Dog = this.Dog = this.Animal(
	    {
	        match : /abc/
	    },
	    {
	        init: function() {
	            Animal.prototype.init.apply(this, arguments);
	        },
			talk: function() {
				return "Woof";
			}
	    });
		
		this.Ajax = this.Dog({
	        count : 0
	    },
	    {
	        init: function( hairs ) {
	            Dog.prototype.init.apply(this, arguments);
	            this.hairs = hairs;
	            this.setEyes();
	            
	        },
	        setEyes: function() {
	            this.eyes = true;
	        }
	    });
	}
});

test("Creating", function(){

    new this.Dog();
    new this.Animal();
    new this.Animal();
    var ajax = new this.Ajax(1000);
        
    equals(2, this.Animal.count, "right number of animals");
    equals(1, this.Dog.count, "right number of animals")
    ok(this.Dog.match, "right number of animals")
    ok(!this.Animal.match, "right number of animals")
    ok(this.Dog.test(), "right number of animals")
    ok(!this.Animal.test(), "right number of animals")
    equals(1, this.Ajax.count, "right number of animals")
    equals(2, this.Animal.count, "right number of animals");
    equals(true, ajax.eyes, "right number of animals");
    equals(1000, ajax.hairs, "right number of animals");
})


test("new instance",function(){
    var d = this.Ajax.newInstance(6);
    equals(6, d.hairs);
})


test("namespaces",function(){
	var Todo = Can.Construct("Todo",{},{})
	
	
	
	var fb = Can.Construct.extend("Foo.Bar")
	ok(Foo.Bar === fb, "returns class")
	equals(fb.shortName, "Bar", "short name is right");
	equals(fb.fullName, "Foo.Bar","fullName is right")
	
})



test("setups", function(){
	var order = 0,
		staticSetup,
		staticSetupArgs,
		staticInit,
		staticInitArgs,
		protoSetup,
		protoInitArgs,
		protoInit,
		staticProps = {
			setup: function() {
				staticSetup = ++order;
				staticSetupArgs = arguments;
				return ["something"]
			},
			init: function() {
				staticInit = ++order;
				staticInitArgs = arguments;
			}
		},
		protoProps = {
			setup: function( name ) {
				protoSetup = ++order;
				return ["Ford: "+name];
			},
			init: function() {
				protoInit = ++order;
				protoInitArgs = arguments;
			}
		}
	Can.Construct.extend("Car",staticProps,protoProps);
	
	var geo = new Car("geo");
	equals(staticSetup, 1);
	equals(staticInit, 2);
	equals(protoSetup, 3);
	equals(protoInit, 4);
	
	same($.makeArray(staticInitArgs), ["something"] )
	same($.makeArray(protoInitArgs),["Ford: geo"] )
	
	same($.makeArray(staticSetupArgs),[Can.Construct, "Car",staticProps, protoProps] ,"static construct");
	
	
	//now see if staticSetup gets called again ...
	Car.extend("Truck");
	equals(staticSetup, 5, "Static setup is called if overwriting");
	
});



test("Creating without extend", function(){
	Can.Construct("Bar",{
		ok : function(){
			ok(true, "ok called")
		}
	});
	new Bar().ok();
	
	Bar("Foo",{
		dude : function(){
			ok(true, "dude called")
		}
	});
	new Foo().dude(true);
})




});