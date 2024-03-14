const homeMain = document.getElementById('home')

// Objeto que armazena as informações do item atual 
let currentPart = {
  partColorIdx: 0,
  partSizeIdx: 0,
  partQnt: 2,
}

// Objeto que armazena as informações do item selecionado e manda p/ o carrinho
let cart = {
  id: '', 
  img: '',
  name: '',
  partColor: '',
  partSize: '',
  partPrice: '',
  partQnt: 1
}

// Função de consumo de dados vindos do localStorage
function handleGetProduct() {
  const product = localStorage.getItem(('@devFashion:product'))
  handleCreateDetails(JSON.parse(product))
}

// Função que controi o HTML em tela
function handleCreateDetails(product) {
  let i = currentPart.partColorIdx

  // Validação de atualização. Antes de contruir, deverá excluir o que existe p/ não ficar duplicado
  const contructContainer = document.querySelector('.product-container')
  if(contructContainer) {
    contructContainer.remove()
  }
  
  const productContainerDiv = document.createElement('div')
  productContainerDiv.classList.add('product-container')

  const productImgSection = document.createElement('section');
  productImgSection.classList.add('product-img');
  const productImg = document.createElement('img')
  productImg.src = product[i].image
  productImg.alt = 'imagem-conjunto'

  const productDetailsSection = document.createElement('section');
  productDetailsSection.classList.add('product-details')
  const productDetailNameH3 = document.createElement('h3')
  productDetailNameH3.classList.add('product-detail-name')
  productDetailNameH3.textContent = product[i].product_name
  const productAvaliationDiv = document.createElement('div')
  productAvaliationDiv.classList.add('product-avaliation')
  const productStarsDiv = document.createElement('div')
  const productStarsImg = document.createElement('img')
  productStarsImg.src = '../../image/star.svg'
  productStarsImg.alt = 'stars-icon'
  const productAvaliationSmall = document.createElement('small')
  productAvaliationSmall.textContent = `(${product[i].assessments} Avaliações)`

  const productPricesDiv = document.createElement('div')
  productPricesDiv.classList.add('product-prices')
  const productPricesStrong = document.createElement('strong')
  productPricesStrong.classList.add('product-currently-price')
  productPricesStrong.textContent = `$${product[i].current_price.toFixed(2)}`
  const productPricesSpan = document.createElement('span')
  productPricesSpan.classList.add('product-old-price')
  productPricesSpan.textContent = `$${product[i].old_price.toFixed(2)}`

  const productControllersDiv = document.createElement('div')
  productControllersDiv.classList.add('product-controllers')
  const productCollorsNameDiv = document.createElement('div')
  productCollorsNameDiv.classList.add('product-collors-name')
  const productCollorsNameH6 = document.createElement('h6')
  productCollorsNameH6.textContent = `Cor:`
  const productCollorsNameSpan = document.createElement('span')
  productCollorsNameSpan.classList.add('product-controllers-name')
  productCollorsNameSpan.textContent = product[i].color
  const productCollorsOptionsDiv = document.createElement('div')
  productCollorsOptionsDiv.classList.add('product-collors-options')

  const productSizeOptionsDiv = document.createElement('div')
  productSizeOptionsDiv.classList.add('product-size-options')

  const productAddToCartButton = document.createElement('button')
  productAddToCartButton.classList.add('product-add-to-cart')
  productAddToCartButton.onclick = () => handleAddToCart()

  productImgSection.appendChild(productImg)
  productContainerDiv.appendChild(productImgSection)  

  productDetailsSection.appendChild(productDetailNameH3)

  handleCreatingAvaliationStars(product[i].stars, productStarsDiv, productStarsImg)

  productAvaliationDiv.appendChild(productStarsDiv)
  productDetailsSection.appendChild(productAvaliationDiv)

  productAvaliationDiv.appendChild(productAvaliationSmall)
  productDetailsSection.appendChild(productAvaliationDiv)

  productPricesDiv.appendChild(productPricesStrong)
  productPricesDiv.appendChild(productPricesSpan)
  productDetailsSection.appendChild(productPricesDiv)

  productCollorsNameH6.appendChild(productCollorsNameSpan)
  productCollorsNameDiv.appendChild(productCollorsNameH6)
  productControllersDiv.appendChild(productCollorsNameDiv)
  
  handleCreateProductCollorsOptions(product, productCollorsOptionsDiv)
  
  productControllersDiv.appendChild(productCollorsOptionsDiv)
  productDetailsSection.appendChild(productControllersDiv)  

  handleCreatePartSize(product[i].part_sizes, productSizeOptionsDiv)

  if (currentPart.partQnt > 0) {
    productAddToCartButton.textContent = 'Adicionar ao carrinho'
  } else {
    productAddToCartButton.textContent = 'esgotado'
    productAddToCartButton.classList.add('soldOff')
  }

  productDetailsSection.appendChild(productSizeOptionsDiv)
  
  productDetailsSection.appendChild(productAddToCartButton)
  
  productContainerDiv.appendChild(productDetailsSection)  

  homeMain.appendChild(productContainerDiv)

  cart.id = product[i].id
  cart.name = product[i].product_name
  cart.partColor = product[i].color
  cart.img = product[i].image
  cart.partPrice = product[i].current_price
}

