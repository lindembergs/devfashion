const homeMain = document.getElementById('home')

// Função de consumo de dados
async function handleData() {
  try {
    const response = await fetch('./json/dados.json')
    const data = await response.json()
    
    handleCreateSections(data)
  } catch (error) {
    console.error('Erro ao carregar os dados:', error)
    return null
  } 
}

// Função de criação de seções
function handleCreateSections(data) {
  data.forEach(item => {
    hanldeCreateCollections(item);
  })
}

// Função de criação de Collecions
function hanldeCreateCollections(json) {
  const sectionCollectionSection = document.createElement('section')
  sectionCollectionSection.classList.add('section-collection')

  const titleH = document.createElement('h3')
  titleH.textContent = `${json.class}`
  titleH.classList.add('title')
  
  const cardCollectionDiv = document.createElement('div')
  cardCollectionDiv.classList.add('card-collection')
  
  sectionCollectionSection.appendChild(titleH)
  sectionCollectionSection.appendChild(cardCollectionDiv)
  
  homeMain.appendChild(sectionCollectionSection)
  
  handleCreateCard(cardCollectionDiv, json.product)
}

// Função de criação de card
function handleCreateCard(elementDiv, json) {
  json.forEach(item => {  
    const cardDiv = document.createElement('div');
    cardDiv.classList.add('card')

    const cardImgDiv = document.createElement('div')
    cardImgDiv.classList.add('card-img')
    const cardImgButton = document.createElement('button')
    cardImgButton.onclick = () => handleSaveProduct(item.itens)
    const cardImgLink = document.createElement('a')
    cardImgLink.href = './pages/product/product.html'
    const img = document.createElement('img');
    img.src = `${item.image}`
    img.alt = 'image-roupa'

    const cardDescriptionDiv = document.createElement('div')
    cardDescriptionDiv.classList.add('card-description')
    const cardNameProductSpan = document.createElement('span')
    cardNameProductSpan.classList.add('card-name-product')
    cardNameProductSpan.textContent = `${item.product_name}`
    const cardFooterDiv = document.createElement('div')
    cardFooterDiv.classList.add('card-footer')
    const priceDiv = document.createElement('div')
    const currentPriceP = document.createElement('p')
    currentPriceP.classList.add('card-currenty-price')
    currentPriceP.textContent = `$${item.current_price.toFixed(2)}`
    const oldPriceP = document.createElement('p')
    oldPriceP.classList.add('card-old-price')
    oldPriceP.textContent = `$${item.old_price.toFixed(2)}`
    const button = document.createElement('button')
    button.onclick = () => handleSaveProduct(item.itens)
    const link = document.createElement('a')
    link.href = './pages/product/product.html'
    const imgButton = document.createElement('img')
    imgButton.src = './image/soma.svg'
    imgButton.alt = 'soma-icon'

    link.appendChild(imgButton)
    button.appendChild(link)
    priceDiv.appendChild(oldPriceP)
    priceDiv.appendChild(currentPriceP)
    cardFooterDiv.appendChild(priceDiv)
    cardFooterDiv.appendChild(button)

    cardDescriptionDiv.appendChild(cardNameProductSpan)
    
    cardDescriptionDiv.appendChild(cardFooterDiv)

    cardImgLink.appendChild(img)
    cardImgButton.appendChild(cardImgLink)
    cardImgDiv.appendChild(cardImgButton)

    cardDiv.appendChild(cardImgDiv)
    cardDiv.appendChild(cardDescriptionDiv)
    
    elementDiv.appendChild(cardDiv)
  })
}

// Função de limpeza de dados
function handleCleaningProductCache() {
  localStorage.removeItem('@devFashion:product')
}

// Função de persistência de dados
function handleSaveProduct(data) {
  localStorage.setItem('@devFashion:product', JSON.stringify(data))
}

handleData()
