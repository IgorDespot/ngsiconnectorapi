"use strict";

const rules = require("../components/rules");

const DepositPointType = {
    "id": rules.singleValueCheck,
    "type": rules.singleValueCheck,
    "family": rules.textValueCheckMandatory,
    "name": rules.textValueCheckMandatory,
    "refInputs": rules.textValueCheck,
    "refOutputs": rules.textValueCheck,
    "width": rules.numberCheckMandatory,
    "height": rules.numberCheckMandatory,
    "depth": rules.numberCheckMandatory,
    "weight": rules.numberCheckMandatory,
    "cargoVolume": rules.numberCheckMandatory,
    "maximumLoad": rules.numberCheckMandatory,
    "recommendedLoad": rules.textValueCheck,
    "category": rules.textValueCheckMandatory,
    "insertHolesNumber": rules.numberCheckMandatory,
    "insertHoleWidth": rules.numberCheck,
    "insertHoleHeight": rules.numberCheck ,
    "loadType": rules.textValueCheck,
    "madeOf": rules.textValueCheck,
    "madeOfCode": rules.textValueCheck,
    "brandName": rules.textValueCheck,
    "modelName": rules.textValueCheck,
    "manufacturerName": rules.textValueCheck,
    "colors": rules.listCheck,
    "image": rules.textValueCheck,
    "compliantWith": rules.listCheck,
    "accessLimitation": rules.textValueCheck,
    "userIdentification": rules.textValueCheck,
    "inputControl": rules.textValueCheck,
    "maximumInputVolume": rules.numberCheck,
    "features": rules.listCheckMandatory,
};

module.exports = DepositPointType;