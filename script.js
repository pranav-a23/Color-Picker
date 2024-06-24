const colorPickerButton = document.querySelector("#color-picker");
const colorList = document.querySelector(".all-colors");
const clearALL = document.querySelector(".clear-all");
const pickedColors = JSON.parse(localStorage.getItem("picked-colors") || "[]");

const copyColor = elem => {
    navigator.clipboard.writeText(elem.dataset.color);
    elem.innerText = "Copied";
    setTimeout(() => elem.innerText = elem.dataset.color, 1000);
}

//Generating list for all picked colors and adding them to colorList
const showColors = () => {
    if (!pickedColors.length) return; // Returning if there are no picked colors
    colorList.innerHTML = pickedColors.map(color => `
        <li class= "color">
            <span class="rect" style="background: ${color}; border: 1px solid ${color == "#ffffff" ? "#ccc" : color}"></span>
            <span class="value" data-color="${color}">${color}</span>
        </li>    
    `).join("");
    document.querySelector(".picked-colors").classList.remove("hide");

    //Copy color on click by adding click event listner to each color element
    document.querySelectorAll(".color").forEach(li => {
        li.addEventListener("click", e => copyColor(e.currentTarget.lastElementChild));
    })
}
showColors();

async function activateEyeDropper() {
    try {
        // Access the Eyedropper - select and get color
        const eyeDropper = new EyeDropper();
        const { sRGBHex } = await eyeDropper.open();
        navigator.clipboard.writeText(sRGBHex);

        // Store picked color if it doesnt already exist
        if (!pickedColors.includes(sRGBHex)) {
            pickedColors.push(sRGBHex);
            localStorage.setItem("picked-colors", JSON.stringify(pickedColors));
            showColors();
        }


    } catch (error) {
        console.log(error);
    }
}


//Clear all Picked Colors and update within local storage
const clearALLColors = () => {
    pickedColors.length = 0;
    localStorage.setItem("picked-colors", JSON.stringify(pickedColors));
    document.querySelector(".picked-colors").classList.add("hide");
}

clearALL.addEventListener("click", clearALLColors);
colorPickerButton.addEventListener("click", activateEyeDropper);



