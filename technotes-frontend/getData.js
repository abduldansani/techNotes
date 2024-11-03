async function getData() {
    const url = "https://example.com"
    try {
        const respose = await fetch(url)
        if(!respose.ok) {
            throw new Error("Response status:", respose.status)
        }
        console.log(response.json)
    } catch(err) {
        console.error(err.message)
    }
}

const createRequest = () => new Request("https://localhost:4000", {
    method: "POST",
    body: JSON.stringify({username: "Abduldansani"})
})

const response1 = fetch(createRequest())