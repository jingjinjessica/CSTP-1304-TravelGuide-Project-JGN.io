// myForm
function openForm() {
    document.getElementById("myForm").style.display = "block";
}
function closeForm() {
    document.getElementById("myForm").style.display = "none";
}

function openForm2() {
    document.getElementById("myForm2").style.display = "block";
}
function closeForm2() {
    document.getElementById("myForm2").style.display = "none";
}

function openForm3() {
    document.getElementById("myForm3").style.display = "block";
}
function closeForm3() {
    document.getElementById("myForm3").style.display = "none";
}

function openForm4() {
    document.getElementById("myForm4").style.display = "block";
}
function closeForm4() {
    document.getElementById("myForm4").style.display = "none";
}

function openForm5() {
    document.getElementById("myForm5").style.display = "block";
}
function closeForm5() {
    document.getElementById("myForm5").style.display = "none";
}

function openForm6() {
    document.getElementById("myForm6").style.display = "block";
}
function closeForm6() {
    document.getElementById("myForm6").style.display = "none";
}

function radiobBtn() {
    if(document.getElementById("radio1") == true){
        alert("Received your order! You can pick-up in store.")
        closeForm()
        closeForm2()
        closeForm3()
        closeForm4()
        closeForm5()
        closeForm6()
    }
    else
    {
        alert("Received your order! We will deivery to your home.")
        closeForm()
        closeForm2()
        closeForm3()
        closeForm4()
        closeForm5()
        closeForm6()
    }
}