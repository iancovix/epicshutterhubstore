const d = document;
const select = d.querySelector('.select');
select.addEventListener('change',()=>{
        const selectedValue = select.value;
        const selectedText = select.options[select.selectedIndex].text;
        if(selectedValue === "camera"){
                alert('gdhcgk')
        }
})


