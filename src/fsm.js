class FSM {

    constructor(config) {
        if (config == null) throw new SyntaxError('Данные не введены');
        this.config = config;
        this.state = config.initial;
        this.prevState = null;
        this.redoState = null;
    }

    getState() {return this.state}

    changeState(state) {
        if (!(state in this.config.states)) throw new SyntaxError('Данные не введены');
        this.prevState = this.state;
        this.state = state;
        this.redoState = null;
    }

    trigger(event) {
        if (!(this.config.states[this.state].transitions[event])) throw new SyntaxError('Данные не введены');
        this.prevState = this.state;
        this.state = this.config.states[this.state].transitions[event];
        this.redoState = null;
    }

    reset() {
        this.prevState = this.state;
        this.state = this.config.initial;
    }

    getStates(event) {
        let arr = [];
        let i=0;
        let key;
        if (!event) {
            for (key in this.config.states) {
                arr[i] = key;
                i++;
            }
            return arr;
        }

        for (key in this.config.states) {
            if (!!this.config.states[key].transitions[event]) {
                arr[i] = key;
                i++;
            }
        }
        return arr;
    }

    undo() {
        if (!this.prevState) return false;
        this.redoState = this.state;
        this.state = this.prevState;
        this.prevState = null;
        return true;
    }

    redo() {
        if (!this.redoState) return false;
        this.state = this.redoState;
        this.redoState = null;
        return true;
    }

    clearHistory() {
        this.redoState = null;
        this.prevState = null;
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
