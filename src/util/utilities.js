export const debounce = (fn, d, ...argues) => {
    let timer
    let context = this
    // let args = [...argues]
    // cant access search.value here

    return () => {
        const search = document.getElementById('search').value
        clearTimeout(timer)
        timer = setTimeout(() => {
            fn.apply(context, [search]) //context is nothing but the window object here
        }, d)
    }
}
