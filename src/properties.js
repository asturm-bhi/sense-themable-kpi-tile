define(["jquery"], function ($) {
    "use strict";

    var layouts = {
        "default": {
            "name": "Default",
            "tileBackgroundColor": "#F8F8F8",
            "titleColor": "#333333",
            "comparisonPositiveColor": "#006600",
            "comparisonNegativeColor": "#CC0000",
            "comparisonNeutralColor": "#333333",
            "comparisonPositiveIcon": "&#9650;",
            "comparisonNegativeIcon": "&#9660;",
            "comparisonNeutralIcon": "&#9654;"
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
            "comparisonNeutralIcon": "&#9654;"
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
            "comparisonNeutralIcon": "&#9654;"
        }
    };


    var kpiTitle = {
            ref: "props.kpiTitle",
            label: "KPI title",
            type: "string",
            expression: "optional"
        },
        kpi = {
            ref: "props.kpi",
            label: "KPI",
            type: "string",
            expression: "optional"
        },
        kpiComparisonLabel = {
            ref: "props.kpiComparisonLabel",
            label: "KPI comparison (displayed value)",
            type: "string",
            expression: "optional"
        },
        kpiComparison = {
            ref: "props.kpiComparison",
            label: "KPI comparison (numeric value)",
            type: "number",
            expression: "optional"
        },
        layoutMode = {
            ref: "props.layoutMode",
            label: "Layout",
            type: "string",
            component: "radiobuttons",
            options: [{
                value: "default",
                label: "Default Layout"
            }, {
                value: "custom",
                label: "Custom Layout"
            }, {
                value: "template",
                label: "Template"
            }],
            defaultValue: "default"
        },
        options = [];
    _.map(layouts, function (item, key) {
        var o = {
            value: key,
            label: item.name
        };
        options.push(o)
    });
    var layoutTemplate = {
            ref: "props.layoutTemplate",
            label: "Template",
            type: "string",
            component: "dropdown",
            options: options,
            defaultValue: "default",
            show: function (data) {
                return data.props && data.props.layoutMode && "template" === data.props.layoutMode
            }
        },
        tileBackgroundColor = {
            ref: "props.tileBackgroundColor",
            label: "Tile background color",
            type: "string",
            expression: "optional",
            show: function (data) {
                return data.props && "custom" === data.props.layoutMode
            }
        },
        titleColor = {
            ref: "props.titleColor",
            label: "Title color",
            type: "string",
            expression: "optional",
            show: function (data) {
                return data.props && "custom" === data.props.layoutMode
            }
        },
        kpiColor = {
            ref: "props.kpiColor",
            label: "KPI color",
            type: "string",
            expression: "optional",
            show: function (data) {
                return data.props && "custom" === data.props.layoutMode
            }
        },
        comparisonColor = {
            ref: "props.comparisonColor",
            label: "Comparison color",
            type: "string",
            expression: "optional",
            show: function (data) {
                return data.props && "custom" === data.props.layoutMode
            }
        };
    return {
        type: "items",
        component: "accordion",
        items: {
            data: {
                label: "Data",
                items: {
                    kpiTitle: kpiTitle,
                    kpi: kpi,
                    kpiComparison: kpiComparison,
                    kpiComparisonLabel: kpiComparisonLabel
                }
            },
            appearance: {
                label: "Appearance",
                items: {
                    layoutMode: layoutMode,
                    layoutTemplate: layoutTemplate,
                    tileBackgroundColor: tileBackgroundColor,
                    titleColor: titleColor,
                    kpiColor: kpiColor,
                    comparisonColor: comparisonColor
                }
            }
        }
    }
});