import { refs } from './js/refs.js'
// console.log(refs)
// console.log(refs.list)
// console.log(refs.modal)

// 1 - получаем доступ на элемент, к которому применим Observer
// const list = document.getElementById('list')
const { list } = refs
// console.log(list)

const items = [...list.children]
// console.log(items)

// 2 - создаем экземпляр Observer
const options = {
  root: list, // относительно кого проверяем видимость элемента
  // rootMargin: '-50px', // внешние отступы root, поэтому задаем с -
  threshold: 0.5, // на сколько проверяемый элемент должен попасть в зону видимости root
}

const observer = new IntersectionObserver(callback, options)

function callback(entries, observer) {
  //   console.log(entries)

  entries.forEach((entry) => {
    // console.log(entry)
    entry.isIntersecting
      ? entry.target.classList.add('observe')
      : entry.target.classList.remove('observe')
  })
}
// вызываем экземпляр
items.forEach((li) => {
  observer.observe(li)
})

// ДОБАВЛЯЕМ ОТКРЫТИЕ МОДАЛЬНОГО ОКНА
// const modal = document.querySelector('.backDrop')
const { modal } = refs
// console.log(modal)

list.addEventListener('click', (e) => {
  console.log(e.target)
  e.preventDefault()
  if (e.target.nodeName === 'A') {
    // modal.classList.remove('isHidden')
    showElement(modal)
  }
})

// Закрываем модальное окно
modal.addEventListener('click', closeModalByClick)

function closeModalByClick(e) {
  console.log(e.target)
  if (e.target.classList.contains('backDrop') || e.target.id === 'closeModal') {
    // modal.classList.add('isHidden')
    closeElement(modal)
  }
}

window.addEventListener('keydown', closeModalByKey)

function closeModalByKey(e) {
  console.log(e.code)
  if (
    e.code === 'Escape' ||
    e.code === 'ArrowLeft' ||
    e.code === 'ArrowRight'
  ) {
    // modal.classList.add('isHidden')
    closeElement(modal)
  }
}

function closeElement(elem) {
  elem.classList.add('isHidden')
}

function showElement(elem) {
  elem.classList.remove('isHidden')
}

if (!modal.classList.contains('isHidden')) {
  modal.removeEventListener('click', closeModalByClick)
  window.removeEventListener('keydown', closeModalByKey)
}
