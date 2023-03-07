export const boot = function (callback: () => void) {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            callback()
        })
    } else {
        callback()
    }
}