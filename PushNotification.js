Ext.define('Mba.ux.PushNotification', {

    constructor: function() {
        var className = 'Mba.ux.PushWoosh';
        if (typeof push === 'undefined') {
            className = 'Mba.ux.PushAeroGear';
        }
        return Ext.create(className);
    }

});
