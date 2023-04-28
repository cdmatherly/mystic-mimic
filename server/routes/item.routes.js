const ItemController =require("../controllers/item.controller")

module.exports = app => {
    app.get('/api/items', ItemController.getAllItems)
    app.get('/api/items/:id', ItemController.getItemById)
    app.post('/api/items', ItemController.createItem)
    // app.put('/api/items/:id', ItemController.updateItemById)
    app.delete('/api/items/:id', ItemController.deleteItem)

    app.put('/api/items/:char_id', ItemController.addItemToCharacterInventory)
    app.post('/api/items/insert', ItemController.InsertItems)
    app.get('/api/:char_id/items', ItemController.getItemsByCharacter)
}