

const express = require("express")
const { v4: uuidv4 } = require("uuid");



const app = express()
app.use(express.json());
const cors = require("cors");
app.use(cors());
const port = 8080

let data = [
    {
        id: 2,
        description: "Sweet and savory sauces relishes spreads and seasonings",
        name: "Condiments",
    },
    {
        id: 1,
        description: "Soft drinks coffees teas beers and ales",
        name: "Beverages",
    },
    {
        id: 3,
        description: "Desserts candies and sweet breads",
        name: "Confections",
    },
    {
        id: 4,
        description: "Cheeses",
        name: "Dairy Products",
    },
    {
        id: 5,
        description: "Breads crackers pasta and cereal",
        name: "Grains/Cereals",
    },
    {
        id: 6,
        description: "Prepared meats",
        name: "Meat/Poultry",
    },
    {
        id: 7,
        description: "Dried fruit and bean curd",
        name: "Produce",
    },
    {
        id: 8,
        description: "Seaweed and fish",
        name: "Seafood",
    },
];


app.get('/data', (req, res) => {
    if (data.length > 0) res.status(200).send({
        data: data,
        message: "succes"
    })
    else {
        res.status(204).send({
            data: [],
            message: "data is empty"
        })
    }
})

app.delete("/data/:id", (req, res) => {
    const { id } = req.params;

    const idx = data.findIndex((p) => p.id === +id);

    if (idx === -1) {
        res.status(404).send({
            message: "no such data to delete!",
        });
    } else {
        const deleted = data.splice(idx, 1);
        res.status(200).send({
            deletedData: deleted,
            data: data,
            message: "succesfully deleted!",
        });
    }
});

app.post('/data', (req, res) => {
    const { description, name } = req.body;
    const newData = {
        id: uuidv4(),
        description,
        name,
    };

    data.push(newData);
    res.status(201).send({
        message: "successfully posted data!",
        newData,
    });
});

app.put("/data/:id", (req, res) => {
    const { id } = req.params;
    const { description, name } = req.body;

    const idx = data.findIndex((p) => p.id === +id);

    if (idx !== -1) {
        const updatedData = {
            id: +id,
            description,
            name,
        };
        products[idx] = updatedData;

        res.status(200).send({
            message: "successfully updated!",
            updatedData,
        });
    } else {
        res.status(404).send({ message: "not found" });
    }
});

app.get("/data/search", (req, res) => {
    const { description: serachQuery } = req.query;
  
    const filteredData = data.filter((q) =>
      q.description.toLowerCase().includes(serachQuery)
    );
  
    console.log(filteredData);
  
    if (filteredData.length > 0) {
      res.status(200).send({
        data: filteredData,
        message: "success",
        error: null,
      });
    } else {
      res.status(204).send({
        data: [],
        message: "data is empty!",
      });
    }
  });

app.patch("/data/:id", (req, res) => {
    const { id } = req.params;
    const { description, name } = req.body;

    const idx = data.findIndex((p) => p.id === +id);

    if (idx !== -1) {

        if (description !== undefined) {
            data[idx].description = description;
        }
        if (name !== undefined) {
            data[idx].name = name;
        }



        res.status(200).send({
            message: "successfully updated!",
            updatedProduct: data[idx],
            data,
        });
    } else {
        res.status(404).send({ message: "not found" });
    }
});

app.listen(port, () => {
    console.log(`Link:  http://localhost:${port} `)
})


