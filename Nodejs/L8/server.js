const express = require('express');

const app = express();

app.get('/', (req, res) => {
    const name = {
        name:"gandu",
        age:25,
        city:"bangalore",
        sex: "nahi kiya abhi tak"
    }
    res.send(name);
});

app.get("/api/v1/product/:productid", (req, res) => {
    const id = req.params.productid;const product = {
    id: 1,
    name: "laptop",
    price: 2000
};
res.status(200).json({
    success: true,
    data: product
})
        product,
    })
}
);
app.listen(3000, () => {
    console.log('Server is running on port 3000 located at http://localhost:3000');
});