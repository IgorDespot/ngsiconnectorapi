"use strict";

const error = require("../error");

function singleValueCheck(args) {
    if(!args[1]) {
        errors.rulesErrorHandle(args[0]);
    }
    return args[1];
};

function textValueCheck(args) {
    if(args[0].includes("%")) {
        var parsedMetadataFromHeader = JSON.parse(args[0].substring( args[0].indexOf("{"), args[0].indexOf("}") + 2 ));
        return {
            type: "Text",
            value: args[1] || "",
            metadata: parsedMetadataFromHeader
        };
    };
    return {
        type: "Text",
        value: args[1] || "",
        metadata: {}
    };
};

function textValueCheckMandatory(args) {
    if (!args[1]) {
        errors.rulesErrorHandle(args[0]);
    }
        
    if (args[0].includes("%")) {
            var parsedMetadataFromHeader = JSON.parse(args[0].substring( args[0].indexOf("{"), args[0].indexOf("}") + 2 ));
            return {
                type: "Text",
                value: args[1],
                metadata: parsedMetadataFromHeader
            };
    };
    return {
        type: "Text",
        value: args[1],
        metadata: {}
    };
};

function numberCheck(args) {
    if (args[1]) {
        if (Number.isNaN(Number(args[1].replace('.', '').replace(',', '.')))) {
            error.rulesErrorHandle(args[0],"nan");
        }
    }
    if(args[0].includes("%")) {
        var parsedMetadataFromHeader = JSON.parse(args[0].substring( args[0].indexOf("{"), args[0].indexOf("}") + 2 ));
        return {
            type: "Number",
            value: Number(args[1].replace('.', '').replace(',', '.')) || "",
            metadata: parsedMetadataFromHeader
        };
    };
    return {
        type: "Number",
        value: Number(args[1].replace('.', '').replace(',', '.')) || "",
        metadata: {}
    };
}

function numberCheckMandatory(args) {
    if (!args[1]) {
        error.rulesErrorHandle(args[0]);
    }  
    if (args[1]) {
        if (Number.isNaN(Number(args[1].replace('.', '').replace(',', '.')))) {
            error.rulesErrorHandle(args[0],"nan");
        }
    }
    if(args[0].includes("%")) {
        var parsedMetadataFromHeader = JSON.parse(args[0].substring( args[0].indexOf("{"), args[0].indexOf("}") + 2 ));
        return {
            type: "Number",
            value: Number(args[1].replace('.', '').replace(',', '.')),
            metadata: parsedMetadataFromHeader
        };
    };
    return {
        type: "Number",
        value: Number(args[1].replace('.', '').replace(',', '.')),
        metadata: {}
    };
};

function listCheck(args) {
    if (args[0].includes("%")) {
        var parsedMetadataFromHeader = JSON.parse(args[0].substring( args[0].indexOf("{"), args[0].indexOf("}") + 2 ));
        return {
            type: "List",
            value: args[1].split(',').map(raw => raw.trim()) || '',
            metadata: parsedMetadataFromHeader
        }
    }
    return {
        type: "List",
        value: args[1].split(',').map(raw => raw.trim()) || '',
        metadata: {}
    }
};

function listCheckMandatory(args) {
    if (!args[1])
        error.rulesErrorHandle(args[0]);
    if (args[0].includes("%")) {
        var parsedMetadataFromHeader = JSON.parse(args[0].substring( args[0].indexOf("{"), args[0].indexOf("}") + 2 ));
        return {
            type: "List",
            value: args[1].split(',').map(raw => raw.trim()),
            metadata: parsedMetadataFromHeader
        }
    }
    return {
        type: "List",
        value: args[1].split(',').map(raw => raw.trim()),
        metadata: {}
    }
};



module.exports = {
    singleValueCheck,
    textValueCheck,
    numberCheckMandatory,
    numberCheck,
    textValueCheckMandatory,
    listCheck,
    listCheckMandatory
};  