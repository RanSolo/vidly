//const winston = require('winston');
const mongoose = require( 'mongoose' );
const config = require( 'config' );

module.exports = function () {
	const db = config.get( 'db' );
	mongoose
		.connect( db, { useUnifiedTopology: true, useNewUrlParser: true } )
		.then( ( s ) => console.log( `Connected to ${db}...` ) )
		.catch( ( e ) => console.error( 'could not connect', e ) );
};
