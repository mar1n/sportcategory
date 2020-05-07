export async function sports(headers = {}) {
    let res = await fetch(`/rest/sport`, {
        headers
    })
    let sports = await res.json()
    return sports.map(sport => {
        console.log(sport)
        return stringifySportImages(sport)
    })
}

export async function sport(sportID, headers = {}) {
    let res = await fetch(`/rest/sport/${sportID}`, {
        headers
    })
    
    let sport = await res.json()
    console.log(stringifySportImages(sport))
    return stringifySportImages(sport)
}

function stringifySportImages(sport) {
    return {
        ...sport,
        ...(sport.imageCover &&
            {
                imageCover: {
                    mimetype: sport.imageCover.mimetype,
                    data: sport.imageCover.data.toString('base64')
                }
            }),
        ...(sport.imageBackground &&
            {
                imageBackground: {
                    mimetype: sport.imageBackground.mimetype,
                    data: sport.imageBackground.data.toString('base64')
                }
            }),
        ...(sport.thumbCover &&
            {
                thumbCover: {
                    mimetype: sport.thumbCover.mimetype,
                    data: sport.thumbCover.data.toString('base64')
                }
            }),
        ...(sport.thumbBackground &&
            {
                thumbBackground: {
                    mimetype: sport.thumbBackground.mimetype,
                    data: sport.thumbBackground.data.toString('base64')
                }
            })
    };
}