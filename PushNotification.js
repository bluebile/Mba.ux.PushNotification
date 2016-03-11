Ext.define('Mba.ux.PushNotification', {
    extend: 'Ext.Evented',
    xtype: 'mba_push',

    mixins: [
        'Mba.ux.BuilderConfig.mixin.BuilderConfig'
    ],

    pushToken: null,

    params: {},

    config: {
        appId: '',
        projectId: ''
    },

    initialize: function() {
        var me = this;
        me.callParent(arguments);

        document.addEventListener('push-notification', function(data) {
            me.fireEvent('notification', me, data);
        });
    },

    getPushToken: function() {
        return this.pushToken;
    },

    isAvailablePlugin: function() {
        if (!window.plugins) {
            return false;
        }

        if (!window.plugins.pushNotification) {
            return false;
        }

        return true;
    },

    updateProjectId: function(projectid) {
        if (!projectid) {
            throw 'Projectid é requerido';
        }

        this.params.projectid = projectid;
    },

    updateAppId: function(appid) {
        this.params.appid = appid;
        this.params.pw_appid = appid;
    },

    getPlugin: function() {
        return window.plugins.pushNotification;
    },

    register: function(success, error) {
        if (!this.isAvailablePlugin()) {
            if (Ext.browser.is.Cordova) {
                console.log('Plugin Pushwoosh not installed!');
            }
            return;
        }

        var successCall = function(params) {
            if (Ext.os.is.iOS) {
                me.pushToken = params['deviceToken'];
            } else {
                me.pushToken = params;
            }

            success(params);
        };

        this.getPlugin().onDeviceReady(this.params);

        this.getPlugin().registerDevice(successCall, error);
    }
});