// Função que controi as estrelas em tela
function handleCreatingAvaliationStars(number, container, itens) {
  for (let i = 0; i < number; i ++) {
    const clone = itens.cloneNode(true);
    container.appendChild(clone);
  }
}

// Função que constroi as imagens em miniatura e coloca o select qndo precisa
function handleCreateProductCollorsOptions(product, containerDiv) {
   product.forEach((item, idx) => {
    const productCollorsOptionsButton = document.createElement('button')
    productCollorsOptionsButton.onclick = () => handleSwitchImage(idx)
    const productCollorsOptionsImg = document.createElement('img')
    
    if(currentPart.partColorIdx == idx) {
      productCollorsOptionsImg.classList.add('collor-selected')
    }
    
    productCollorsOptionsImg.src = item.image
    productCollorsOptionsImg.alt = 'imagem-conjunto'

    productCollorsOptionsButton.appendChild(productCollorsOptionsImg)
    containerDiv.appendChild(productCollorsOptionsButton)
  })
}

// Função de atualização após seleção da imagem escolhida
function handleSwitchImage(idx) {
  currentPart.partColorIdx = idx;

  handleGetProduct()
}

// Função que constrói o botão de tamanho de peças e o select de cada uma
function handleCreatePartSize(partSize, containerDiv) {
  let qntItem 

  partSize.forEach((item, idx) => {
    const productSizeOptionsButton = document.createElement('button')
    productSizeOptionsButton.onclick = () => handleSwitchPartSize(item.qnt, idx)
    

    if (currentPart.partSizeIdx == idx) {
      cart.partSize = item.size
      qntItem = item.qnt
      productSizeOptionsButton.classList.add('size-selected')
    }

    productSizeOptionsButton.textContent = `${item.size}`

    containerDiv.appendChild(productSizeOptionsButton)
  })

  currentPart.partQnt = qntItem
}


// Função de atualização após tamanho escolhida
function handleSwitchPartSize(qnt, idx) {
  currentPart.partQnt = qnt
  currentPart.partSizeIdx = idx

  handleGetProduct()
}


// Função de adição ao carrinho de compras
function handleAddToCart() {
  if (currentPart.partQnt == 0) return 
  let cartItens = JSON.parse(localStorage.getItem('@devFashion:cart')) || []
  
  let isAlreadyExists = cartItens.find(item => {
    return item.id === cart.id && item.partSize === cart.partSize
  })

  if (isAlreadyExists) {
    alert('O item já existe no carrinho')
  } else {
    cartItens.push(cart)
    alert('O item foi adicionado ao carrinho com sucesso')
  }

  localStorage.setItem('@devFashion:cart', JSON.stringify(cartItens))
}

handleGetProduct()

