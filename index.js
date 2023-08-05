// Initialize getElementByID
const colorPicker = document.getElementById("color-picker")
const colorSchemeSelector = document.getElementById("color-scheme-selector")
const colorButton = document.getElementById("color-button")

// Set the Initial Color Palette
function getInitialColorPalette(){
    fetch("https://www.thecolorapi.com/scheme?hex=F55A5A&mode=monochrome")
    .then(res => res.json())
    .then(data => {
        renderColor(data)
    })
}

// Get the Selected Scheme
colorButton.addEventListener("click",function(){
    // Setting Text Cases because The ColorAPI can't accept lowercased hex code and UpperCased Scheme
    const finalColor = colorPicker.value.substring(1).toUpperCase()
    const finalScheme = colorSchemeSelector.value.toLowerCase()
    
    // Fetching Color from color Picker
    fetch(`https://www.thecolorapi.com/scheme?hex=${finalColor}&mode=${finalScheme}`)
    .then(res => res.json())
    .then(data => {
        renderColor(data)
    })
})

// Calling Color from Fetched Data
function renderColor(colorData){
    // Color Palette
    const selectedPalette = colorData.colors.map(color => `
        <div id="color-palette" style="background-color: ${color.hex.value}"></div>
    `).join('')
    document.getElementById("color-main").innerHTML = selectedPalette
    
    // Hex Code
    const selectedHex = colorData.colors.map(color => `
        <p id="color-hex">${color.hex.value}</p>
    `).join('')
    document.getElementById("color-section").innerHTML = selectedHex
}

// Rendering Initial Color Palette
getInitialColorPalette()