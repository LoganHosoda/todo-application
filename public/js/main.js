const deleteBtn = document.querySelectorAll('.fa-trash');
const item = document.querySelectorAll('.item span');
const itemCompleted = document.querySelectorAll('.item span.completed');

Array.from(deleteBtn).forEach((el) => {
  el.addEventListener('click', deleteItem);
});

Array.from(item).forEach((el) => {
  el.addEventListener('click', markComplete);
});

Array.from(itemCompleted).forEach((el) => {
  el.addEventListener('click', markIncomplete);
});

async function deleteItem() {
  const itemText = this.parentNode.childNodes[1].innerText;
  try {
    const response = await fetch('deleteItem', {
      method: 'delete',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        'itemFromJs': itemText
      })
    })
    const data = await response.json();
    console.log(data);
    location.reload();
  } catch(err) {
    console.log(err);
  }
};

async function markComplete() {
  const itemText = this.textContent;
  try {
    const response = await fetch('markComplete', {
      method: 'put',  
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        'itemFromJs': itemText
      })
    })
    const data = await response.json();
    console.log(data);
    location.reload();
  } catch(err) {
    console.log(err);
  }
};

async function markIncomplete() {
  const itemText = this.textContent;
  try {
    const response = await fetch('markIncomplete', {
      method: 'put',  
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        'itemFromJs': itemText
      })
    })
    const data = await response.json();
    console.log(data);
    location.reload();
  } catch(err) {
    console.log(err);
  }
};
