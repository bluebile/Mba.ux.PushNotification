Ext.define('Mba.ux.PushNotification', {
    xtype:'mba_push',

    requires: [
        'Mba.ux.PushAeroGear',
        'Mba.ux.PushWoosh'
    ],

    constructor: function(config) {
        var className = 'Mba.ux.PushWoosh';
        if (typeof push !== 'undefined') {
            className = 'Mba.ux.PushAeroGear';
        }

        className = 'Mba.ux.PushAeroGear';
        return Ext.create(className, config);
    }

});
