"use strict";

function singleValueCheck(args) {
    if(!args[1]) {
        throw `Property failed check, no entity id/type value was found`
    }
    return args[1];
};

function textValueCheck(args) {
    if(args[0].includes("%")) {
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

module.exports = {
    singleValueCheck,
    textValueCheck
};  