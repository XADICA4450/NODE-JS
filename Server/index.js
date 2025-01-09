

const express = require("express")
const { v4: uuidv4 } = require("uuid");



const app = express()
app.use(express.json());
const cors = require("cors");
app.use(cors());
const port = 8080

data=[
    {
      "id": 1,
      "title": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
      "price": 109.95,
      "description": "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
      "category": "men's clothing"
    },
    {
      "id": 2,
      "title": "Mens Casual Premium Slim Fit T-Shirts ",
      "price": 22.3,
      "description": "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
      "category": "men's clothing"
    },
    {
      "id": 3,
      "title": "Mens Cotton Jacket",
      "price": 55.99,
      "description": "great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping, mountain/rock climbing, cycling, traveling or other outdoors. Good gift choice for you or your family member. A warm hearted love to Father, husband or son in this thanksgiving or Christmas Day.",
      "category": "men's clothing"
    },
    {
      "id": 4,
      "title": "Mens Casual Slim Fit",
      "price": 15.99,
      "description": "The color could be slightly different between on the screen and in practice. / Please note that body builds vary by person, therefore, detailed size information should be reviewed below on the product description.",
      "category": "men's clothing"
    },
    {
      "id": 5,
      "title": "John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet",
      "price": 695,
      "description": "From our Legends Collection, the Naga was inspired by the mythical water dragon that protects the ocean's pearl. Wear facing inward to be bestowed with love and abundance, or outward for protection.",
      "category": "jewelery"
    },
    {
      "id": 6,
      "title": "Solid Gold Petite Micropave ",
      "price": 168,
      "description": "Satisfaction Guaranteed. Return or exchange any order within 30 days.Designed and sold by Hafeez Center in the United States. Satisfaction Guaranteed. Return or exchange any order within 30 days.",
      "category": "jewelery"
    }
    ]


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
    const {title,price, description, category } = req.body;
    const newData = {
        id: uuidv4(),
        title,
        price,
        description,
        category,
    };

    data.push(newData);
    res.status(201).send({
        message: "successfully posted data!",
        newData,
    });
});

app.put("/data/:id", (req, res) => {
    const { id } = req.params;
    const {title,price, description, category } = req.body;

    const idx = data.findIndex((p) => p.id === +id);

    if (idx !== -1) {
        const updatedData = {
            id: +id,
            title,
            price,
            description,
            category,
        };
        data[idx] = updatedData;

        res.status(200).send({
            message: "successfully updated!",
            updatedData,
        });
    } else {
        res.status(404).send({ message: "not found" });
    }
});

app.get("/data/search", (req, res) => {
    const { description: searchQuery } = req.query;
  
    const filteredData = data.filter((q) =>
      q.description.toLowerCase().includes(searchQuery)
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
    const {title,price, description, category } = req.body;

    const idx = data.findIndex((p) => p.id === +id);

    if (idx !== -1) {

        if (description !== undefined) {
            data[idx].description = description;
        }
        if (title !== undefined) {
            data[idx].title = title;
        }
        if (price !== undefined) {
            data[idx].price = price;
        }
        if (category !== undefined) {
            data[idx].category = category;
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


