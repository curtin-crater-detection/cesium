/*global define*/
define([
        '../../Core/Color',
        '../../Core/defaultValue',
        '../../Core/defineProperties',
        '../../Scene/GridImageryProvider',
        '../../ThirdParty/knockout',
        '../createCommand',
        
    ], function(
        Color,
        defaultValue,
        defineProperties,
        GridImageryProvider,
        knockout,
        createCommand) {
    "use strict";

    function addGridLayerOption(that, imageryLayers, name, imageryProvider, alpha, show) {

        that._layer = imageryLayers.addImageryProvider(imageryProvider);
        that._layer.alpha = defaultValue(alpha, 0.5);
        that._layer.show = defaultValue(show, true);
        that._layer.name = name;
        knockout.track(that._layer, ['alpha', 'show', 'name']);
    }

    function addCoordinateLayerOption(that, imageryLayers, name, imageryProvider, alpha, show) {

        that._layerCoord = imageryLayers.addImageryProvider(imageryProvider);
        that._layerCoord.alpha = defaultValue(alpha, 0.5);
        that._layerCoord.show = defaultValue(show, true);
        that._layerCoord.name = name;
        knockout.track(that._layer, ['alpha', 'show', 'name']);
    }

    function  showGridFunction(that) {

        if (that._isShowGridActive) {

            if (!that._layer) {
                var backgroundColor = new Color(0.0, 0.5, 0.0, 0.0);
                var backgroundColorCoordinates =  new Color(0.0, 0.0, 0.0, 1.0);
                that._imageryProvider = new GridImageryProvider({ellipsoid: that._viewer.scene.globe.ellipsoid, backgroundColor: backgroundColor});
                var imageryLayers = that._viewer.imageryLayers;
                addGridLayerOption(that, imageryLayers, that.name, that._imageryProvider, that.alpha, that.show);

            } else if (that._layer) {

                that._layer.show = true;
            }

            try {
                that._viewer.drawLines.viewModel.subMenu.destroyWrapperMenu;
                that._viewer.drawLines.viewModel.subMenu.viewModel.removeAllCommands;
            } catch (e) {
            }

        } else if (!that._isShowGridActive) {

            if (that._layer) {
                that._layer.show = false;
            }

            try {
                that._viewer.drawLines.viewModel.subMenu.destroyWrapperMenu;
                that._viewer.drawLines.viewModel.subMenu.viewModel.removeAllCommands;
            } catch (e) {
            }
        }


    }

    /**
     * The view model for {@link ShowGrid}.
     * @alias ShowGridViewModel
     * @constructor
     */
    var ShowGridViewModel = function (IconsContainer, wrapperPanel, viewer) {

      //  console.log("dans ShowGridViewModel");

        this._IconsContainer = IconsContainer;
        this._wrapperPanel = wrapperPanel;
        this._viewer = viewer;
        this._isShowGridActive = false;
        this.isGridActive = false;

        this.name = 'grid';
        this.nameCoordinates = 'Tiles coordinates';
        this.alpha = 0.8;
        this.show = true;

        var that = this;



        this._showGridCommand = createCommand(function () {
            that._isShowGridActive = !that._isShowGridActive;
            that.isGridActive =  that._isShowGridActive;
            showGridFunction(that);
        });

        knockout.track(this, ['isPanelToolVisibleGrid', 'isShowGridActive', 'isGridActive', 'show', 'alpha']);

    };
    defineProperties(ShowGridViewModel.prototype, {
        /**
         * Gets the Command that is executed when the button is clicked.
         * @memberof ShowGridViewModel.prototype
         *
         * @type {Command}
         */
        showGridCommand: {
            get: function () {
                return this._showGridCommand;
            }
        },
        isPanelToolVisibleGrid: {
            set: function (value) {
                this._isPanelToolVisibleGrid = value;
            }
        },
        subMenu: {
            get: function () {
                return this._subMenu;
            }
        },
        deleteGrid: {
            get: function () {
                var imageryLayers = this._viewer.imageryLayers;
                imageryLayers.remove(this._layer);
                this._layer = null;
                this._isShowGridActive = false;
            }
        }
    });

    return ShowGridViewModel;
});
