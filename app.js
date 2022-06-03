
class Part extends React.Component {
  

    render() {
        let obj = this.props.obj
        return (
            <div className='item'>
                <p><span>Item:</span> {obj.item}</p>
                <p><span>Brand:</span> {obj.brand}</p>
                <p><span>Units:</span> {obj.units}</p>
                <p><span>Quantity:</span> {obj.quantity}</p>
                <button onClick={this.props.handleDelete}  className='btn' name = {obj.item}>Delete</button>

            </div>

        )

    }
}

class App extends React.Component {
 
    state = {
        groceryItems: groceryItemsList,
        paid: false,
        filter: '',
        item:'',
        brand:'',
        units:'',
        quantity:0
    }
    handleDelete = (event) => {
        this.state.groceryItems.filter(item=> item.item!==event.target.name)
        
        this.setState ({

            groceryItems: this.state.groceryItems.filter(item=> item.item!==event.target.name)
        })
        }
    handleChangePaid = () => {

        this.setState({
            paid: !this.state.paid
        })
    }
    handleChange =(event)=>{

        this.setState({
            [event.target.id] :event.target.value
        })
        
    }
    handleFilter = (event) => {
        let filteredReceipt = event.target.value.toLowerCase()
        this.setState({
            filter: filteredReceipt
        })
    }
    handleCreate = () => {
        $(".modal").modal('show')
    }
    handleSubmit = (event) =>{
        event.preventDefault()
        const newItem = {
            item: this.state.item,
            brand: this.state.brand,
            units: this.state.units,
            quantity: this.state.quantity,
            isPurchased:true
        }
        this.setState({

            groceryItems : [...this.state.groceryItems, newItem]
        })

        $('.modal').modal('hide')
       
    }
    render() {
        console.log(this.state.filter)
        return (
            <div className='main'>
                <h1>React Grocery Store</h1>

                <button class='paid' onClick={this.handleChangePaid}>{this.state.paid ? "Not Paid" : "Paid"}</button>
                <label for="search">Search by Item Name</label>
                <input type='text' name='search' onChange={this.handleFilter} />
                <div className="container">
                    {this.state.groceryItems.filter(product => {
                        return (product.isPurchased != this.state.paid) && (product.item.toLowerCase().includes(this.state.filter))
                    }).map(receipt => <Part obj={receipt} handleDelete = {this.handleDelete}/>)} </div>
                <button class='paid' onClick={this.handleCreate}>Create New Item</button>
                <div class="modal" tabindex="-1" role="dialog" hidden='false'>
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-body">
                                <form onSubmit={this.handleSubmit}>
                                    <label htmlFor="item"  >Item</label>
                                    <input type='text' id ='item'  onChange={this.handleChange}></input>
                                    <label htmlFor="brand">Brand</label>
                                    <input type='text' id ='brand'  onChange={this.handleChange}></input>
                                    <label htmlFor="units">Units</label>
                                    <input type='text' id ='units'  onChange={this.handleChange}></input>
                                    <label htmlFor="quantity">Quantity</label>
                                    <input type='number' id ='quantity' onChange={this.handleChange}></input>

                                    <div class="modal-footer">
                                        <button type="submit" class="btn btn-primary">Save changes</button>
                                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                    </div>
                                </form>
                            </div>

                        </div>
                    </div>
                </div>

            </div>

        )
    }
}



ReactDOM.render(
    <App />,
    document.querySelector('.container')
)
