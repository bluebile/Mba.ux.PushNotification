Ext.define('Mba.ux.PushApi', {
    extend: 'Ext.Evented',

    /**
     * Verifica se o plugin do cordova foi instalado
     *
     * @returns {boolean}
     */
    isAvailablePlugin: function() {
        return (window.plugins && window.plugins.pushNotification) || (typeof push !== 'undefined');
    },

    onNotification: function(data) {
        this.fireEvent('notification', this, data);
    }

});
