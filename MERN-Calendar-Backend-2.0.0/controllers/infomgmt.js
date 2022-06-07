const { response } = require('express');

const subirHistorial = async(req, res = response ) => {
    try {
        await ListItem.findByIdAndUpdate(req.params.id, {
            itemname: req.body.itemname,
            category: req.body.category
        });
        // Send response in here
        res.send('Item Updated!');
  
      } catch(err) {
          console.error(err.message);
          res.send(400).send('Server Error');
      }
}
