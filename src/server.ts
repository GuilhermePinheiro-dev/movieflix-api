import { prisma } from "../lib/prisma.js";
import express from "express";

const port = 3000;
const app = express();

app.use(express.json());

app.get("/movies", async (_, res) => {
    const movies = await prisma.movie.findMany({
        orderBy: {
            title: "asc",
        },
        include: {
            genres: true,
            languages: true,
        },
    });
    res.json(movies);
});

app.post("/movies", async (req, res) => {
    const { title, genre_id, language_id, oscar_count, release_date } =
        req.body;

    try {
        const movieWithSameTitle = await prisma.movie.findFirst({
            where: {
                title: { equals: title, mode: "insensitive" },
            },
        });

        if(movieWithSameTitle){
            res.status(409).send({message: "Já existe um filme com este titulo"})
        }

        await prisma.movie.create({
            data: {
                title,
                genre_id,
                language_id,
                oscar_count,
                release_date: new Date(release_date),
            },
        });

        res.status(201).send();
    } catch (error) {
        return res.status(500).send({ message: "Erro ao cadastrar o filme" });
    }
});

app.listen(port, () => {
    console.log(`Servidor em execução na porta: ${3000}`);
});
