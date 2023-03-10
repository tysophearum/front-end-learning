var inputAreaE = document.getElementById("input-area")
var bookNameInputE = document.getElementById("name-input")
var bookCategoryInputE = document.getElementById("category-input")
var bookPriceInputE = document.getElementById("price-input")
var booksE = document.getElementById("books")
var addBtnE = document.getElementById("add-btn")

function createBook() {
    let d = new Date()
    let id = d.getTime() + ""
    var book = {
        id: d.getTime() + "",
        name: bookNameInputE.value,
        price: bookPriceInputE.value,
        category: bookCategoryInputE.value
    }
    add(book)
    localStorage.setItem(book.id, JSON.stringify(book))
}

function add(book) {
    //Create book containter div
    var bookContainer = document.createElement("div")
    bookContainer.className = "book"
    bookContainer.id = book.id
    
    //Create input buttons
    var bookBtns = document.createElement("div")
    bookBtns.className = "book-btns"
    var deleteBtn = document.createElement("input")
    deleteBtn.type = "button"
    deleteBtn.className = "delete-btn"
    deleteBtn.id = book.id
    deleteBtn.value = "Delete"
    var chnameBtn = document.createElement("input")
    chnameBtn.type = "button"
    chnameBtn.className = "chname-btn"
    chnameBtn.id = book.id
    chnameBtn.value = "Change Name"
    //Add buttons into the books buttons div as its child
    bookBtns.appendChild(deleteBtn)
    bookBtns.appendChild(chnameBtn)

    //Create book image
    var bookImg = document.createElement("img")
    bookImg.src = "img/book.png"
    bookImg.className = "book-img"
    
    //Create name output with values
    var bookNameTitle = document.createElement("span")
    bookNameTitle.className = "name-title"
    bookNameTitle.innerText = "Name: "
    var bookNameOutput = document.createElement("span")
    bookNameOutput.className = "name-output"
    bookNameOutput.innerText = book.name
    
    //Create price output with values
    var bookPriceTitle = document.createElement("span")
    bookPriceTitle.className = "price-title"
    bookPriceTitle.innerText = "Price: "
    var bookPriceOutput = document.createElement("span")
    bookPriceOutput.className = "price-output"
    bookPriceOutput.innerText = book.price
    
    //Create name output with values
    var bookCategoryTitle = document.createElement("span")
    bookCategoryTitle.className = "category-title"
    bookCategoryTitle.innerText = "Category: "
    var bookCategoryOutput = document.createElement("span")
    bookCategoryOutput.className = "category-output"
    bookCategoryOutput.innerText = book.category
    
    //Reset value in the inputs
    bookNameInputE.value = ""
    bookPriceInputE.value = ""
    bookCategoryInputE.value = ""
    
    //Add everything into the book div element
    bookContainer.appendChild(bookBtns)
    bookContainer.appendChild(bookImg)
    bookContainer.appendChild(bookNameTitle)
    bookContainer.appendChild(bookNameOutput)
    bookContainer.appendChild(document.createElement("br"))
    
    bookContainer.appendChild(bookPriceTitle)
    bookContainer.appendChild(bookPriceOutput)
    bookContainer.appendChild(document.createElement("br"))
    
    bookContainer.appendChild(bookCategoryTitle)
    bookContainer.appendChild(bookCategoryOutput)
    
    
    //Append the new book into the books container
    booksE.appendChild(bookContainer)
}

function updateBook (book) {
    // Create Update button
    var updateBtn = document.createElement("input")
    updateBtn.type = "button"
    updateBtn.value = "Update"

    //Remove add button in the input area and replace it with the update button
    addBtnE.remove()
    inputAreaE.appendChild(updateBtn)

    //Get the area that display the book name price and category from the book
    let bookName = null
    let bookPrice = null
    let bookCategory = null
    for (var i = 0; i < book.childNodes.length; i++) {
        if (book.childNodes[i].className == "name-output") {
            bookName = book.childNodes[i];
        }
        else if (book.childNodes[i].className == "price-output") {
            bookPrice = book.childNodes[i];
        } 
        else if (book.childNodes[i].className == "category-output") {
            bookCategory = book.childNodes[i];
        }
    }

    //put the original data of the book in the input area for the user to update
    bookNameInputE.value = bookName.innerText
    bookPriceInputE.value = bookPrice.innerText
    bookCategoryInputE.value = bookCategory.innerText
    
    updateBtn.addEventListener("click", ()=>{
        //Update the data of the book with new data after user click the Update button
        bookName.innerText = bookNameInputE.value
        bookPrice.innerText = bookPriceInputE.value
        bookCategory.innerText = bookCategoryInputE.value

        console.log(book.id);
        localStorage.setItem(book.id, JSON.stringify({id: book.id,name: bookNameInputE.value, price:bookPriceInputE.value, category:bookCategoryInputE.value}))

        //Reset the value in the input area 
        bookNameInputE.value = ""
        bookPriceInputE.value = ""
        bookCategoryInputE.value = ""

        //Remove the update button and replace it back with the add button
        updateBtn.remove()
        inputAreaE.appendChild(addBtnE)
    })
}

function getAllStorage() {
    let keys = [];
    let tmplist = []
    for (let i=0; i<localStorage.length; i++){
        keys.push(localStorage.key(i))
     }

    for ( i=0; i<keys.length; i++ ) {
        let book = JSON.parse(localStorage.getItem(keys[i]))
        tmplist.push( book );
    }
    tmplist.sort( (a,b) => a.id - b.id );
    tmplist.forEach((book) => {
        add(book)
    })
}


getAllStorage()
addBtnE.addEventListener("click", createBook)
booksE.addEventListener("click", (e)=>{
    let tar = e.target
    if (tar.className == "delete-btn") {
        let removeB = document.getElementById(tar.id)
        removeB.remove()
        localStorage.removeItem(tar.id)
    }
    else if (tar.className == "chname-btn") {
        let changeBook = document.getElementById(tar.id)
        updateBook(changeBook)
    }
})
