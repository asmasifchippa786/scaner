const wrapper = document.querySelector(".wrapper"),
form = wrapper.querySelector("form"),
fileInp = form.querySelector("input"),
infoText = form.querySelector("p"),
copybtn = wrapper.querySelector(".copy"),
closebtn = wrapper.querySelector(".close");

function fetchRequest(fromDate, file) {
    infoText.innerText = "Scanning QR Code...."
 fetch("http://api.qrserver.com/v1/read-qr-code/" , {
    method: "POST", body: fromDate
 }).then(res => res.json()).then(result => {
    result = result[0].symbol[0].data;
    infoText.innerText = result ? "Upload QR Code to Scan" : "Couldn't Scan QR Code";
    if(!result) return ;
    wrapper.querySelector("textarea").innerText = result;
    form.querySelector("img").src = URL.createObjectURL(file)
    wrapper.classList.add("active");
});
}

fileInp.addEventListener("change", e =>{
     let file = e.target.files[0];
     if(!file) return;
     let fromDate = new FormData();
     fromDate.append("file", file)
    fetchRequest(fromDate, file);
})

copybtn.addEventListener("click", () => {
    let text = wrapper.querySelector("textarea").textContent;
    navigator.clipboard.writeText(text);
})

form.addEventListener("click", () => fileInp.click());
closebtn.addEventListener("click" ,() => wrapper.classList.remove("active"));