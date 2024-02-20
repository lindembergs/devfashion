async function handleData() {
  try {
    const response = await fetch('./json/dados.json')
    const data = await response.json()
    
    handleShowCard(data)
  } catch (error) {
    console.error('Erro ao carregar os dados:', error)
    return null
  }
}

function handleShowCard(data) {
  console.log(data)
}

handleData()
