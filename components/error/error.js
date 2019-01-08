function preAttributeCheckerErrorHandle (error) {

};

function attributeCheckerErrorHandle (error) {

};

function rulesErrorHandle (property, type) {
    let checkedProp = property;
    if (property.includes("%")) {
        checkedProp = property.substring(0, property.indexOf("%"));
    }
    if (!type) {
        if (property === "id" || property === "type") {
            throw {
                reason: `${checkedProp} must have value associated with it.`,
                property: `${checkedProp}`
            }
        }
        throw {
            reason: `${checkedProp} must have value associated with it.`,
            property: `${checkedProp}`
        }
    }
    if (type === "nan") {
        throw {
            reason: `${checkedProp} value is not valid number.`,
            property: `${checkedProp}`
        }
    }
};

function fiwareOrionErrorHandle (error) {
    throw { code: error.statusCode, msg: {
        error: error.name,
        info: error.error.description
    }}
}

module.exports = {
    preAttributeCheckerErrorHandle,
    attributeCheckerErrorHandle,
    fiwareOrionErrorHandle,
    rulesErrorHandle
}