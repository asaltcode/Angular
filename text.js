let data = [
    {
    "_id": "66890850f527e218643273a0",
    "name": "Amma sandi",
    "price": 25,
    "thumbnail": "http://localhost:8000/images/thumbnails/image-1720421299460.jpg",
    "image": "http://localhost:8000/images/image-1720421299460.jpg",
    "createdAt": "2024-07-06T09:03:12.949Z",
    "updatedAt": "2024-07-08T06:48:19.761Z"
    },
    {
    "_id": "668b8dc76608e221c476ae7c",
    "name": "Toothpaste",
    "price": 30,
    "thumbnail": "http://localhost:8000/images/thumbnails/image-1720421831696.jpg",
    "image": "http://localhost:8000/images/image-1720421831696.jpg",
    "createdAt": "2024-07-08T06:57:11.985Z",
    "updatedAt": "2024-07-08T06:57:11.985Z"
    },
    {
    "_id": "668cd28204e7e03af1b2e031",
    "name": "Summa",
    "price": 50,
    "thumbnail": "http://localhost:8000/images/thumbnails/image-1720505535978.jpg",
    "image": "http://localhost:8000/images/image-1720505535978.jpg",
    "createdAt": "2024-07-09T06:02:42.170Z",
    "updatedAt": "2024-07-09T06:12:16.929Z"
    },
    {
    "_id": "668cd29004e7e03af1b2e034",
    "name": "Abcd",
    "price": 100,
    "thumbnail": "http://localhost:8000/images/thumbnails/image-1720505546808.jpg",
    "image": "http://localhost:8000/images/image-1720505546808.jpg",
    "createdAt": "2024-07-09T06:02:56.278Z",
    "updatedAt": "2024-07-09T06:12:27.069Z"
    }
    ]

    let test = "Amma sandi"
    
    let result = data.filter(data => data.name === test)

    console.log(result[0])