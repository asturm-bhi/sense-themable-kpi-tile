requirejs.config({
    config: {
        text: {
            useXhr: function (url, protocol, hostname, port) {
                // allow cross-domain requests
                // remote server allows CORS
                return true;
            }
        }
    }
});

define(["jquery", "underscore", "./properties", "./lib/js/extensionUtils", "css!./lib/css/main.css"], function ($, _, props, extensionUtils, cssContent) {
    "use strict";

    var ngTemplate = '<div qv-extension \
     class="qv-object-swr-themablekpitile" \
     ng-style="tileStyle"> \
\
    <div class="kpicontainer"> \
        <div class="colored-kpi-title" \
             ng-title="layout.props.kpiTitle" \
             ng-bind="layout.props.kpiTitle" \
             ng-style="titleStyle"></div> \
\
        <div class="colored-kpi" \
             ng-bind="layout.props.kpi" \
             ng-title="layout.props.kpi" \
             ng-style="kpiStyle"></div> \
\
        <div class="colored-kpi-comparison" \
             ng-style="kpiComparisonStyle"> \
            <span class="icon" ng-bind-html="kpiIcon"></span> \
\
			 <span class="text" \
                  ng-bind="layout.props.kpiComparison" \
             </span> \
        </div> \
    </div> \
\
</div>';

    var layouts = {
        "default": {
            "name": "Default",
            "tileBackgroundColor": "#FFFFFF",
            "titleColor": "#000000",
            "comparisonPositiveColor": "#46c646",
            "comparisonNegativeColor": "#f93f17",
            "comparisonNeutralColor": "#000000",
            "comparisonPositiveIcon": "&#9650;",
            "comparisonNegativeIcon": "&#9660;",
            "comparisonNeutralIcon": "&#9644;"
        },
        "green": {
            "name": "Green",
            "tileBackgroundColor": "#91C526",
            "titleColor": "#fff",
            "comparisonPositiveColor": "#006600",
            "comparisonNegativeColor": "#CC0000",
            "comparisonNeutralColor": "#333",
            "comparisonPositiveIcon": "&#9650;",
            "comparisonNegativeIcon": "&#9660;",
            "comparisonNeutralIcon": "&#9644;"
        },
        "orange": {
            "name": "Orange",
            "tileBackgroundColor": "#FFB304",
            "titleColor": "#fff",
            "comparisonPositiveColor": "#006600",
            "comparisonNegativeColor": "#CC0000",
            "comparisonNeutralColor": "#333",
            "comparisonPositiveIcon": "&#9650;",
            "comparisonNegativeIcon": "&#9660;",
            "comparisonNeutralIcon": "&#9644;"
        }
    };
    return {
        initialProperties: {
            showTitles: !1
        },
        definition: props,
        snapshot: {
            canTakeSnapshot: !0
        },
        template: ngTemplate,
        controller: ["$scope", "$element", "$sce", function ($scope, $element, $sce) {
            function getKpiComparisonColor() {
                return $scope.layout.props && $scope.layout.props.layoutMode ? $scope.get($scope.layout.props.kpiComparison > 0 ? "comparisonPositiveColor" : $scope.layout.props.kpiComparison < 0 ? "comparisonNegativeColor" : "comparisonNeutralColor") : ""
            }

            function setKpiIcon() {
				if(isNaN($scope.layout.props.kpiComparison)){
					$scope.layout.props.kpiComparison = "N/A";
				}else{
					var num = parseFloat($scope.layout.props.kpiComparison);
					$scope.layout.props.kpiComparison = num.toFixed(2);
				}
                return $scope.layout.props && $scope.layout.props.layoutMode ? void($scope.kpiIcon = $sce.trustAsHtml($scope.layout.props.kpiComparison > 0 ? $scope.get("comparisonPositiveIcon") : $scope.layout.props.kpiComparison < 0 ? $scope.get("comparisonNegativeIcon") : $scope.get("comparisonNeutralIcon"))) : ""
            }
            $scope.get = function (key) {
                if (!$scope.layout.props || !$scope.layout.props.layoutMode) return "";
                var defaults = {
                    tileBackgroundColor: "#FFFFFF",
                    titleColor: "#000000",
                    comparisonPositiveColor: "#46c646",
                    comparisonNegativeColor: "#f93f17",
                    comparisonNeutralColor: "#000000",
                    comparisonPositiveIcon: "&#9650;",
                    comparisonNegativeIcon: "&#9660;",
                    comparisonNeutralIcon: "&#9644;"
                };
                switch ($scope.layout.props.layoutMode) {
                case "default":
                    return defaults[key];
                case "custom":
                    return $scope.layout.props[key];
                case "template":
                    var selectedTemplate = $scope.layout.props.layoutTemplate;
                    return layouts[selectedTemplate] ? layouts[selectedTemplate][key] : ""
                }
            }, $scope.setStyles = function () {
                var padding = 14,
                    elemHeight = $element.height() - padding;
                $scope.tileStyle = {
                    backgroundColor: $scope.get("tileBackgroundColor")
                }, $scope.titleStyle = {
                    color: $scope.get("titleColor"),
                    fontSize: Math.max(elemHeight / 6, 12) + "px"
                }, $scope.kpiStyle = {
                    color: $scope.get("kpiColor"),
                    fontSize: Math.max(elemHeight / 4, 12) + "px",
                    paddingTop: Math.max(elemHeight / 10) + "px"
                }, $scope.kpiComparisonStyle = {
                    fontSize: Math.max(elemHeight / 6, 10) + "px",
                    color: getKpiComparisonColor()
                }, setKpiIcon()
            }, $scope.$watch(function () {
                return {
                    h: $element.height(),
                    w: $element.width()
                }
            }, function (newVal, oldVal) {
                !newVal || newVal.h === oldVal.h && newVal.w === oldVal.w || $scope.setStyles()
            }, !0), $scope.$watch(function () {
                return {
                    kpiComparison: $scope.layout.props ? $scope.layout.props.kpiComparison : null,
                    layoutMode: $scope.layout.props ? $scope.layout.props.layoutMode : null,
                    layoutTemplate: $scope.layout.props ? $scope.layout.props.layoutTemplate : null
                }
            }, function (newVal, oldVal) {
                !newVal || newVal.kpiComparison === oldVal.kpiComparison && newVal.layoutMode === oldVal.layoutMode && newVal.layoutTemplate === oldVal.layoutTemplate || $scope.setStyles()
            }, !0), $scope.setStyles()
        }]
    }
});