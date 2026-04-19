import { prisma } from "../lib/prisma.js";
import express from "express";

const port = 3000;
const app = express();

app.get("/movies", async (_, res) => {
    const movies = await prisma.movie.findMany({
        orderBy: {
            title: "asc"
        },
        include: {
            genres: true,
            languages: true
        }
    })
    res.json(movies)
});

app.listen(port, () => {
    console.log(`Servidor em execução na porta: ${3000}`);
});
