class Security {
    /**
     * Generate UUID.
     *
     * @returns {string}
     */
    static guid() {
        return this.chars() + this.chars() + '-' + this.chars() + '-' + this.chars() + '-' +
            this.chars() + '-' + this.chars() + this.chars() + this.chars();
    }

    /**
     * Generate random characters.
     * @returns {string}
     */
    static chars() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
}

export default Security;