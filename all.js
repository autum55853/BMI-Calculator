//宣告
let aryBmi=[];
let theBMI;
let bmiHistoryData=[]; //放在function外面會跳錯；可是不放外面,bmiObj的內容會被覆蓋


//抓取所需的DOM
const result=document.querySelector('.result');
const resultBlock=document.querySelector('.resultBlock');
const Height=document.querySelector('.inputHeight');
const Weight=document.querySelector('.inputWeight');
const bmiItem=document.querySelector('.bmiItem');
const clearall=document.querySelector('.clearall');


//監聽行為
result.addEventListener('click',AccBMI,false);
result.addEventListener('click',listResult,false);
resultBlock.addEventListener('click',returnBTN,false);
clearall.addEventListener('click',clearList,false);



//確認輸入的欄為是否有值
Height.addEventListener('blur',checkContent,false);
Weight.addEventListener('blur',checkContent,false);

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
      //console.log('過輕');
      addBtn('overThin');
    } else if(theBMI>=18.5 && theBMI<=25){
        //console.log('理想');
        addBtn('normal');
    } else if(theBMI>25 && theBMI<=30){
        //console.log('過重');
        addBtn('overWeight');
    } else if(theBMI>30 && theBMI<=35){
        //console.log('輕度肥胖');
        addBtn('mildFat');
    } else if(theBMI>35 && theBMI<=40){
        //console.log('中度肥胖');
        addBtn('moderateFat');
    } else if(theBMI>40) {
        //console.log('重度肥胖');
        addBtn('severeFat');
    } else{
        alert('您輸入的值有誤,請重新輸入');
    }
  };

  
//BMI公式=體重kg/身高cm(m*m)
  
  function AccBMI(){
    //console.log('被點擊了');
    if(Height.value!=='' && Weight.value!==''){
      let theHeight=(parseInt(Height.value))/100;
      let theWeight=parseInt(Weight.value);
      //console.log(typeof theHeight);
      //console.log(typeof theWeight);
      theBMI=parseFloat((theWeight/(theHeight*theHeight)).toFixed(2));
      console.log(typeof theBMI);
      result.classList.add("d-none");
      resultBlock.classList.remove("d-none");

      checkBmi(theBMI);
      const time=new Date();     
      
      let bmiInfo = {};
      bmiInfo.height=theHeight*100;
      bmiInfo.weight=theWeight;
      bmiInfo.bmi=theBMI;
      bmiInfo.time=time.toLocaleString();
      aryBmi.push(bmiInfo);
      //localStorage
      function saveResult(){
        const stringBmi=  JSON.stringify(aryBmi);
        localStorage.setItem('bmiInfo',stringBmi);
      };
      saveResult();

    } else{
      alert('資料不完整, 請輸入你的身高與體重');
    }
    
  };
  
  
function listResult(){
  const getbmiInfo=localStorage.getItem('bmiInfo');
  const bmiInfo=JSON.parse(getbmiInfo);
  const getbmiResult=localStorage.getItem('bmiResult');
  const bmiResult=JSON.parse(getbmiResult);
  console.log(bmiResult);
  //let bmi=Object.assign(bmiInfo,bmiResult);
  //console.log(bmi);
  function updatedList(){
    let items='';
    for (let i = 0; i < bmiResult.length; i++) {
      items +=`<tr class="list-border border-${bmiResult[i].color} text-center">
        <th scope="row" data-num="${i+1}">${i+1}</th>
        <td>${bmiInfo[i].height}</td>
        <td>${bmiInfo[i].weight}</td>
        <td>${bmiInfo[i].bmi}</td>
        <td>${bmiResult[i].status}</td>
        <td>${bmiInfo[i].time}</td>
      </tr>`
      
    };
    bmiItem.innerHTML=items;
  };
  updatedList();
}; 
function checkLocalStorage(){
  if(window.localStorage.lenth!==0){
    listResult();
  } else{ //以下不會執行
    document.querySelector('.table').classList.add("d-none");
    document.querySelector('.content').innerHTML=`<p>目前沒有任何BMI紀錄,請於上方輸入你的身高與體重</p>`;
  
  };
};
checkLocalStorage();

function addBtn(status){
  let bmiObj={};
  bmiObj.status=bmiStatesData[status].status;
  bmiObj.color=bmiStatesData[status].color;
  bmiObj.textColor=bmiStatesData[status].color_text;
  bmiObj.borderColor=bmiStatesData[status].color_border;
  bmiHistoryData.push(bmiObj);
  
  const stringBmi=  JSON.stringify(bmiHistoryData);
  localStorage.setItem('bmiResult',stringBmi);
  //console.log(bmiHistoryData);
  resultBlock.innerHTML=`<div class="BMIInfo btn ${bmiObj.borderColor} border-4 p-4 rounded-circle text-center position-relative">
  <p class="bmiText ${bmiObj.textColor} fs-4 px-2 mb-0">BMI</p>
  <p class=" ${bmiObj.textColor} fs-5 px-2 mb-1">${theBMI}</p>
  <span class="material-icons bg-${bmiObj.color} rounded-circle return-button position-absolute bottom-0 end-0">
      autorenew
  </span>
  </div>
  <p class="BMIstatus ${bmiObj.textColor} fs-4 mb-0 p-2">${bmiObj.status}</p>`
};

function returnBTN(e){
    //console.log(e.target.nodeName);
    if(e.target.nodeName==='SPAN'){
      Height.value='';
      Weight.value='';
      result.classList.remove("d-none");
      resultBlock.classList.add("d-none");
    } else{
      console.log('錯誤')
    }
    
};
function clearList(){
  localStorage.clear();//清空 localstorage
  checkLocalStorage(); //初始化
};