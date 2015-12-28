Ext.define('Mba.ux.PushNotification', {
    extend: 'Ext.Evented',
    xtype: 'mba_push',

    mixins: [
        'Mba.ux.BuilderConfig.mixin.BuilderConfig'
    ],

    params: {},

    config: {
        appId: '',
        projectId: ''
    },

    initialize: function()
    {
        var me = this;
        me.callParent(arguments);

        document.addEventListener('push-notification', function(data) {
            me.fireEvent('notification', me, data);
        });
    },

    isAvailablePlugin: function()
    {
        if (!window.plugins) {
            return false;
        }

        if (!window.plugins.pushNotification) {
            return false;
        }

        return true;
    },

    updateProjectId: function(projectid)
    {
        if (!projectid) {
            throw 'Projectid é requerido';
        }

        this.params.projectid = projectid;
    },

    updateAppId: function(appid)
    {
        this.params.appid = appid;
        this.params.pw_appid = appid;
    },

    getPlugin: function()
    {
        return window.plugins.pushNotification;
    },

    register: function(success, error)
    {
        if (!this.isAvailablePlugin()) {
            return;
        }

        this.getPlugin().onDeviceReady(this.params);

        this.getPlugin().registerDevice(success, error);
    }
});
