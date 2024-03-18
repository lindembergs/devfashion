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
  const swiperDiv = document.createElement('div')
  swiperDiv.classList.add('swiper')
  swiperDiv.classList.add('mySwiper')

  const swiperWrapperDiv = document.createElement('div')
  swiperWrapperDiv.classList.add('swiper-wrapper')
  
  json.forEach(item => {  
    const cardSwiperSlideDiv = document.createElement('div')
    cardSwiperSlideDiv.classList.add('swiper-slide')

    const cardDiv = document.createElement('div');
    cardDiv.classList.add('card')
    cardDiv.classList.add('card-swiper')
    
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

    cardSwiperSlideDiv.appendChild(cardDiv)
    swiperWrapperDiv.appendChild(cardSwiperSlideDiv)
    swiperDiv.appendChild(swiperWrapperDiv)
    
    elementDiv.appendChild(swiperDiv)

    handleWidth(window.innerWidth)
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

// Função de verificação de tamnho para definir o numero de slides
function handleWidth(width) {
  const sectionCollection = document.querySelectorAll('.section-collection')
  let slideShow;

  if (width <= 750) {
    slideShow = '3.5'
    sectionCollection.forEach(item => item.style.margin = '0px 0px 10rem 5%')
  } 
  
  if (width <= 580) {
    slideShow = '3'
  } 
  
  if (width <= 485) {
    slideShow = '2.5'
  } 
  
  if (width <= 420) {
    slideShow = '2'
  } 

  if (width > 750) {
    slideShow = '4'
    sectionCollection.forEach(item => item.style.margin = '0rem 5% 10rem')
  }

  handleConstructionSwiper(slideShow)
}

// Função que monitora o tamanho da tela
window.addEventListener('resize', (e) => {
  handleWidth(e.target.innerWidth);
})

// Função que constroi o Swiper (Carrossel)
function handleConstructionSwiper(slides) {
  return swiper = new Swiper(".mySwiper", {
    slidesPerView: slides,
    spaceBetween: 32,
  });
}

handleData()

handleConstructionSwiper()
