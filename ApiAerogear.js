Ext.define('Mba.ux.ApiAerogear', {

    config: {
        urlApi: '',
        urlRegister: '/register',
        urlCategories: '/categories',
        urlMessage: '/message'
    },

    registerApi: function(options) {
        console.log('CLASS ApiAerogear');
        console.log(options);
        console.log(this.config);

    }

});
