export function get<T>(obj: any, path: string, defaultValue: T): T {
    return path
        .split('.')
        .reduce((a, c) => (a && a[c] ? a[c] : defaultValue || obj), obj) as T
}

function is(x:any, y:any) {
    if (x === y) {
        return x !== 0 || y !== 0 || 1 / x === 1 / y
    } else {
        return x !== x && y !== y
    }
}

export  function shallowEqual(objA:any, objB:any) {
    if (is(objA, objB)) return true

    if (typeof objA !== 'object' || objA === null || typeof objB !== 'object' || objB === null) {
        return false
    }
    const keysA = Object.keys(objA)
    const keysB = Object.keys(objB)

    if (keysA.length !== keysB.length) return false

    for (let key of keysA) {
        if (!Object.prototype.hasOwnProperty.call(objB, key) || !is(objA[key], objB[key])) {
            return false
        }
    }

    return true
}
