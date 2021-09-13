export const states = { START: 'start', STARTED: 'started', TOO_FAST: 'too fast', TOO_FAR: 'too far', DOCKED: 'docked', NO_OXYGEN: 'no oxygen' }

export let defaultState = { state: states.START, fuel: 80, oxygen: 90, distance: 5 }

export let state = defaultState


export const setState = (nextState) => {
    if (nextState.state === states.START) {
        state = defaultState
    } else {
        state = { ...state, ...nextState }

    }
    // console.log(state)
}