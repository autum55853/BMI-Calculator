const result=document.querySelector('.result');
const resultBlock=document.querySelector('.resultBlock');
const Height=document.querySelector('.inputHeight');
const Weight=document.querySelector('.inputWeight');
const reset=document.querySelector('.reset');
const bmiText=document.querySelector('.bmiText');

//監聽行為

result.addEventListener('click',AccBMI,false);



//確認輸入的欄為是否有值
//Height.addEventListener('blur',checkContent,false);
//Weight.addEventListener('blur',checkContent,false);

window.onload=reset.addEventListener('click',returnBTN,false);
function checkContent(e){
    let getValue=e.target.value;
    console.log(getValue)
    if(getValue ===''){
        alert('欄位不可為空白');
        console.log('欄位不可為空白');
    };
};

const bmiStatesData = {
    "overThin": {
      "status": "過輕",
      "color": "primary",
      "color_border": "border-primary",
      "color_text": "text-primary"
    },
    "normal": {
      "status": "理想",
      "color": "success",
      "color_border": "border-success",
      "color_text": "text-success"
    },
    "overWeight": {
      "status": "過重",
      "color": "secondary",
      "color_border": "border-secondary",
      "color_text": "text-secondary"
    },
    "mildFat": {
      "status": "輕度肥胖",
      "color": "info",
      "color_border": "border-info",
      "color_text": "text-info"
    },
    "moderateFat": {
      "status": "中度肥胖",
      "color": "info",
      "color_border": "border-info",
      "color_text": "text-info"
    },
    "severeFat": {
      "status": "重度肥胖",
      "color": "danger",
      "color_border": "border-danger",
      "color_text": "text-danger"
    },
  };

  function checkBmi(theBMI){
    if(theBMI<18.5){
      console.log('過輕');
      addBtn('overThin');
    } else if(theBMI>=18.5 && theBMI<=25){
        console.log('理想');
        addBtn('normal');
    } else if(theBMI>25 && theBMI<=30){
        console.log('過重');
        addBtn('overWeight');
    } else if(theBMI>30 && theBMI<=35){
        console.log('輕度肥胖');
        addBtn('mildFat');
    } else if(theBMI>35 && theBMI<=40){
        console.log('中度肥胖');
        addBtn('moderateFat');
    } else if(theBMI>40) {
        console.log('重度肥胖');
        addBtn('severeFat');
    } else{
        alert('您輸入的值有誤,請重新輸入');
    }
  };


//BMI公式=體重kg/身高cm(m*m)
  function AccBMI(){
    //console.log('被點擊了');
    const theHeight=(Height.value)/100;
    const theWeight=Weight.value;
    //console.log(theHeight);
    //console.log(theWeight);
    theBMI=(theWeight/(theHeight*theHeight)).toFixed(2);
    //console.log(theBMI);
    document.querySelector('.result').classList.add("d-none");
    document.querySelector('.resultBlock').classList.remove("d-none");

    checkBmi(theBMI);
  };
  let bmiHistoryData=[];
  function addBtn(status){
    let bmiObj={};
    bmiObj.status=bmiStatesData[status].status;
    bmiObj.color=bmiStatesData[status].color;
    bmiObj.textColor=bmiStatesData[status].color_text;
    bmiObj.borderColor=bmiStatesData[status].color_border;
    bmiHistoryData.push(bmiObj);
    //console.log(bmiHistoryData);
    resultBlock.innerHTML=`<div class="BMIInfo btn ${bmiObj.borderColor} border-4 rounded-circle text-center position-relative">
    <p class="bmiText ${bmiObj.textColor} fs-3 px-2 mb-0">BMI</p>
    <p class=" ${bmiObj.textColor} fs-4 mb-1">${theBMI}</p>
    <span class="material-icons reset position-absolute bottom-0 end-0">
        autorenew
    </span>
  </div>
  <p class="BMIstatus ${bmiObj.textColor} fs-3 mb-0 p-2">${bmiObj.status}</p>`
  };
  



//返回ㄎ

function returnBTN(){
    //console.log("resetBTN");
    document.querySelector('.inputHeight').value='';
    document.querySelector('.inputWeight').value='';
    document.querySelector('.result').classList.remove("d-none");
    document.querySelector('.resultBlock').classList.add("d-none");

};




//localStorage



/*function count(){
    var hamPrice = 50;
    var cokePrice = 20;
    var hamTotalPrice = parseInt(document.getElementById('hamNumId').value)*hamPrice;
    var cokeTotalPrice = parseInt(document.getElementById('cokeNumId').value)*cokePrice;
    document.getElementById('totalId').textContent = hamTotalPrice + cokeTotalPrice;
  }*/