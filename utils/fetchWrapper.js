
export const fetchWrapper = async (ref, fetchFn, onSuccess = () => { }, setError, setModalVisible) => {

    if (!ref.current) return
    ref.current = false

    try {
        const data = await fetchFn()

        if (data?.error) {
            if (typeof setError === 'function') {
                setError(data.error)
                setTimeout(() => setError(''), 5000)
            }
        }
        else if (data?.result) {
            onSuccess(data)
        }
        else {
            if (typeof setError === 'function') {
                setError("Erreur : Problème de connexion")
                setTimeout(() => setError(''), 5000)
            }
        }
    } catch (err) {
        console.log("FETCH ERROR :", err)
        if (typeof setError === 'function') {
            setError("Erreur : Problème de connexion")
            setTimeout(() => setError(''), 5000)
        }
    } finally {
        ref.current = true
        if (typeof setModalVisible === 'function') setModalVisible(false)
    }
}
