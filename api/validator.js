module.exports = app => {

    function existsOrError(value, msg) {
        if (!value) throw msg
        if (Array.isArray(value) && !value.length === 0) throw msg
        if (typeof value === "string" && !value.trim()) throw msg
    }

    function isEmpty(value) {
        if (!value) return true
        if (typeof value === "string" && !value.trim()) return true
    }

    function validateID(value, msg) {
        if (!value) throw msg
        if (isNaN(value)) throw msg
    }

    return { existsOrError, isEmpty, validateID }
}