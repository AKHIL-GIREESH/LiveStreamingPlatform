const getUser = async () => {
    try {
        const resp = fetch("http://localhost:3000/api/v1/auth/getSelf", {})
    } catch (e) {
        throw new Error("Unable to fetch user" + e)
    }
}

export default getUser