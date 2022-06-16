// variables
const prevBtns = document.querySelectorAll('.btn-pre');
const nextBtns = document.querySelectorAll('.btn-next');
const progress = document.querySelector('#progress');
const formSteps = document.querySelectorAll('.form-step');
const progressSteps = document.querySelectorAll('.progress-step');
let formStepsNum = 0;
let parent = document.querySelector('#cartitemList');
let cartData = JSON.parse(localStorage.getItem('cart_data')) || [];
let slctdProdPrc = JSON.parse(localStorage.getItem('allPrice')) || 0;
let ttl_itm = document.querySelector('.ttl_itm>b');
ttl_itm.innerText = slctdProdPrc;
display(cartData);

// create Elements
function display(data) {
  let count = 0;
  data.forEach((el, index) => {
    let row = document.createElement('tr');
    row.classList = 'shop_warehouse';
    let td1 = document.createElement('td');
    td1.classList = 'prd-dtls';
    let checkbox = document.createElement('input');
    checkbox.setAttribute('type', 'checkbox');
    // checkbox.setAttribute('onclick', '(el)=>{}');
    checkbox.classList = 'with-10 check';
    checkbox.id = `check${count}`;
    checkbox.checked = el.checked;
    checkbox.addEventListener('click', () => {
      prdChecked(el, checkbox.id);
    });
    count++;
    let img = document.createElement('img');
    img.src = el.imgURL;
    let details = document.createElement('p');
    details.innerText = el.description;
    td1.append(checkbox, img, details);
    let td2 = document.createElement('td');
    td2.classList = 'shop_table_price';
    let price = document.createElement('span');
    price.innerText = el.price;
    td2.append(price);
    let td3 = document.createElement('td');
    td3.classList = 'qwt';
    let qwtData = document.createElement('input');
    let tPrice = document.createElement('span');
    tPrice.innerText = el.quantity * el.price;
    qwtData.type = 'text';
    qwtData.value = el.quantity;
    let inc = document.createElement('i');
    inc.classList = 'icon';
    inc.addEventListener('click', () => {
      increment(el, qwtData, tPrice, checkbox.id);
    });
    inc.innerText = '+';
    let dec = document.createElement('i');
    dec.classList = 'icon';
    dec.innerText = '-';
      dec.addEventListener('click', () => {
        decrement(el, qwtData, tPrice, checkbox.id);
      });
    td3.append(dec, qwtData, inc);
    let td4 = document.createElement('td');
    td4.append(tPrice);
    let td5 = document.createElement('td');
    td5.classList = 'shop_table_iconxin';
    let whislist = document.createElement('i');
    whislist.innerText = 'Whislist';
    let remove = document.createElement('em');
    remove.innerText = 'Delete';
    remove.addEventListener('click', () => {
      remove(index);
    });
    td5.append(whislist, remove);

    row.append(td1, td2, td3, td4, td5);
    parent.append(row);
  });
}

let remove = (index) => {
  cartData.splice(index, 1);
  localStorage.setItem('cart_data', JSON.stringify(cartData));
  window.location.reload();
};

//checkbox
let prdChecked = (el, id) => {
  let checkBox = document.querySelector(`#${id}`);
  if (checkBox.checked == true) {
    slctdProdPrc += el.price * el.quantity;
    el.checked = true;
  } else {
    slctdProdPrc -= el.price * el.quantity;
    el.checked = false;
  }
  ttl_itm.innerText = slctdProdPrc;
  localStorage.setItem('allPrice', JSON.stringify(slctdProdPrc));
  localStorage.setItem('cart_data', JSON.stringify(cartData));
};

// Increment
let increment = (el, qwtData, tPrice, id) => {
  el.quantity++;
  qwtData.value = el.quantity;
  tPrice.innerText = el.price * el.quantity;
  console.log(el.checked)
  if(el.checked){
    slctdProdPrc += Number(el.price);
    ttl_itm.innerText = slctdProdPrc;
    // console.log(slctdProdPrc)
    localStorage.setItem('allPrice', JSON.stringify(slctdProdPrc));
  }
  localStorage.setItem('cart_data', JSON.stringify(cartData));
};
// Decrement
let decrement = (el, qwtData, tPrice, id) => {
  if(el.quantity>1){
    el.quantity--;
    qwtData.value = el.quantity;
    tPrice.innerText = el.price * el.quantity;
    if(el.checked){
      slctdProdPrc -= Number(el.price);
      ttl_itm.innerText = slctdProdPrc;
      // console.log(slctdProdPrc)
      localStorage.setItem('allPrice', JSON.stringify(slctdProdPrc));
    }
    localStorage.setItem('cart_data', JSON.stringify(cartData));
  }

};

// Progress Bar functionality
nextBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    formStepsNum++;
    updateFormSteps();
    updateProgressbar();
  });
});
prevBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    formStepsNum--;
    updateFormSteps();
    updateProgressbar();
  });
});

function updateFormSteps() {
  formSteps.forEach((formStep) => {
    formStep.classList.contains('active') &&
      formStep.classList.remove('active');
  });

  formSteps[formStepsNum].classList.add('active');
}

function updateProgressbar() {
  progressSteps.forEach((progressStep, idx) => {
    if (idx < formStepsNum + 1) {
      progressStep.classList.add('active');
    } else {
      progressStep.classList.remove('active');
    }
  });
  const progressActive = document.querySelectorAll('.progress-step.active');
  let barLength =
    ((progressActive.length - 1) / (progressSteps.length - 1)) * 100 + '%';

  progress.style.width = barLength == '0%' ? '24%' : barLength;
}
