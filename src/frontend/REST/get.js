export async function sports() {
    let res = await fetch(`/rest/sport`)
    let sports = await res.json()
    return sports.map(sport => {
        console.log(sport)
        return stringifySportImages(sport)
    })
}

export async function sport(sportID) {
    let res = await fetch(`/rest/sport/${sportID}`)
    let sport = await res.json()
    return stringifySportImages(sport)
}

function stringifySportImages(sport) {
    return {
        ...sport,
        ...(sport.imageCover &&
            {
                imageCover: {
                    mimetype: sport.imageCover.mimtype,
                    data: sport.imageCover.data.toString('base64')
                }
            }),
        ...(sport.imageBackground &&
            {
                imageBackground: {
                    mimetype: sport.imageCover.mimtype,
                    data: sport.imageBackground.data.toString('base64')
                }
            })
    }
}