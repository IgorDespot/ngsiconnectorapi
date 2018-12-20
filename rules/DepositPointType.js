"use strict";

const rules = require("../components/rules");

const DepositPointType = {
    id: rules.singleValueCheck,
    type: rules.singleValueCheck,
    family: rules.textValueCheck,
    name: rules.textValueCheck,
    refInputs: rules.textValueCheck,
    refOutputs: rules.textValueCheck,
    width: rules.textValueCheck,
    height: rules.textValueCheck,
    depth: rules.textValueCheck,
    weight: rules.textValueCheck,
    cargoVolume: rules.textValueCheck,
    maximumLoad: rules.textValueCheck,
    recommendedLoad: rules.textValueCheck,
    category: rules.textValueCheck,
    insertHolesNumber: rules.textValueCheck,
    insertHoleWidth: rules.textValueCheck,
    insertHoleHeight: rules.textValueCheck,
    loadType: rules.textValueCheck,
    madeOf: rules.textValueCheck,
    madeOfCode: rules.textValueCheck,
    brandName: rules.textValueCheck,
    modelName: rules.textValueCheck,
    manufacturerName: rules.textValueCheck,
    colors: rules.textValueCheck,
    image: rules.textValueCheck,
    compliantWith: rules.textValueCheck,
    accessLimitation: rules.textValueCheck,
    userIdentification: rules.textValueCheck,
    inputControl: rules.textValueCheck,
    maximumInputVolume: rules.textValueCheck,
    features: rules.textValueCheck,
};

module.exports = DepositPointType;