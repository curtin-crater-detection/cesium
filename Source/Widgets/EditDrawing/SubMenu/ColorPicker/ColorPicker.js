/*global define*/
define([
    '../../../../Core/defineProperties',
    '../../../../Core/destroyObject',
    '../../../../Core/DeveloperError',
    '../../../../ThirdParty/knockout',
    '../../../getElement',
    './ColorPickerViewModel'
], function (
        defineProperties,
        destroyObject,
        DeveloperError,
        knockout,
        getElement,
        ColorPickerViewModel
        ) {
    "use strict";

    /**
     * A widget to show the colorPicker widget.
     *
     * @alias colorPicker
     * @constructor
     *
     * @param {Element|String} container The DOM element contain the widget.
     * @param {Object} Viewer.
     */
    var ColorPicker = function (viewerContainer, viewer) {

        var ColorPickerContainer = document.createElement('DIV');
        ColorPickerContainer.className = 'cesium-ColorPickerContainer';
        ColorPickerContainer.setAttribute('data-bind', ' event : {mousedown : moveContainerCommand}');
        viewerContainer.appendChild(ColorPickerContainer);

        for (var i = 0; i < 120; i++) {

            var color;

            if (i < 10) { // red

                var R = parseInt((255 / 10) * (i + 1));
                color = "rgba(" + R + ", 0, 0, 1)";

            } else if (i < 20) { // green

                var G = parseInt((255 / 10) * (i + 1 - 10));
                color = "rgba(0, " + G + ", 0, 1)";

            } else if (i < 30) { // blue

                var B = parseInt((255 / 10) * (i + 1 - 20));
                color = "rgba(0, 0, " + B + ", 1)";

            } else if (i < 40) { // white

                var R = parseInt((255 / 10) * (i + 1 - 30));
                var G = parseInt((255 / 10) * (i + 1 - 30));
                var B = parseInt((255 / 10) * (i + 1 - 30));
                color = "rgba(" + R + ", " + G + ", " + B + ", 1)";

            } else if (i < 50) { // pink

                var B = parseInt((255 / 10) * (i + 1 - 40));
                color = "rgba(" + B + ", 0, " + B + ", 1)";

            } else if (i < 60) { // Yellow 

                var Y = parseInt((255 / 10) * (i + 1 - 50));
                color = "rgba(" + Y + ", " + Y + ", 0, 1)";

            } else if (i < 70) { // purple

                var B = parseInt((255 / 10) * (i + 1 - 60));
                color = "rgba(0, " + B + ", " + B + ", 1)";

            } else if (i < 80) { // purple

                var B = parseInt((255 / 10) * (i + 1 - 70));
                color = "rgba(150, " + B + ", " + B + ", 1)";

            } else if (i < 90) { // purple

                var B = parseInt((255 / 10) * (i + 1 - 80));
                color = "rgba(" + B + ",100 ," + B + ", 1)";

            } else if (i < 100) { // purple

                var B = parseInt((255 / 10) * (i + 1 - 90));
                var C = parseInt((100 / 10) * (i + 1 - 90));
                color = "rgba(" + B + ", " + B + "," + C + ", 1)";

            } else if (i < 110) { // purple

                var B = parseInt((255 / 10) * (i + 1 - 100));
                color = "rgba(170, " + B + ", " + B + ", 1)";

            } else if (i < 120) { // purple

                var B = parseInt((255 / 10) * (i + 1 - 110));
                color = "rgba(255," + B + ",0, 1)";

            }

            var colorButton = document.createElement('div');
            colorButton.className = 'cesium-buttonColor';
            colorButton.style.background = color;
            colorButton.setAttribute('data-bind', 'attr  : { title: "Pick this color" }, event : {click : selectColorCommand.bind($data,"' + color + '")}');
            ColorPickerContainer.appendChild(colorButton);
        }

        var selectedColorContainer = document.createElement('div');
        selectedColorContainer.className = 'cesium-buttonColor-selected';
        ColorPickerContainer.appendChild(selectedColorContainer);

        var selectedColorTextContainer = document.createElement('input');
        selectedColorTextContainer.type = 'text';
        selectedColorTextContainer.className = 'cesium-buttonColor-selected-text';
        ColorPickerContainer.appendChild(selectedColorTextContainer);


        /* =====================================================================
         ===================== ASSIGN PROPERTY CONTAINER =======================
         ======================================================================= */

        var assignPropertyToColorContainer = document.createElement('div');
        assignPropertyToColorContainer.className = 'cesium-Color-assignProperty';
        viewerContainer.appendChild(assignPropertyToColorContainer);

        var assignPropertyToColorContainerLeft = document.createElement('div');
        assignPropertyToColorContainerLeft.className = 'cesium-Color-assignProperty-left';
        assignPropertyToColorContainer.appendChild(assignPropertyToColorContainerLeft);

        var assignPropertyToColorContainerRight = document.createElement('div');
        assignPropertyToColorContainerRight.className = 'cesium-Color-assignProperty-right';
        assignPropertyToColorContainer.appendChild(assignPropertyToColorContainerRight);

        var propertyNameTitleContainer = document.createElement('div');
        propertyNameTitleContainer.innerHTML = 'Property name : ';
        propertyNameTitleContainer.className = 'cesium-Color-propertyNameTitle-input';
        assignPropertyToColorContainerRight.appendChild(propertyNameTitleContainer);

        var propertyNameContainer = document.createElement('input');
        propertyNameContainer.type = 'text';
        propertyNameContainer.className = 'cesium-Color-propertyName-input';
        assignPropertyToColorContainerRight.appendChild(propertyNameContainer);


        var propertyValueTitleContainer = document.createElement('div');
        propertyValueTitleContainer.innerHTML = 'Property value : ';
        propertyValueTitleContainer.className = 'cesium-Color-propertyValueTitle-input';
        assignPropertyToColorContainerRight.appendChild(propertyValueTitleContainer);


        var propertyValueContainer = document.createElement('input');
        propertyValueContainer.type = 'text';
        propertyValueContainer.className = 'cesium-Color-propertyValue-input';
        assignPropertyToColorContainerRight.appendChild(propertyValueContainer);

        var propertyAssignButton = document.createElement('BUTTON');
        propertyAssignButton.innerHTML = 'Assign';
        propertyAssignButton.className = 'cesium-Color-propertyAssign-button';
        propertyAssignButton.setAttribute('data-bind', 'attr  : { title: "Pick this color" }, event : {click : colorAssignationCommand}');
        assignPropertyToColorContainerRight.appendChild(propertyAssignButton);


// attr : {title: "Assign this property to the selected color"}, 

        var viewModel = new ColorPickerViewModel(viewerContainer, ColorPickerContainer, selectedColorContainer, selectedColorTextContainer, assignPropertyToColorContainer, propertyNameContainer, propertyValueContainer, viewer);
        this._viewerContainer = viewerContainer;
        this._ColorPickerContainer = ColorPickerContainer;
        this._viewModel = viewModel;
        knockout.applyBindings(viewModel, ColorPickerContainer);
        knockout.applyBindings(viewModel, assignPropertyToColorContainer);
    };
    defineProperties(ColorPicker.prototype, {
        /**
         * Gets the parent container.
         * @memberof Tools.prototype
         *
         * @type {Element}
         */
        container: {
            get: function () {
                return this._container;
            }
        },
        /**
         * Gets the view model.
         * @memberof SubMenu.prototype
         *
         * @type {SubMenuViewModel}
         */
        viewModel: {
            get: function () {
                return this._viewModel;
            }
        },
        destroyColorPickerContainer: {
            get: function () {
                try {
                    this._viewerContainer.removeChild(this._ColorPickerContainer);
                } catch (e) {
                }
            }
        },
    });
    return ColorPicker;
});