function RenderEngine() {
	var thisObjR = this;
	this.requestAnimationID = 0;
	this.registered = [];

	this.register = function( params ) {
		console.log('[ RENDER ] REGISTER');
		var newParams = params;
			newParams.active = true;
			newParams.id = ( params.id === undefined ) ? (99999999 * Math.random()) : params.id;

		this.registered.push( newParams );

		if ( this.registered.length === 1 )
			this.update();

		return new RenderObj( params );
	}.bind(this);
	this.kill = function( id ) {
		console.log('[ RENDER ] KILL');
		for ( var a = 0; a < this.registered.length; a++ ) {
			if ( this.registered[a].id === id )
				this.registered.splice(a,1);
		}

		if ( this.registered.length === 0 )
			cancelAnimationFrame( this.requestAnimationID );
	}.bind(this);
	this.update = function() {
		console.log('[ RENDER ] UPDATING');
		if ( thisObjR.registered.length === 0 ) return;

		var a = 0,
			infoObj;

		for ( ; a < thisObjR.registered.length; a++ ) {
			infoObj = thisObjR.registered[a];
			if ( infoObj.active )
				infoObj.update();
		}

		thisObjR.requestAnimationID = requestAnimationFrame( thisObjR.update );
	};
	this.getObjByID = function( id ) {
		if (id!==undefined) {
			for ( var a = 0; a < this.registered.length; a++ ) {
				if ( this.registered[a].id === id )
					return this.registered[a];
			}
		}
		return false;
	};

	//CLASS OBJETCT RESPONSE
	function RenderObj( params ) {
		return function( params ) {
			this.kill = function() {
				console.log("[ RENDER - " + this.id + " ] KILL");
				thisObjR.kill( this.id );
			}.bind(this);
			this.suspend = function() {
				console.log("[ RENDER - " + this.id + " ] SUSPEND");
				this.active = false;
			}.bind(this);
			this.resume = function(newUpdateFunction) {
				console.log("[ RENDER - " + this.id + " ] RESUME");
				if ( newUpdateFunction !== undefined )
					this.update = newUpdateFunction;
				this.active = true;
			}.bind(this);

			return this;
		}.call( params );
	}
}