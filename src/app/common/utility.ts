export default class Utility {

    static isNullOrEmptyOrWhitespace(value: string | null) {
        return !(typeof value === "string" && value.length > 0);
    }

}