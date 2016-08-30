Ext.define('Mba.ux.PushAeroGear', {
    extend: 'Mba.ux.PushApi',

    requires: [
        'Mba.ux.PushApi',
        //'Mba.ux.ApiAerogear'
    ],

    mixins: [
        'Mba.ux.BuilderConfig.mixin.BuilderConfig'
    ],

    config: {
        /**
         * Configuração do Aerogear
         *
         * Exemplo:
         *      "pushAerogearApi" : "http://0.0.0.0:8889/",
         *      "pushServerURL": "http://dsv-notificacoes.mec.gov.br/ag-push/",
         *      "android": {
         *          "senderID": "123123123123",
         *          "variantID": "5b75a474-1234-1234-a48d-9d96dc33e68b",
         *          "variantSecret": "3db050bd-1234-1234-1234-acc0b00c2edb"
         *      },
         *       "ios": {
         *          "variantID": "55679632-1234-1234-1234-6fa018e81a40",
         *          "variantSecret": "54224abe-1234-1234-1234-149823f520a8"
         *      },
         *      "windows": {
         *          "variantID": "64f4b8ac-1234-1234-1234-bb6974039555",
         *          "variantSecret": "d934cb45-1234-1234-a86d-865f8be20215"
         *      }
         */
        configOptions: ''
    },

    /**
     * Recupera o plugin do Cordova para o Aerogear
     *
     */
    getPlugin: function() {
        return push;
    },

    /**
     * Realiza o registro no AeroGear
     *
     * @param {Array} options
     */
    register: function(options) {
        var aerogearApi = this.getAerogearApi();


        if (!this.isAvailablePlugin()) {
            if (Ext.browser.is.Cordova) {
                console.log('Plugin AeroGear not installed!');
            }
            return;
        }

        //Chama o Register do plugin
        this.getPlugin().register(
            this.onNotification.apply(this),
            this.callbackSuccess(options),
            this.callbackError,
            Ext.mergeIf(this.getConfigOptions(), options)
        );
    },

    /**
     * Exclui o cadastro do device da API Aerogear
     *
     * @param {Function} success
     * @param {Function} error
     */
    unregister: function(success, error) {
        if (!this.isAvailablePlugin()) {
            if (Ext.browser.is.Cordova) {
                console.log('Plugin AeroGear not installed!');
            }
            return;
        }
        this.getPlugin().unregister(success, error);
    },

    /**
     * Após o sucesso do register, deve chamar a API para realizar a padronização do registro
     */
    callbackSuccess: function(alias) {
        console.log('AEROGEAR - SUCCESS REGISTER');
        console.log('FAZER AJAX');

    },

    callbackError: function(error) {
        console.log('AEROGEAR - ERROR REGISTER');
        console.log(error);
    },

    getAerogearApi: function() {
        var configs = this.getConfigOptions();

        console.log(configs);

        if( Ext.isEmpty(configs.pushAerogearApi) ) {
            throw 'A URL da API do Aerogear não foi definida no arquivo de configuração.';
            return false;
        }

        var aerogearApi = Ext.create('Mba.ux.ApiAerogear', {urlApi: this.config.configOptions.pushAerogearApi});
        return aerogearApi;
    }

});
