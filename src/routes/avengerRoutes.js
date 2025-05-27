const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Obtener todos los Avengers
router.get("/", async (req, res) => {
  try {
    const avengers = await prisma.avenger.findMany({
      include: { habilidades: true },
    });
    res.json(avengers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener los Avengers" });
  }
});

// Crear nuevo Avenger
router.post("/", async (req, res) => {
  try {
    const { nombre, alias, actor, descripcion, habilidades } = req.body;

    if (!nombre || !alias || !actor || !descripcion || !habilidades || !Array.isArray(habilidades)) {
      return res.status(400).json({ error: "Todos los campos deben estar llenos" });
    }

    const newAvenger = await prisma.avenger.create({
      data: {
        nombre,
        alias,
        actor,
        descripcion,
        habilidades: {
          create: habilidades.map(hab => ({ habilidad: hab })),
        },
      },
      include: { habilidades: true },
    });

    res.status(201).json(newAvenger);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear el Avenger" });
  }
});

module.exports = router;
