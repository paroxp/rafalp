class Stack {
    /**
     * Construct the stack.
     */
    constructor() {
        this.bag = [];
    }

    /**
     * Add new notification to the stack.
     *
     * @param item
     */
    add(item) {
        this.bag.push(item);
    }
}

export default Stack;