import express, { Express, Request, Response } from 'express'
import cors from 'cors' // 5k (gzipped: 2.1k)

const app: Express = express()

app.use(cors())

const items = [
    {
        id: 1,
        title: 'Title 0',
        img: 'https://cdn.eventcinemas.com.au/cdn/resources/movies/15020/images/largeposter.jpg',
        class2: {
            rowNumber: 8,
            stoneNumberPerRow: 8,
        },
    },
    {
        id: 2,
        title: 'Title 2',
        img: 'https://cdn.eventcinemas.com.au/cdn/resources/movies/14621/images/largeposter.jpg',
        class2: {
            rowNumber: 10,
            stoneNumberPerRow: 12,
            takenStones: [3, 4,33, 34],
        },
    },
    {
        id: 3,
        title: 'Title 3',
        img: 'https://cdn.eventcinemas.com.au/cdn/resources/movies/15657/images/largeposter.jpg',
        class2: {
            rowNumber: 9,
            stoneNumberPerRow: 13,
            takenStones: [15, 16, 22, 34, 35],
        },
    },
]

app.get('/items', (req: Request, res: Response) => {
    res.send(items)
})

app.listen(8000, () => {
    console.log('⚡️[server]: Server is running at https://localhost:8000')
})