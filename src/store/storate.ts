export function loadState<T>(key: string): T | undefined {
    try {
        const jsonState = localStorage.getItem(key);

        if (!jsonState) {
            return undefined;
        }

        /* return jsonState */
        return JSON.parse(jsonState)

    } catch(error_) {
        console.error(error_)
        
        return undefined;
    }
}

export function saveState<T>(state: T, key: string) {
    const stringState = JSON.stringify(state);

    localStorage.setItem(key, stringState);
}
