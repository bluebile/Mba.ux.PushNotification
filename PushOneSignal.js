Ext.define('Mba.ux.PushOneSignal', {
    extend: 'Mba.ux.PushApi',

    requires: [
        'Mba.ux.PushApi'
    ],

    mixins: [
        'Mba.ux.BuilderConfig.mixin.BuilderConfig'
    ],

    initialize: function() {
        var me = this;
        me.callParent(arguments);
    },

    /**
     * Token gerado pelo OneSignal para o device do usuário
     */
    pushToken: null,

    params: {},

    config: {

        /**
         * ID da aplicação gerada pelo OneSignal
         *
         * @var {string}
         */
        appId: '',

        googleProjectId: '',
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
        return window.plugins.pushNotification || window.plugins.OneSignal;
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
                console.log('Plugin OneSignal not installed!');
            }
            return;
        }

        var iosSettings = {}, me = this;
        iosSettings["kOSSettingsKeyAutoPrompt"] = true;
        iosSettings["kOSSettingsKeyInAppLaunchURL"] = false;

        window.plugins.OneSignal
        .startInit(this.getAppId(), this.getGoogleProjectId())
        .iOSSettings(iosSettings)
        .handleNotificationOpened(function(jsonData) {
            me.fireEvent('notification', me, jsonData);
            Ext.event.Dispatcher.getInstance()
                .dispatchEvent('component', 'mba_push' , 'notification', [me, jsonData]);
        })
        .endInit();

        this.getPlugin().registerForPushNotifications();

        window.plugins.OneSignal.getIds(function(ids) {
            if(Ext.isFunction(success)) {
                this.pushToken = ids.pushToken;
                this.userId = ids.userId;
                success(ids);
            }
        });
    },

    getUserId: function() {
        return this.userId;
    }

});
