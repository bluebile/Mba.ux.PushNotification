/**
 * Classe para criação do componente de Push
 * para verificar qual
 */
Ext.define('Mba.ux.PushNotification', {
    xtype:'mba_push',

    requires: [
        'Mba.ux.PushAeroGear',
        'Mba.ux.PushWoosh'
    ],

    /**
     * Possíveis chaves para API
     * - AreoGear;
     * - Pushwoosh
     */
    apiArray: {
        'aerogear': 'Mba.ux.PushAeroGear',
        'pushwoosh': 'Mba.ux.PushWoosh'
    },

    constructor: function(config) {
        var api = 'pushwoosh';

        //verifica se o tipo foi enviado
        if (config && typeof config.type !== 'undefined') {
            api = config.type;
        }

        //verifica se o tipo enviado está dentro dos parametros aceitáveis
        if (!this.apiArray.hasOwnProperty(api)) {
            throw 'Erro ao carregar api. Os valores possíveis são: possíveis são: ' +
            Object.keys(this.apiArray).join (', ');
            return;
        }

        return Ext.create(this.apiArray[api], config);
    }
});
