Ext.define('Mba.ux.PushNotification', {

    requires: [
        'Mba.ux.PushAeroGear',
        'Mba.ux.PushWoosh'
    ],

    constructor: function() {
        var className = 'Mba.ux.PushWoosh';
        if (typeof push === 'undefined') {
            className = 'Mba.ux.PushAeroGear';
        }
        return Ext.create(className);
    }

});
