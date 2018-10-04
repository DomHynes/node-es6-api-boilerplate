
exports.up = function( knex ) {
    return knex.schema.createTable( 'users', function( t ) {
        t.string( 'id' ).notNull();
        t.string( 'email' ).notNull();
        t.string( 'type' ).notNull();
        t.string( 'firstName' ).notNull();
        t.string( 'lastName' ).notNull();
        t.string( 'password' ).notNull();
        t.dateTime( 'created_at' ).notNull();
        t.dateTime( 'updated_at' ).nullable();
    });
};

exports.down = function( knex ) {
    return knex.schema.dropTable( 'users' );
};
