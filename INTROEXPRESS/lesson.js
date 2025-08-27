const express = require('express')
const app = express()
const path = require('path')

console.log(path.join(__dirname, 'dist'))
app.use(express.static(path.join(__dirname, 'dist')))

// app.get('/', (req, res) => {
//   res.sendFile(path.join(distPath, 'index.html'));
// });

const port = 3000
app.listen(port, function(){
    console.log(`Running server on port ${port}`)
})