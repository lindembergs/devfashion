const itemCardList = document.querySelector('.item-card-list')
const finalPriceStrong = document.querySelector('.box-finalValue')

// Função de obter dados do localstorage
function handleGetCart() {
  const cart = JSON.parse(localStorage.getItem(('@devFashion:cart')))
  handleCreateCartList(cart)
  return cart
}

// Função de criação de lista de itens
function handleCreateCartList(cart) {
  const constructItemCardDiv = document.querySelectorAll('.item-card')
  constructItemCardDiv?.forEach(item => {
    item.remove()
  })

  cart?.forEach(item => {
    // PRIMEIRA SEÇÃO
    const itemCardDiv = document.createElement('div')
    itemCardDiv.classList.add('item-card')
    const cardLeftSideDiv = document.createElement('div')
    cardLeftSideDiv.classList.add('card-leftSide')
    const cardImgFigure = document.createElement('figure')
    const cardImg = document.createElement('img')
    cardImg.src = `${item.img}`
    cardImg.alt = 'imagem-item'

    const cardRigthSide = document.createElement('div')
    cardRigthSide.classList.add('card-rigthSide')
    const cardRigthSideH3 = document.createElement('h3')
    cardRigthSideH3.textContent = `${item.name}`
    const cardCollorSizeDiv = document.createElement('div')
    cardCollorSizeDiv.classList.add('card-collor-size')
    const cardCollorSizeP = document.createElement('p')
    cardCollorSizeP.textContent = `Cor: ${item.partColor}`
    const cardCollorSizeSpan = document.createElement('span')
    cardCollorSizeSpan.textContent = `${item.partSize}`

    const cardControllersDiv = document.createElement('div')
    cardControllersDiv.classList.add('card-controllers')
    const cardControllersStrong = document.createElement('strong')
    cardControllersStrong.textContent = `$${item.partPrice.toFixed(2)}`

    const buttonQntDiv = document.createElement('div')
    buttonQntDiv.classList.add('button-controller')
    const buttonDecrement = document.createElement('button')
    buttonDecrement.textContent = '-'
    buttonDecrement.onclick = () => handleDecrement(item.id, item.partSize, cart)
    const buttonControllerQnt = document.createElement('span')
    buttonControllerQnt.classList.add('buttonQnt')
    buttonControllerQnt.textContent = `${item.partQnt}`
    const buttonIncrem = document.createElement('button')
    buttonIncrem.textContent = '+'
    buttonIncrem.onclick = () => handleIncrement(item.id, item.partSize, cart)
    const buttonTrash = document.createElement('button')
    buttonTrash.classList.add('trash-button')
    buttonTrash.onclick = () => handleDeleteItem(item.id, item.partSize, cart)
    const buttonImgTrash = document.createElement('img')
    buttonImgTrash.src = '../../image/trash.svg'
    buttonImgTrash.alt = 'trash-icon'

    cardImgFigure.appendChild(cardImg)
    cardLeftSideDiv.appendChild(cardImgFigure)
    itemCardDiv.appendChild(cardLeftSideDiv)

    cardRigthSide.appendChild(cardRigthSideH3)
    cardCollorSizeDiv.appendChild(cardCollorSizeP)
    cardCollorSizeDiv.appendChild(cardCollorSizeSpan)
    cardRigthSide.appendChild(cardCollorSizeDiv)

    cardControllersDiv.appendChild(cardControllersStrong)
    
    buttonQntDiv.appendChild(buttonDecrement)
    buttonQntDiv.appendChild(buttonControllerQnt)
    buttonQntDiv.appendChild(buttonIncrem)
    cardControllersDiv.appendChild(buttonQntDiv)
    buttonTrash.appendChild(buttonImgTrash)
    cardControllersDiv.appendChild(buttonTrash)
    
    cardRigthSide.appendChild(cardControllersDiv)
    itemCardDiv.appendChild(cardRigthSide)

    itemCardList.appendChild(itemCardDiv)
  })

  handleSumOfItens(cart)
}

// Função de decrementar itens
function handleDecrement(id, size, cart) {
  let updateCart = cart

  updateCart.map(item => {
    if(item.id === id && item.partSize === size && item.partQnt > 0) {
      --item.partQnt
    }
  })

  localStorage.setItem('@devFashion:cart', JSON.stringify(updateCart))
  handleGetCart()
}

// Função de incrementar itens
function handleIncrement(id, size, cart) {
  let updateCart = cart

  updateCart.map(item => {
    if(item.id === id && item.partSize === size) {
      ++item.partQnt
    }
  })

  localStorage.setItem('@devFashion:cart', JSON.stringify(updateCart))
  handleGetCart()
}

// Função de deleção do item
function handleDeleteItem(id, size, cart) {
  let updateCart = cart.filter(item => !(item.id === id && item.partSize === size))

  localStorage.setItem('@devFashion:cart', JSON.stringify(updateCart))
  handleGetCart()
}

// Função de somar o itens
function handleSumOfItens(cart) {
  let totalPrice = 0

  cart.forEach(item => {
    totalPrice += item.partQnt * item.partPrice
  })

  finalPriceStrong.textContent = `$${totalPrice.toFixed(2)}`
}

handleGetCart()
