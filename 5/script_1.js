document.addEventListener("DOMContentLoaded", () => 
{
//3
    if(document.cookie.includes("word_count"))
    {
        document.getElementById("words").style.display = "none";
        document.getElementById("words_button").style.display = "none";
    }
//4
    let value = false;
    for (let i = 3; i <= 5; i++)
    {
       value = localStorage.getItem("ch_"+i) == 'true';
       document.getElementById("ch_"+i).checked = value;
       
       if(value)
       {
            document.getElementsByClassName("block-"+i)[0].style.justifyItems = "start";
       }
    }
//5
    let inner;
    for(let i = 1; i <=7; ++i)
    {
        inner = localStorage.getItem("new_inner"+i);
        if(inner != null)
        {
            document.getElementById("block-"+i).innerHTML = inner;
            document.getElementById("block-"+i).style.fontStyle = "italic";
        }
    }
})


window.onload = function() {
    if(document.cookie.includes("word_count"))
    {
        
        let cookie = document.cookie;
        let c_pos = cookie.indexOf("word_count");
        let e_pos = cookie.indexOf('=',c_pos);

        let value, sep_pos = cookie.indexOf(';',e_pos);
        if(sep_pos == -1)
        {
            value = cookie.slice(e_pos+1);
        }
        else
        {
            value = cookie.slice(e_pos+1,sep_pos);
        }

        if(confirm("Збережена інформація про передню кількість слів: " + value + "\n Бажаєте видалити?"))
        {
            document.cookie = "word_count=0; max-age=0";
            location.reload();
        }
        else
        {
            alert("Cookies наявні. Необхідно перезавантажити сторінку");
        }
    }
};

function task_1()
{
    let block_5 = document.getElementsByClassName("block-5")[0];
    let block_4 = document.getElementsByClassName("block-4")[0];

    let temp = block_4.innerHTML;
    block_4.innerHTML = block_5.innerHTML;
    block_5.innerHTML = temp;

}

function task_2()
{
    let R = document.getElementById("R_el").value;
    let r = document.getElementById("r_el").value;

    let area = R * r * Math.PI;

    let block_3 = document.getElementById("block-3");


    if(block_3.lastElementChild.id != "result_area")
        block_3.innerHTML += "<p id=\"result_area\"> Area of elips with R = " + R + " and r = " + r + " is " + "<strong>" + area + "</strong></p>";
    else
        block_3.lastElementChild.innerHTML = "Area of elips with R = " + R + " and r = " + r + " is " + "<strong>" + area + "</strong>";
}


function task_3()
{
    let text_area = document.getElementById("words").value;
   
    let word_count = 0;

    let words = text_area.split(' ');

    for (let index = 0; index < words.length; index++) {
        if(words[index].length > 0)
            ++word_count;
    }

    document.cookie = "word_count="+word_count;
 
    alert("Кількість слів у формі: "+word_count);
}

function task_4(number)
{
    if(document.getElementById("ch_"+number).checked)
    {
        document.getElementsByClassName("block-"+number)[0].style.justifyItems = "start";
    }
}

function save_check(number)
{
    localStorage.setItem("ch_"+number,document.getElementById("ch_"+number).checked);
}

function task_5(number)
{
   
   document.activeElement.selectionStart = document.activeElement.selectionEnd;
   let block = document.getElementById("block-"+number);
   if(block.querySelector("#text_area"+number) == null)
   {
        let text_area = document.createElement("textarea");
        text_area.value = block.innerHTML;
        text_area.id = "text_area"+number;
        text_area.style.resize = "vertical";        
        text_area.style.width = "96%";
        text_area.style.minHeight = "20px";
        
        localStorage.setItem("old_inner"+number,block.innerHTML);
        
        block.innerHTML = "";
        block.appendChild(text_area);
        text_area.style.height = (text_area.scrollHeight)+"px";
        
        let p = document.createElement("div");
        p.innerHTML = "<p><button id=\"apply_btn" + number + "\" onclick=\"apply("+number+")\">Застосувати!</button></p>"
        block.appendChild(p);
    }
}

function apply(number)
{
    let block = document.getElementById("block-"+number);
    let text_area = block.querySelector("#text_area"+number);

    block.innerHTML = text_area.value;
    block.innerHTML += "<p><button id=\"revert_btn" + number + "\" onclick=\"revert("+number+")\">Назад!</button></p>"
    block.style.fontStyle = "italic";

    localStorage.setItem("new_inner"+number,block.innerHTML);
}

function revert(number)
{
    let block = document.getElementById("block-"+number);
    block.innerHTML = localStorage.getItem("old_inner"+number);
    block.style.fontStyle = "normal";
    localStorage.removeItem("new_inner"+number);
    localStorage.removeItem("old_inner"+number);
}