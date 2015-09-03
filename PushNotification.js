Ext.define('Mba.ux.PushNotification', {
    extend: 'Ext.Evented',
    xtype: 'mba_push',

    mixins: [
        'Mba.ux.BuilderConfig.mixin.BuilderConfig'
    ],

    config: {
        params: {
            appid: '',
            projectid: ''
        }
    },

    initialize: function()
    {
        var me = this;
        me.callParent(arguments);

        document.addEventListener('push-notification', function(event) {
            me.fireEvent('notification', me);
        });
    },

    isAvailablePlugin: function()
    {
        if (!windows.plugins) {
            return false;
        }

        if (!window.plugins.pushNotification) {
            return false;
        }

        return true;
    },

    getPlugin: function()
    {
        return window.plugins.pushNotification;
    },

    updateParams: function(params)
    {
        if (!params.pw_appid) {
            params.pw_appid = params.appid;
        }

        if (!params.projectid) {
            throw 'Projectid é requerido';
        }

        if (!this.isAvailablePlugin()) {
            return;
        }

        return this.getPlugin().onDeviceReady(parmas);
    },

    register: function(success, error)
    {
        if (!this.isAvailablePlugin()) {
            return;
        }
        this.getPlugin().registerDevice(success, error);
    }
});
