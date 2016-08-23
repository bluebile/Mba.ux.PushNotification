Ext.define('Mba.ux.PushAeroGear', {
    extend: 'Mba.ux.PushApi',
    xtype: 'mba_push',

    requires: [
        'Mba.ux.PushApi'
    ],

    mixins: [
        'Mba.ux.BuilderConfig.mixin.BuilderConfig'
    ],

    config: {
        configOptions: ''
    },

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
     * @param {Array} options
     */
    register: function(success, error, options) {

        if (!this.isAvailablePlugin()) {
            if (Ext.browser.is.Cordova) {
                console.log('Plugin AeroGear not installed!');
            }
            return;
        }

        this.getPlugin().register(this.onNotification.apply(this), success, error, Ext.mergeIf(this.getConfigOptions(), options));
    },

    unregister: function(success, error) {
        if (!this.isAvailablePlugin()) {
            if (Ext.browser.is.Cordova) {
                console.log('Plugin AeroGear not installed!');
            }
            return;
        }
        this.getPlugin().unregister(success, error);
    }

});
