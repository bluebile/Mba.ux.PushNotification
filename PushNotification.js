Ext.define('Mba.ux.PushNotification', {
    extend: 'Ext.Evented',
    xtype: 'mba_push',

    mixins: [
        'Mba.ux.BuilderConfig.mixin.BuilderConfig'
    ],

    /**
     * Token gerado pelo PushWoosh para o device do usuário
     */
    pushToken: null,

    params: {},

    config: {

        /**
         * ID da aplicação gerada pelo Pushwoosh
         *
         * @var {string}
         */
        appId: '',

        /**
         * Id do Projeto gerado pela API do Google
         *
         * @var {string}
         */
        projectId: ''
    },

    initialize: function() {
        var me = this;
        me.callParent(arguments);

        document.addEventListener('push-notification', function(data) {
            me.fireEvent('notification', me, data);
        });
    },

    /**
     * Recupera o Push Token que foi gerado no objeto atual
     *
     * @returns {string}
     */
    getPushToken: function() {
        return this.pushToken;
    },

    /**
     * Verifica se o plugin do cordova foi instalado
     *
     * @returns {boolean}
     */
    isAvailablePlugin: function() {
        var isCordovaPluginInstaled = true;
        if (!window.plugins) {
            isCordovaPluginInstaled = false;
        }

        if (!window.plugins.pushNotification) {
            isCordovaPluginInstaled = false;
        }

        return isCordovaPluginInstaled;
    },

    /**
     * Atualiza o ProjectID
     *
     * @param projectid
     */
    updateProjectId: function(projectid) {
        if (!projectid) {
            throw 'Projectid é requerido';
        }

        this.params.projectid = projectid;
    },

    /**
     * Atualiza o AppID
     *
     * @param appid
     */
    updateAppId: function(appid) {
        this.params.appid = appid;
        this.params.pw_appid = appid;
    },

    /**
     * Recupera o plugin do Cordova
     *
     * @returns {*}
     */
    getPlugin: function() {
        return window.plugins.pushNotification;
    },

    /**
     * Realiza o registro no PushWoosh
     *
     * @param {Function} success
     * @param {Function} error
     */
    register: function(success, error) {
        if (!this.isAvailablePlugin()) {
            if (Ext.browser.is.Cordova) {
                console.log('Plugin Pushwoosh not installed!');
            }
            return;
        }

        var successCall = (function(params) {
            if (Ext.os.is.iOS) {
                this.pushToken = params['deviceToken'];
            } else {
                this.pushToken = params;
            }

            if(Ext.isFunction(success)) {
                success(params);
            }
        }).bind(this);

        this.getPlugin().onDeviceReady(this.params);

        this.getPlugin().registerDevice(successCall, error);
    },

    /**
     * Recupera o token que foi gerado na API do Pushwoosh
     *
     * @param {Function} success
     * @param {Function} error
     */
    getTokenPushwoosh: function(success, error) {
        if (this.isAvailablePlugin()) {
            try {
                this.getPlugin().getPushToken(success);
            }
            catch(err) {
                error(err.message);
            }
        }
    },

    /**
     * Recupera o HWID do device no PushWoosh
     *
     * @param {Function} success
     * @param {Function} error
     */
    getPushwooshHWID: function(success, error) {
        if (this.isAvailablePlugin()) {
            try {
                this.getPlugin().getPushwooshHWID(success);
            }
            catch(err) {
                error(err.message);
            }
        }
    },

    /**
     * Altera o tipo de som para a notificação
     * Type (0 - padrão, 1 - Sem som, 2 - todos)

     * @param {number} type
     * @param {Function} success
     * @param {Function} error
     */
    setSoundType: function(type, success, error) {
        if (this.isAvailablePlugin()) {
            try {
                this.getPlugin().setSoundType(type);
                success();
            }
            catch(err) {
                error(err.message);
            }
        }
    },

    /**
     * Altera o tipo de vibração para a notificação
     * Type (0 - padrão, 1 - Sem som, 2 - todos)

     * @param {number} type
     * @param {Function} success
     * @param {Function} error
     */
    setVibrateType: function(type, success, error) {
        if (this.isAvailablePlugin()) {
            try {
                this.getPlugin().setVibrateType(type);
                success();
            }
            catch(err) {
                error(err.message);
            }
        }
    }

});
