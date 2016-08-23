Ext.define('Mba.ux.PushAeroGear', {
    extend: 'Mba.ux.PushApi',
    xtype: 'mba_push',

    requires: [
        'Mba.ux.PushApi'
    ],

    mixins: [
        'Mba.ux.BuilderConfig.mixin.BuilderConfig'
    ],

    /**
     * Recupera o plugin do Cordova
     *
     * @returns {*}
     */
    getPlugin: function() {
        return push;
    },

    /**
     * Realiza o registro no AeroGear
     *
     * @param {Function} success
     * @param {Function} error
     */
    register: function(success, error) {
        if (!this.isAvailablePlugin()) {
            if (Ext.browser.is.Cordova) {
                console.log('Plugin AeroGear not installed!');
            }
            return;
        }

        console.log('@todo implement register;');
    },

    unregister: function(success, error) {
        if (!this.isAvailablePlugin()) {
            if (Ext.browser.is.Cordova) {
                console.log('Plugin AeroGear not installed!');
            }
            return;
        }
        console.log('@todo implement unregister;');
    }

});
