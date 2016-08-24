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

    onNotification: function() {
        var me = this;
        return function(data) {
            me.fireEvent('notification', me, data);
            Ext.event.Dispatcher.getInstance()
                .dispatchEvent('component', 'mba_push' , 'notification', [me, data]);
        }
    },

    /**
     * Realiza o registro do device na API
     */
    register: Ext.emptyFn,

    /**
     * Exclui o registro do device na API
     */
    unregister: Ext.emptyFn

});
